require('dotenv').config();
const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');

const env = process.env.NODE_ENV || 'development';
let sequelize;

if (env === 'production') {
  sequelize = new Sequelize(
    databaseConfig[env].database,
    databaseConfig[env].username,
    databaseConfig[env].password,
    {
      host: databaseConfig[env].host,
      dialect: databaseConfig[env].dialect,
      port: databaseConfig[env].port,
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
    databaseConfig[env].database,
    databaseConfig[env].username,
    databaseConfig[env].password,
    {
      host: databaseConfig[env].host,
      dialect: databaseConfig[env].dialect,
      port: databaseConfig[env].port,
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

module.exports = Sequelize;
