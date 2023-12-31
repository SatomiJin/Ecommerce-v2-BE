"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Product.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      image: DataTypes.STRING,
      price: DataTypes.INTEGER,
      rating: DataTypes.STRING,
      description: DataTypes.TEXT("long"),
      discount: DataTypes.INTEGER,
      sold: DataTypes.INTEGER,
      countInStock: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
