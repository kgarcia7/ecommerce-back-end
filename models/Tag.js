const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');
// import Product model
const Product = require('./Product.js');

class Tag extends Model {}

Tag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      autoIncrement: true, 
      allowNull: false, 
    },
    tag_name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

// Associations
Tag.belongsToMany(Product, {
  through: 'ProductTag',
  foreignKey: 'tag_id',
});

module.exports = Tag;
