/** @format */

const router = require("express").Router();
const {
  getAllUsers,
  createUser,
  isExistUser,
  verifyUser,
  addInfo,
} = require("../controllers/userController");

router.route("/").get(getAllUsers);
router.route("/createUser").post(createUser);
router.route("/verifyOTP").post(verifyUser);
router.route("/isExistUser").post(isExistUser);
router.route("/addInfo").post(addInfo);

module.exports = router;
