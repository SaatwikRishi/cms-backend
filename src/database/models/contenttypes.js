'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ContentTypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.hasMany(models.ContentFields, {
        foreignKey: 'content_type_id'

      })
      this.hasMany(models.ContentEntries, {
        foreignKey: 'content_type_id'
      })
      // define association here
    }
  }
  ContentTypes.init({
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'ContentTypes'
  })
  return ContentTypes
}
