'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Members',
      [
        {
          memberId: 'user1',
          nickname: '웹툰러버',
          memberInfo: '웹툰광',
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          memberId: 'user2',
          nickname: '테스터2',
          memberInfo: '피드백왕',
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          memberId: 'admin',
          nickname: '관리자',
          memberInfo: 'system admin',
          isAdmin: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Members', null, {});
  },
};
