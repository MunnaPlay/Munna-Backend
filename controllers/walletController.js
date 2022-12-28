/** @format */

const asyncHandler = require("express-async-handler");
const Users = require("../models/userModel");

const addMoney = asyncHandler(async (req, res) => {
  const {mobile, amount } = req.body;
  const isUser = await Users({ mobile });
  if (isUser) {
    const walletUpdate = await Users.updateOne({mobile}, {
      $set:{
        'wallet.amount':parseInt(amount) + parseInt(isUser.wallet.amount)
      }
    })
    if(walletUpdate)
    {
      return res.status(200).json({
        data: '',
        status: true,
        msg: "Wallet Update",
      });
    }
  }
  else
  {
    return res.status(200).json({
      data: '',
      status: false,
      msg: "User Not Exist",
    });
  }
});



module.exports = {
  addMoney
};
