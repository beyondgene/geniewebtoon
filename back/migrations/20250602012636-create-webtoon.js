'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Webtoons', {
      webtoonId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      webtoonName: Sequelize.STRING,
      genre: Sequelize.STRING,
      views: Sequelize.INTEGER,
      artistId: {
        type: Sequelize.INTEGER,
        references: { model: 'Artists', key: 'artistId' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Webtoons');
  },
};
