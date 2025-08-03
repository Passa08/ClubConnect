const { Sequelize } = require('sequelize');
require('dotenv').config();

// Use PostgreSQL for production (Render), SQLite for development
const isProduction = process.env.NODE_ENV === 'production';

let sequelize;

if (isProduction) {
  // PostgreSQL for production (Render)
  sequelize = new Sequelize(
    process.env.DB_NAME || 'clubconnect',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASS || 'password',
    {
      host: process.env.DB_HOST || 'localhost',
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
} else {
  // SQLite for development
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
  });
}

module.exports = sequelize;
