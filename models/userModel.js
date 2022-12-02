const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    fullName: String,
    mobile: {
      type: String,
      unique: true,
    },
    otp:String,
    pin: String,
    wallet:{
        amount:Number
    },
    kyc:{
        panCard:Boolean,
        panCardNumber:String
    },
    bankDetails:[{
        bankName:String,
        ifsc:String,
        holderName:String,
        accountNumber:String
    }],
    upiDetails:[{
        upiApp:String,
        upiNumber:String
    }]
  },
  { timestamps: true }
);

module.exports = User = mongoose.model('User', userSchema);
