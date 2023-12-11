import express from "express";
import ProductController from "../Controller/ProductController";
import { authUserMiddlerWare, authMiddleWare } from "../middleware/authMiddleware";
let router = express.Router();

router.post("/create-new-product", authMiddleWare, ProductController.createNewProduct);
router.get("/get-all-product", ProductController.getAllProduct);
router.get("/get-all-type", ProductController.getAllTypeProduct);
router.get("/get-all-product-by-type", ProductController.getAllProductByType);
router.put("/update-product", authMiddleWare, ProductController.updateProduct);
router.put("/change", ProductController.change);
router.delete("/delete-product", authMiddleWare, ProductController.deleteProduct);
router.get("/get-detail-product", ProductController.getDetailProduct);

module.exports = router;
