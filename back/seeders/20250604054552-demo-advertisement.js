'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Advertisements', [
      {
        adLocation: 'main_top',
        exposureFrequency: 100,
        peakViewingTimes: '18:00-21:00',
        primaryAgeGroup: '20대',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        adLocation: 'episode_mid',
        exposureFrequency: 50,
        peakViewingTimes: '13:00-15:00',
        primaryAgeGroup: '10대',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Advertisements', null, {});
  },
};
