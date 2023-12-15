/* eslint-disable import/extensions */
const { Sequelize } = require('sequelize');
const config = require('../src/config/database');

const sequelize = new Sequelize(config.development);

async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log(
      'Connection to the database successfully.',
    );
  } catch (error) {
    console.error('Connect to database faile:', error);
  } finally {
    await sequelize.close();
  }
}

testDatabaseConnection();
