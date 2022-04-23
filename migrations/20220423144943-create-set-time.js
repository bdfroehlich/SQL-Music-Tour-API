'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('set_times', {
      set_time_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      band_id: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      stage_id: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      event_id: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      start_time: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      end_time: {
        type: Sequelize.TIME,
        allowNull: false,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('set_times');
  }
};