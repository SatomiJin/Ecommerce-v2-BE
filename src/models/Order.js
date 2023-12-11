"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: "userId", targetKey: "id", as: "userData" });
    }
  }
  Order.init(
    {
      status: DataTypes.STRING,
      isPaid: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      orderItems: DataTypes.JSONB,
      totalPrice: DataTypes.INTEGER,
      shippingPrice: DataTypes.INTEGER,
      shippingAddress: DataTypes.STRING,
      paymentMethod: DataTypes.STRING,
      shippingMethod: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
