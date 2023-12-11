"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      status: {
        type: Sequelize.STRING,
        allowNul: false,
      },
      isPaid: {
        type: Sequelize.STRING,
        allowNul: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNul: false,
      },
      orderItems: {
        type: Sequelize.JSONB,
        allowNul: false,
      },
      totalPrice: {
        type: Sequelize.INTEGER,
        allowNul: false,
      },
      shippingAddress: {
        type: Sequelize.STRING,
        allowNul: false,
      },
      paymentMethod: {
        type: Sequelize.STRING,
        allowNul: false,
      },
      shippingPrice: {
        type: Sequelize.INTEGER,
        allowNul: false,
      },
      shippingMethod: {
        type: Sequelize.STRING,
        allowNul: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
