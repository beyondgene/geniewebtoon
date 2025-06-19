'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Advertisements', {
      adId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      adLocation: Sequelize.STRING,
      exposureFrequency: Sequelize.INTEGER,
      peakViewingTimes: Sequelize.STRING,
      primaryAgeGroup: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Advertisements');
  },
};
