'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Episodes', [
      {
        uploadDate: new Date(),
        uploadCount: 1,
        webtoonId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uploadDate: new Date(),
        uploadCount: 2,
        webtoonId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uploadDate: new Date(),
        uploadCount: 1,
        webtoonId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uploadDate: new Date(),
        uploadCount: 2,
        webtoonId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Episodes', null, {});
  },
};
