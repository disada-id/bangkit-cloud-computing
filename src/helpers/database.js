require('dotenv').config();
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
let sequelize;

if (env === 'production') {
  sequelize = new Sequelize(
    process.env.DB_DATABASE_PROD,
    process.env.DB_USERNAME_PROD,
    process.env.DB_PASSWORD_PROD,
    {
      host: process.env.DB_HOST_PROD,
      dialect: process.env.DB_DIALECT_PROD,
      port: process.env.DB_PORT_PROD,
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
        acquire: 30000,
      },
      logging: false,
    },
  );
} else {
  sequelize = new Sequelize(
    process.env.DB_DATABASE_DEV,
    process.env.DB_USERNAME_DEV,
    process.env.DB_PASSWORD_DEV,
    {
      host: process.env.DB_HOST_DEV,
      dialect: process.env.DB_DIALECT_DEV,
      port: process.env.DB_PORT_DEV,
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
        acquire: 30000,
      },
      logging: false,
    },
  );
}

module.exports = sequelize;
