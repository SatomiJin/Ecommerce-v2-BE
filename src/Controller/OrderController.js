import OrderService from "../Service/OrderService";
const createOrder = async (req, res) => {
  try {
    let data = req.body;
    if (!data) {
      return res.status(200).json({
        status: "ERROR",
        message: "Missing parameter...",
      });
    }
    let response = await OrderService.createOrder(data);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const getAllMyOrder = async (req, res) => {
  try {
    let userId = req.query.userId;
    let response = await OrderService.getAllMyOrder(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const getDetailOrderById = async (req, res) => {
  try {
    let orderId = req.query.orderId;
    let response = await OrderService.getDetailOrderById(orderId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const receivedOrder = async (req, res) => {
  try {
    let orderId = req.query.orderId;
    let response = await OrderService.receivedOrder(orderId);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const confirmOrder = async (req, res) => {
  try {
    let orderId = req.query.orderId;
    let response = await OrderService.confirmOrder(orderId);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const getAllOrder = async (req, res) => {
  try {
    let response = await OrderService.getAllOrder();
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const deleteOrderById = async (req, res) => {
  try {
    let orderId = req.query.orderId;
    let response = await OrderService.deleteOrderById(orderId);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
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
