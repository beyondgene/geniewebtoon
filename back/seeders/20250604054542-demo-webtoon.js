'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Webtoons', [
      {
        webtoonName: '사랑의 알고리즘',
        genre: '로맨스',
        views: 1000,
        artistId: 1,
        thumbnail: 'love.png',
        weekday: 'mon',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        webtoonName: '좀비랜드',
        genre: '스릴러',
        views: 2000,
        artistId: 1,
        thumbnail: 'zombie.png',
        weekday: 'fri',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Webtoons', null, {});
  },
};
