import express from "express";
// import { authUserMiddlerWare, authMiddleWare } from "../middleware/authMiddleware";
let router = express.Router();
require("dotenv").config();

router.get("/paypal", (req, res) => {
  return res.status(200).json({
    status: "OK",
    message: "Get client id paypal success!!",
    data: process.env.CLIENT_ID_PAYPAL,
  });
});

module.exports = router;
