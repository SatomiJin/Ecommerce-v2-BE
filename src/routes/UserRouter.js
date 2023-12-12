import express from "express";
import UserController from "../Controller/UserController";
import { authUserMiddlerWare, authMiddleWare } from "../middleware/authMiddleware";
let router = express.Router();

router.get("/", UserController.helloWorld);
router.post("/sign-up", UserController.createNewUser);
router.post("/sign-in", UserController.signIn);
router.get("/get-detail-user/:userId", authUserMiddlerWare, UserController.getDetailUser);
router.get("/get-all-user", authMiddleWare, UserController.getAllUser);
router.put("/update-user-info", authUserMiddlerWare, UserController.updateUserInfo);
router.delete("/delete-user", authMiddleWare, UserController.deleteUserByEmail);
router.post("/refresh-token", authUserMiddlerWare, UserController.refreshToken);

module.exports = router;
