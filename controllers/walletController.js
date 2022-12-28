/** @format */

const asyncHandler = require("express-async-handler");
const Users = require("../models/userModel");

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



module.exports = {
  addMoney
};
