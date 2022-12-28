/** @format */

const asyncHandler = require("express-async-handler");
const Users = require("../models/userModel");

const createUser = asyncHandler(async (req, res) => {
  const { fullName, mobile, pin } = req.body;
  const otp = generateOtp();
  const isUser = await userExist({ mobile });
  if (isUser) {
    // await updateOTP({ mobile, otp });
    // const newUpdate = await userExist({ mobile });
    return res.status(200).json({
      data: "",
      status: false,
      msg: "User already exists",
    });
  }
  const user = new Users({
    fullName,
    mobile,
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
