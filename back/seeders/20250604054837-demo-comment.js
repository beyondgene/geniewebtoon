'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', [
      {
        content: '이 웹툰 너무 재밌어요!',
        memberId: 'user1',
        webtoonId: 1,
        episodeId: 1,
        likes: 3,
        dislikes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: '작가님 최고예요!',
        memberId: 'user2',
        webtoonId: 2,
        episodeId: 3,
        likes: 2,
        dislikes: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  },
};
