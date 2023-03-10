'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ContentFields extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here

    }
  }
  ContentFields.init({
    name: DataTypes.STRING,
    content_type_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ContentFields'
  })
  return ContentFields
}
