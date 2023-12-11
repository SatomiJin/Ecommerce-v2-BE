import jwt from "jsonwebtoken";
require("dotenv").config();

const authMiddleWare = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(200).json({
        status: "ERROR",
        message: "Authorized is failed!!",
      });
    }
    if (user.role === "R1") {
      next();
    } else {
      return res.status(200).json({
        status: "ERROR",
        message: "Authorized is failed!!",
      });
    }
  });
};

const authUserMiddlerWare = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  const userEmail = req.headers.email;

  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(200).json({
        status: "ERROR",
        message: "Authorized user is failed!!!",
        err: err,
      });
    }
    if (user.email === userEmail) {
      next();
    } else {
      return res.status(200).json({
        status: "ERROR",
        message: "Authorized user is failed!!!",
        fail: 2,
      });
    }
  });
};

module.exports = {
  authMiddleWare,
  authUserMiddlerWare,
};
