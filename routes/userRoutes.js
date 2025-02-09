/** @format */

const router = require("express").Router();
const {
  getAllUsers,
  createUser,
  isExistUser,
  addInfo,
  sendOTP,
  verifyOTP
} = require("../controllers/userController");

router.route("/").get(getAllUsers);
router.route("/createUser").post(createUser);
router.route("/isExistUser").post(isExistUser);
router.route("/addInfo").post(addInfo);
router.route("/sendOTP").post(sendOTP);
router.route("/verifyOTP").post(verifyOTP);


module.exports = router;
