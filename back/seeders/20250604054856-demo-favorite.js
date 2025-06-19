'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('MemberWebtoons', [
      {
        memberId: 'user1',
        webtoonId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        memberId: 'user2',
        webtoonId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MemberWebtoons', null, {});
  },
};
