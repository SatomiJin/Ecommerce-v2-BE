import db from "../models";
import EmailService from "../Service/EmailService.js";

const createOrder = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const promises = await data.orderItems.map(async (item) => {
        const product = await db.Product.findOne({
          where: {
            name: item.name,
            countInStock: {
              [db.Sequelize.Op.gt]: item.amount,
            },
          },
          raw: false,
        });
        if (product) {
          product.countInStock = +product.countInStock - 1;
          product.sold = +product.sold + 1;
          await product.save();
          return {
            status: "OK",
            message: "Update count in stock is success",
          };
        } else {
          return {
            status: "ERROR",
            message: `Product with name: ${item.name} is not enoughs!!`,
            name: item.name,
          };
        }
      });
      const result = await Promise.all(promises);
      const newOrder = result && result.filter((item) => item.name);
      if (newOrder.length) {
        const arrProduct = [];
        newOrder.forEach((item) => {
          arrProduct.push(item.name);
        });
        resolve({
          status: "ERROR",
          message: `Product with name: ${arrProduct.join(",")} is not enough!!`,
        });
      } else {
        const createOrder = await db.Order.create({
          status: data.status || "S1",
          isPaid: data.isPaid || "P1",
          userId: data.userId,
          orderItems: data.orderItems,
          totalPrice: data.totalPrice,
          shippingPrice: data.shippingPrice,
          shippingAddress: data.shippingAddress,
          paymentMethod: data.paymentMethod?.name,
          shippingMethod: data.shippingMethod?.name,
        });
        if (createOrder) {
          await EmailService.sendEmailConfirmOrder(data);
          resolve({
            status: "OK",
            message: "Order is success!!",
            order: createOrder,
          });
        } else {
          resolve({
            status: "ERROR",
            message: "Order is failed!!",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllMyOrder = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        resolve({
          status: "ERROR",
          message: "Missing parameters....",
        });
      } else {
        let listOrders = await db.Order.findAll({
          where: { userId: +userId },
          // include: [
          //   {
          //     model: db.User,
          //     as: "userData",
          //     attributes: {
          //       exclude: ["password", "id", "image", "createdAt", "updatedAt", "roleId"],
          //     },
          //   },
          // ],
          // raw: false,
          // nest: true,
        });
        if (listOrders) {
          resolve({
            status: "OK",
            message: "Get information success!!",
            data: listOrders,
          });
        } else {
          resolve({
            status: "ERROR",
            message: "There are currently no orders",
            data: [],
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailOrderById = (orderId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!orderId) {
        resolve({
          status: "ERROR",
          message: "Missing parameter...",
        });
      } else {
        let order = await db.Order.findOne({
          where: { id: orderId },
          include: [
            {
              model: db.User,
              as: "userData",
              attributes: {
                exclude: ["password", "id", "image", "createdAt", "updatedAt", "roleId"],
              },
            },
          ],
          raw: false,
          nest: true,
        });
        if (order) {
          resolve({
            status: "OK",
            message: "Get detail's order is success!!",
            data: order,
          });
        } else {
          resolve({
            status: "ERROR",
            message: "The Order is not define",
            data: [],
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

const receivedOrder = (orderId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!orderId) {
        resolve({
          status: "ERROR",
          message: "Missing parameters...",
        });
      } else {
        let order = await db.Order.findOne({
          where: { id: orderId },
          raw: false,
        });
        if (order) {
          if (order && order.status === "S1") {
            resolve({
              status: "ERROR",
              message: "Order has not been confirmed",
            });
          }
          if (order && order.status === "S2") {
            order.status = "S3";
            order.isPaid = "P2";
            await order.save();
            resolve({
              status: "OK",
              message: "Update order is success!!",
            });
          }
        } else {
          resolve({
            status: "ERROR",
            message: "The order is not define",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

const confirmOrder = (orderId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!orderId) {
        resolve({
          status: "ERROR",
          message: "Missing parameters...",
        });
      } else {
        let order = await db.Order.findOne({
          where: { id: orderId },
          raw: false,
        });
        if (!order) {
          resolve({
            status: "ERROR",
            message: "The order is not define",
          });
        }
        console.log(order.status);
        if (order && order.status === "S1") {
          order.status = "S2";
          await order.save();
          resolve({
            status: "OK",
            message: "Update order is success!!",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllOrder = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let listOrder = await db.Order.findAll();
      let user = [];
      for (const item of listOrder) {
        if (item.userId) {
          let userData = await db.User.findOne({
            where: { id: item.userId },
            attributes: {
              exclude: ["password", "id", "image", "createdAt", "updatedAt", "roleId"],
            },
          });
          if (userData) {
            item.user = userData;
          }
        }
      }
      resolve({
        status: "OK",
        message: "Get all order is success!!",
        data: listOrder,
        user: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteOrderById = (orderId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!orderId) {
        resolve({
          status: "ERROR",
          message: "Missing parameters...",
        });
      } else {
        let order = await db.Order.findOne({
          where: { id: orderId },
          raw: false,
        });
        if (!order) {
          resolve({
            status: "ERROR",
            message: "The order is not exist",
          });
        } else {
          await order.destroy();
          resolve({
            status: "OK",
            message: "Deleted order!!!",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createOrder,
  getAllMyOrder,
  getDetailOrderById,
  receivedOrder,
  confirmOrder,
  getAllOrder,
  deleteOrderById,
};
