'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('meet_greets', {
      meet_greet_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      event_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'events',
          key: 'event_id'
        }
      },
      band_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      meet_start_time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      meet_end_time: {
        type: Sequelize.TIME,
        allowNull: false,
      }
    })
    // .then(() => queryInterface.addConstraint('meet_greets', {
    //   fields: ['event_id'],
    //   type: 'foreign key',
    //   name: 'event_meet_greet_association',
    //   references: {
    //     table: 'events',
    //     field: 'event_id',
    //   },
    //   onDelete: 'cascade',
    //   onUpdate: 'cascade',
    // }));
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('meet_greets');
  }
};