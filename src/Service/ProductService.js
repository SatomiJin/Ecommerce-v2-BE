const { Op } = require("sequelize");
const db = require("../models");

const createNewProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkProduct = await db.Product.findOne({
        where: { name: data.name },
      });

      if (
        !data.name ||
        !data.type ||
        !data.image ||
        !data.price ||
        !data.description ||
        !data.discount ||
        !data.countInStock
      ) {
        resolve({
          status: "ERROR",
          message: "Missing parameters for create",
        });
      }
      if (checkProduct) {
        resolve({
          status: "OK",
          message: "Sản phẩm đẫ tồn tại",
        });
      } else {
        let newProduct = await db.Product.create({
          name: data.name.toLowerCase(),
          type: data.type.toLowerCase() ,
          image: data.image,
          price: data.price,
          rating: data.rating || 0,
          description: data.description,
          discount: data.discount,
          sold: data.sold || 0,
          countInStock: data.countInStock,
        });
        resolve({
          status: "OK",
          message: "Create a new product is success!",
          product: newProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

//get all product
const getAllProduct = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      let grossProduct = await db.Product.count();
      let allProduct = [];
      if (filter) {
        const label = filter;
        console.log(label);
        const allProductFilter = await db.Product.findAll({
          where: {
            name: {
              [db.Sequelize.Op.like]: `%${label}%`,
            },
            // name: {
            //   [db.Sequelize.Op.like]: label.toUpperCase(),
            // },
          },
          limit: limit,
          offset: page * limit,
          order: [
            ["createdAt", "DESC"],
            ["updatedAt", "DESC"],
          ],
        });
        if (allProductFilter && allProductFilter.length > 0) {
          allProductFilter.map((item) => {
            item.image = Buffer.from(item.image, "base64").toString("binary");
          });
        }
        resolve({
          status: "OK",
          message: "Get all product success!!",
          data: allProductFilter,
          total: grossProduct,
          pageCurrent: Number(page + 1),
          allPage: Math.ceil(grossProduct / limit),
        });
      }
      if (!limit) {
        allProduct = await db.Product.findAll({
          order: [
            ["createdAt", "DESC"],
            ["updatedAt", "DESC"],
          ],
        });
      } else {
        allProduct = await db.Product.findAll({
          limit: limit,
          offset: page * limit,
          order: [
            ["createdAt", "DESC"],
            ["updatedAt", "DESC"],
          ],
        });
      }

      if (allProduct && allProduct.length > 0) {
        allProduct.map((item) => {
          item.image = Buffer.from(item.image, "base64").toString("binary");
        });
      }
      resolve({
        status: "OK",
        message: "Get all product success!!",
        data: allProduct,
        total: grossProduct,
        pageCurrent: +(page + 1),
        allPage: Math.ceil(grossProduct / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};
//update product
const updateProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await db.Product.findOne({
        where: { name: data.name },
        raw: false,
      });
      if (!product) {
        resolve({
          status: "ERROR",
          message: "Product is not define",
        });
      } else {
        product.name = data.name;
        product.type = data.type;
        product.image = data.image;
        product.price = data.price;
        product.rating = data.rating;
        product.description = data.description;
        product.discount = data.discount;
        product.sold = data.sold;
        product.countInStock = data.countInStock;
        await product.save();
        resolve({
          status: "OK",
          message: "Update product is success!!!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

//delete product
const deleteProduct = (productName) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await db.Product.findOne({
        where: {
          name: {
            [Op.iLike]: productName,
          },
        },
        raw: false,
      });
      if (!product) {
        resolve({
          status: "ERROR",
          message: "Product is not define",
        });
      } else {
        await product.destroy();

        resolve({
          status: "OK",
          message: "Delete product is success!!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

//get detail product
const getDetailProduct = (productName) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!productName) {
        resolve({
          status: "ERROR",
          message: "Missing parameters for get detail!!",
        });
      } else {
        let product = await db.Product.findOne({
          where: { name: productName },
        });
        if (product) {
          if (product.image) {
            product.image = Buffer.from(product.image, "base64").toString("binary");
          }
          resolve({
            status: "OK",
            message: "Get detail product is success!!!",
            data: product,
          });
        } else {
          resolve({
            status: "ERROR",
            message: "Product is not define!!",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
//get all type
const getAllTypeProduct = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let allType = await db.Product.findAll({
        attributes: ["type"],
        group: ["type"],
      });
      if (allType) {
        if (allType && allType.length > 0) {
          for (let i = 0; i < allType.length; i++) {
            allType[i].id = i + 1;
          }
        }
        resolve({
          status: "OK",
          message: "Get all type success!!!!",
          data: allType,
        });
      } else {
        resolve({
          status: "OK",
          message: "Get all type failed!!",
          data: [],
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllProductByType = (typeProduct) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeProduct) {
        resolve({
          status: "ERROR",
          message: "Missing parameters...",
        });
      } else {
        let allProduct = await db.Product.findAll({
          where: { type: typeProduct },
        });
        if (allProduct && allProduct.length > 0) {
          allProduct.map((item) => {
            item.image = Buffer.from(item.image, "base64").toString("binary");
          });
        }
        resolve({
          status: "OK",
          message: "Get products is success!!",
          data: allProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const change = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let productType = await db.Product.findAll({
        raw: false,
      });
      if (productType && productType.length > 0) {
        productType.map(async (item) => {
          item.type = item.type.toLowerCase();
          await item.save();
        });
        resolve(productType);
      }
    } catch (e) {
      reject(e);
    }
  });
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
