'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'user1@example.com',
          password: 'hashed_password',
          username: 'user1',
          fullname: 'User One',
          nohp: '123456789',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: 'user2@example.com',
          password: 'hashed_password',
          username: 'user2',
          fullname: 'User Two',
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
