const asyncHandler = require("express-async-handler");
const Users = require("../models/userModel");


const getAllUsers = asyncHandler(async (req, res) => {
  var instance = new Razorpay({
    key_id: 'rzp_test_iUA7sfu0AzAFxv',
    key_secret: 'ekSUU2m864Z1dHAYg0Jbah2e',
  });
  const response = await instance.orders.create({
    amount: 50000,
    currency: "INR",
    receipt: "receipt#2"
  })

  return res.status(200).json({
    data:response,
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
  const { fullName, mobile } = req.body;
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
  const isUser = await Users.findOne({ mobile },{fullName:1, mobile:1, otp:1,email:1});
  return isUser;
};

const addInfo = asyncHandler(async (req, res) => {
  const { mobile, fullName, email } = req.body;
  const updatedUser = await Users.updateOne({ mobile }, { fullName, email });
  if (updatedUser) {
    return res.status(200).json({
      data: {
        mobile, fullName, email
      },
      status: true,
      msg: "Profile Updated",
    });
  }
});

const sendOTP = asyncHandler(async (req, res) => {
  const { mobile } = req.body;
  const otp = generateOtp();
  const isUser = await userExist({ mobile });
  if (isUser) {
    const updateOTP = await Users.updateOne({
      mobile:mobile
    },{
      $set:{
        otp:otp
      }
    });
    const updatedUser = await userExist({ mobile });
    return res.status(200).json({
      isUserExist:true,
      userInfo:updatedUser,
      status:true,
      msg: "User already exists",
    });
  }
  else
  {
    const user = new Users({
      mobile,
      wallet:{
        amount:0
      },
      otp,
    });
    await user.save();
    return res.status(200).json({
      isUserExist:false,
      userInfo:user,
      msg: "OTP sent to mobile",
    });
  }
});

const verifyOTP = asyncHandler(async (req, res) => {
  const { mobile, otp } = req.body;
  const isUser = await userExist({ mobile });
  if (isUser) {
    if(isUser.otp==otp)
    {
      return res.status(200).json({
        isUserExist:true,
        userInfo:isUser,
        status:true,
        msg: "OTP verified",
      });
    }
    else
    {
      return res.status(200).json({
        status:false,
        msg: "wrong OTP",
      });
    }
  }
  else
  {
    return res.status(200).json({
      status:false,
      msg: "User not exist",
    });
  }
});

module.exports = {
  getAllUsers,
  createUser,
  verifyUser,
  isExistUser,
  addInfo,
  verifyOTP,
  sendOTP
};
