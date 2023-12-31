/* eslint-disable import/extensions */
const { Sequelize } = require('sequelize');
const config = require('./database');

const sequelize = new Sequelize(config.production);

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
