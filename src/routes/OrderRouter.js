import express from "express";
import OrderController from "../Controller/OrderController";
import { authUserMiddlerWare, authMiddleWare } from "../middleware/authMiddleware";
let router = express.Router();

router.post("/create-order", authUserMiddlerWare, OrderController.createOrder);
router.get("/get-all-my-order", authUserMiddlerWare, OrderController.getAllMyOrder);
router.get("/get-order-detail", authUserMiddlerWare, OrderController.getDetailOrderById);
router.put("/received-order", authUserMiddlerWare, OrderController.receivedOrder);
router.put("/confirm-order", authMiddleWare, OrderController.confirmOrder);
router.get("/get-all-order", authMiddleWare, OrderController.getAllOrder);
router.delete("/delete-order-by-id", OrderController.deleteOrderById);
module.exports = router;
