/** @format */

const asyncHandler = require("express-async-handler");
const Users = require("../models/userModel");
// var FCM = require('fcm-node');
// var serverKey = 'AAAAo_KvWbA:APA91bETioVyoZtzDhmmB07xCxR5Adpmm1iJSinwNS2NPGz-mk2dHwWzRaIV6xI81rKCG46iwgpKMDK07tgGUhiyC4s4Z9oVpG1tkwsHaczHayabV_AesUDOXhU1DzL2UmMSh15wGbXr'; //put your server key here
// var fcm = new FCM(serverKey);
// import { initializeApp } from 'firebase/app';
// import { getMessaging } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: "AIzaSyAxRg10dJcrM0vW3ZkVvkMSjwmElcIq0H4",
//   authDomain: "hindishayari-20a94.firebaseapp.com",
//   databaseURL: "https://hindishayari-20a94-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "hindishayari-20a94",
//   storageBucket: "hindishayari-20a94.appspot.com",
//   messagingSenderId: "704151247280",
//   appId: "1:704151247280:web:8780b6a8bbfb9abd639e75",
//   measurementId: "G-LLDJJKNXJZ"
// };

// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

const getAllUsers = asyncHandler(async (req, res) => {
  return res.status(200).json({
    status: true,
    msg: "ISD Codes fetched successfully",
  });
});

const verifyUser = asyncHandler(async (req, res) => {
  const { mobile, otp, pin } = req.body;
  const user = await Users.findOne({ mobile });
  if (user) {
    if (user.otp == otp) {
      return res.status(200).json({
        data: user,
        status: true,
        msg: "successfully login",
      });
    } else {
      return res.status(200).json({
        status: false,
        msg: "wrong otp, try again",
      });
    }
  } else {
    return res.status(200).json({
      status: false,
      msg: "user not found for this mobile number",
    });
  }
});

const isExistUser = asyncHandler(async (req, res) => {
  const { mobile } = req.body;
  const otp = generateOtp();
  const user = await Users.findOne({ mobile });
  if (user) {
    const updatedUser = await Users.findOneAndUpdate(
      {
        mobile,
      },
      { otp }
    );
    return res.status(200).json({
      data: updatedUser,
      status: true,
      msg: "User Found",
    });
  } else {
    const user = new Users({
      mobile,
      otp,
    });
    await user.save();
    return res.status(201).json({
      data: user,
      status: true,
      msg: "OTP sent to mobile",
    });
  }
});

const createUser = asyncHandler(async (req, res) => {
  const { fullName, mobile, pin } = req.body;
  const otp = generateOtp();
  const isUser = await userExist({ mobile });
  if (isUser) {
    return res.status(200).json({
      data: "",
      status: false,
      msg: "User already exists",
    });
  }
  const user = new Users({
    fullName,
    mobile,
    wallet:{
      amount:0
    },
    otp,
    pin,
  });
  await user.save();
  return res.status(200).json({
    data: user,
    status: true,
    msg: "OTP sent to mobile",
  });
});

const generateOtp = () => {
  return Math.floor(Math.random() * (9999 - 1111 + 1) + 1111);
};

const userExist = async ({ mobile }) => {
  const isUser = await Users.findOne({ mobile });
  return isUser;
};

const updateOTP = async ({ mobile, otp }) => {
  await Users.updateOne({ mobile }, { otp });
};

const addInfo = asyncHandler(async (req, res) => {
  const { mobile, fullName, pin } = req.body;
  const updatedUser = await Users.updateOne({ mobile }, { fullName, pin });
  if (updatedUser) {
    return res.status(200).json({
      data: updatedUser,
      status: true,
      msg: "Profile Updated",
    });
  }
});

module.exports = {
  getAllUsers,
  createUser,
  verifyUser,
  isExistUser,
  addInfo,
};
