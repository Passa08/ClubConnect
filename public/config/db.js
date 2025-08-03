const { Sequelize } = require('sequelize');
require('dotenv').config();

// Check if we have ALL required PostgreSQL credentials
const hasCompletePostgresCredentials = 
  process.env.DB_HOST && 
  process.env.DB_USER && 
  process.env.DB_PASS && 
  process.env.DB_NAME &&
  process.env.DB_HOST !== 'localhost' &&
  process.env.DB_HOST !== '127.0.0.1';

// Use PostgreSQL only if we have complete credentials, otherwise use SQLite
const usePostgres = process.env.NODE_ENV === 'production' && hasCompletePostgresCredentials;

let sequelize;

if (usePostgres) {
  // PostgreSQL for production with complete credentials
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: 'postgres',
      port: process.env.DB_PORT || 5432,
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      dialectOptions: {
        ssl: process.env.DB_SSL === 'true' ? {
          require: true,
          rejectUnauthorized: false
        } : false
      }
    }
  );
  console.log('✅ Using PostgreSQL database');
} else {
  // SQLite for development or when PostgreSQL credentials are incomplete
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
  });
  console.log('✅ Using SQLite database (PostgreSQL credentials incomplete)');
}

module.exports = sequelize;
