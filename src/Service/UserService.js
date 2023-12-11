import db from "../models/index";
import bcrypt from "bcrypt";
import { generalAccessToken, generalRefreshToken } from "./JwtService";
const createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.password ||
        !data.phoneNumber ||
        !data.firstName ||
        !data.lastName ||
        !data.address ||
        !data.gender
      ) {
        resolve({
          status: "ERROR",
          message: "Missing parameters!!!",
        });
      } else {
        let checkEmail = await db.User.findOne({
          where: { email: data.email },
        });
        if (checkEmail) {
          resolve({
            status: "ERROR",
            message: "The email is exist",
          });
        } else {
          if (data.password !== data.confirmPassword) {
            resolve({
              status: "WARNING",
              message: "Mật khẩu nhập lại không chính xác!! vui lòng thử lại",
            });
          } else {
            let hashPass = bcrypt.hashSync(data.password, 10);
            await db.User.create({
              email: data.email,
              password: hashPass,
              phoneNumber: data.phoneNumber,
              firstName: data.firstName,
              lastName: data.lastName,
              address: data.address,
              gender: data.gender,
              roleId: data && data.roleId ? data.roleId : "R3",
              image: data.avatar,
            });
            resolve({
              status: "OK",
              message: "Đăng ký người dùng thành công",
            });
          }
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
//sign in
const signIn = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.password) {
        resolve({
          status: "ERROR",
          message: "Missing parameters for login",
        });
      }
      let checkUser = await db.User.findOne({
        where: { email: data.email },
      });
      if (!checkUser) {
        resolve({
          status: "ERROR",
          message: "The user is not define",
        });
      }

      let comparePass = bcrypt.compareSync(data.password, checkUser.password);
      if (!comparePass) {
        resolve({
          status: "ERROR",
          message: "Password is wrong!!",
        });
      }
      const access_token = await generalAccessToken({
        id: checkUser.id,
        email: checkUser.email,
        role: checkUser.roleId,
      });
      const refresh_token = await generalRefreshToken({
        id: checkUser.id,
        email: checkUser.email,
        role: checkUser.roleId,
      });
      resolve({
        status: "OK",
        message: "Login success!!!",
        access_token: access_token,
        refresh_token: refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

//get detail user by id
const getDetailUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });
      if (user && user.image) {
        user.image = Buffer.from(user.image, "base64").toString("binary");
      }
      if (!user) {
        resolve({
          status: "ERROR",
          message: "User is not define",
        });
      } else {
        resolve({
          status: "OK",
          message: "Get detail's user is success!",
          data: user,
        });
      }
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};
//get  all user
const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let listUser = await db.User.findAll({
        attributes: {
          exclude: ["image"],
        },
      });
      if (!listUser) {
        resolve({
          status: "ERROR",
          message: "No users found!!",
        });
      } else {
        resolve({
          status: "OK",
          message: "Get all users success!!",
          data: listUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

//updateUserInfo
const updateUserInfo = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userUpdate = await db.User.findOne({
        where: { email: data.email },
        raw: false,
      });
      if (!userUpdate) {
        resolve({
          status: "ERROR",
          message: "User is not define!!",
        });
      } else {
        userUpdate.firstName = data.firstName;
        userUpdate.lastName = data.lastName;
        userUpdate.address = data.address;
        userUpdate.phoneNumber = data.phoneNumber;
        userUpdate.gender = data.gender;
        userUpdate.image = data.image;
        userUpdate.roleId = data.roleId;
        await userUpdate.save();
        resolve({
          status: "OK",
          message: "Updates user is success!!!",
          userUpdate: userUpdate,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

//delete user by email
const deleteUserByEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userDelete = await db.User.findOne({
        where: { email: email },
        raw: false,
      });

      if (!userDelete) {
        resolve({
          status: "ERROR",
          message: "User is not define!!",
        });
      } else {
        await userDelete.destroy();
        resolve({
          status: "OK",
          message: "Delete user is success!!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createNewUser,
  signIn,
  getDetailUser,
  updateUserInfo,
  getAllUser,
  deleteUserByEmail,
};
