const { Sequelize } = require('sequelize');
require('dotenv').config();

// Check if we have proper PostgreSQL credentials
const hasPostgresCredentials = process.env.DB_HOST && 
                             process.env.DB_USER && 
                             process.env.DB_PASS && 
                             process.env.DB_NAME;

// Use PostgreSQL only if we have all credentials, otherwise use SQLite
const usePostgres = process.env.NODE_ENV === 'production' && hasPostgresCredentials;

let sequelize;

if (usePostgres) {
  // PostgreSQL for production with proper credentials
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
  // SQLite for development or when PostgreSQL credentials are missing
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
  });
  console.log('✅ Using SQLite database');
}

module.exports = sequelize;
