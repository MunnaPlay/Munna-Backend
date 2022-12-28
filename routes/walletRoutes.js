/** @format */

const router = require("express").Router();
const {
  addMoney
} = require("../controllers/walletController");

router.route("/addMoney").post(addMoney);

module.exports = router;
