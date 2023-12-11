import express from "express";
import UserRouter from "./UserRouter";
import ProductRouter from "./ProductRouter";
import OrderRouter from "./OrderRouter";
import PaymentRouter from "./PaymentRouter";
let router = express.Router();

let initWebRoute = (app) => {
  app.use("/", "Success connected!!!");
  app.use("/api/user", UserRouter);
  app.use("/api/product", ProductRouter);
  app.use("/api/order/", OrderRouter);
  app.use("/api/payment/", PaymentRouter);
};

module.exports = initWebRoute;
