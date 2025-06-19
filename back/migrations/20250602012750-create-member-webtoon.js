'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MemberWebtoons', {
      memberId: {
        type: Sequelize.STRING,
        primaryKey: true,
        references: { model: 'Members', key: 'memberId' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      webtoonId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: 'Webtoons', key: 'webtoonId' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('MemberWebtoons');
  },
};
