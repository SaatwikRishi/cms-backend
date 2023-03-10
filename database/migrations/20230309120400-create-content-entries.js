'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ContentEntries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content_type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ContentTypes',
          key: 'id'
        },
        allowNull: false
      },
      json: {
        allowNull: false,
        type: Sequelize.JSON,
        get: function () {
          return JSON.parse(this.getDataValue('json'))
        },
        set: function (value) {
          return this.setDataValue('json', JSON.stringify(value))
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('ContentEntries')
  }
}
