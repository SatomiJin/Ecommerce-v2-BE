import ProductService from "../Service/ProductService";
const createNewProduct = async (req, res) => {
  try {
    let response = await ProductService.createNewProduct(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from sever...",
    });
  }
};
const getAllProduct = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    let response = await ProductService.getAllProduct(+limit || 6, +page || 0, sort, filter);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from sever...",
    });
  }
};

//update product
const updateProduct = async (req, res) => {
  try {
    let response = await ProductService.updateProduct(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from sever...",
    });
  }
};

//delete product
const deleteProduct = async (req, res) => {
  try {
    let response = await ProductService.deleteProduct(req.query.productName);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from sever...",
    });
  }
};

//get detail product

const getDetailProduct = async (req, res) => {
  try {
    let response = await ProductService.getDetailProduct(req.query.productName);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from sever...",
    });
  }
};

//get  all type
const getAllTypeProduct = async (req, res) => {
  try {
    let response = await ProductService.getAllTypeProduct();
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from sever...",
    });
  }
};

const getAllProductByType = async (req, res) => {
  try {
    let response = await ProductService.getAllProductByType(req.query.typeProduct);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from sever...",
    });
  }
};

const change = async (req, res) => {
  try {
    let response = await ProductService.change();
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from sever...",
    });
  }
};
module.exports = {
  createNewProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  getDetailProduct,
  getAllTypeProduct,
  getAllProductByType,
  change,
};
