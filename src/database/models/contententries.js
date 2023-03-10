'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ContentEntries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here

    }
  }
  ContentEntries.init({
    content_type_id: DataTypes.INTEGER,
    json: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'ContentEntries'
  })
  return ContentEntries
}
