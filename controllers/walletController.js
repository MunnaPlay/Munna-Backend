/** @format */

const asyncHandler = require("express-async-handler");
const Users = require("../models/userModel");
const Razorpay = require('razorpay');

const addMoney = asyncHandler(async (req, res) => {
  const {mobile, amount } = req.body;
  const isUser = await Users.findOne({mobile:mobile});
  if(isUser)
  {
    const updateWallet = await Users.updateOne({
      mobile:mobile
    },{
      $set:{
        'wallet.amount':amount + isUser.wallet.amount
      }
    });
    if(updateWallet)
    {
      return res.status(200).json({
        data: {},
        status: true,
        msg: "Money has been added",
      });
    }
  }
});

const createOrder = asyncHandler(async (req, res) => {
  const {amount, orderMode } = req.body;
  var instance = new Razorpay({
    key_id: 'rzp_test_iUA7sfu0AzAFxv',
    key_secret: 'ekSUU2m864Z1dHAYg0Jbah2e',
  });
  const response = await instance.orders.create({
    amount: amount*100,
    currency: "INR",
  })
  return res.status(200).json({
    data:response,
    status: true,
    msg: "Testing API",
  });
});



module.exports = {
  addMoney,
  createOrder
};
