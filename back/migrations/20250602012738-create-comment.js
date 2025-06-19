'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      commentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      likes: Sequelize.INTEGER,
      dislikes: Sequelize.INTEGER,
      creationDate: Sequelize.DATE,
      memberId: {
        type: Sequelize.STRING,
        references: { model: 'Members', key: 'memberId' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      webtoonId: {
        type: Sequelize.INTEGER,
        references: { model: 'Webtoons', key: 'webtoonId' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Comments');
  },
};
