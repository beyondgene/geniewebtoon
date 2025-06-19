'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('CommentLikes', [
      {
        userId: 'user2',
        commentId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 'user1',
        commentId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CommentLikes', null, {});
  },
};
