import UserService from "../Service/UserService";
import { refreshTokenJwtService } from "../Service/JwtService";

const helloWorld = (req, res) => {
  try {
    return res.status(200).json("Hello World!!!");
  } catch (e) {
    return res.status(200).json({
      status: "ERRORS",
      message: "Error from server",
    });
  }
};

const createNewUser = async (req, res) => {
  try {
    let newUser = await UserService.createNewUser(req.body);
    return res.status(200).json(newUser);
  } catch (e) {
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};
//sign in

const signIn = async (req, res) => {
  try {
    let response = await UserService.signIn(req.body);
    const { refresh_token, ...newResponse } = response;

    res.cookie("refresh_token", refresh_token, {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      path: "/",
      // maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ ...newResponse, refresh_token });
  } catch (e) {
    console.log("error", e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};
//get detail user by id
const getDetailUser = async (req, res) => {
  try {
    let userId = req.params.userId;

    if (!userId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Missing parameters...",
      });
    }
    let response = await UserService.getDetailUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    console.log("error", e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};
//get all user
const getAllUser = async (req, res) => {
  try {
    const response = await UserService.getAllUser();
    return res.status(200).json(response);
  } catch (e) {
    console.log("error", e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

//refresh token
const refreshToken = async (req, res) => {
  try {
    let token = req.headers.token.split(" ")[1];
    if (!token) {
      return res.status(200).json({
        status: "ERROR",
        message: "Missing parameter..",
      });
    }
    const response = await refreshTokenJwtService(token);
    return res.status(200).json(response);
  } catch (e) {
    console.log("error", e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

//update user info
const updateUserInfo = async (req, res) => {
  try {
    let data = req.body;
    const response = await UserService.updateUserInfo(data);
    return res.status(200).json(response);
  } catch (e) {
    console.log("error", e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const deleteUserByEmail = async (req, res) => {
  try {
    let userEmail = req.query.email;
    const response = await UserService.deleteUserByEmail(userEmail);
    return res.status(200).json(response);
  } catch (e) {
    console.log("error", e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};
module.exports = {
  createNewUser,
  signIn,
  getDetailUser,
  refreshToken,
  updateUserInfo,
  getAllUser,
  deleteUserByEmail,
  helloWorld,
};
