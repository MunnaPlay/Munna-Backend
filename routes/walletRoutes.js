/** @format */

const router = require("express").Router();
const {
  addMoney,
  createOrder
} = require("../controllers/walletController");

router.route("/addMoney").post(addMoney);

router.route("/createOrder").post(createOrder);

module.exports = router;
