'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'usertesting1@example.com',
          password: 'hashed_password',
          username: 'user1',
          fullname: 'User Testing One',
          nohp: '123456789',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: 'usertesting2@example.com',
          password: 'hashed_password',
          username: 'user2',
          fullname: 'User Testing Two',
          nohp: '987654321',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
