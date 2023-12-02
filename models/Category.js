const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

//import Product 
const Product = require('./Product.js')


class Category extends Model {}

Category.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

//Associations
Category.hasMany(Product, {
  foreignKey: 'category_id',
});

module.exports = Category;
