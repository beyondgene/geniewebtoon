'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Episodes', {
      episodeId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      uploadDate: Sequelize.DATE,
      uploadCount: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Episodes');
  },
};
