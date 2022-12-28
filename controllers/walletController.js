/** @format */

const asyncHandler = require("express-async-handler");
const Users = require("../models/userModel");

const addMoney = asyncHandler(async (req, res) => {
  const {mobile, amount } = req.body;
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



module.exports = {
  addMoney
};
