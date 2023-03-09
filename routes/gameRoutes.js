/** @format */

const router = require("express").Router();
const {
  getAllGames,
  createGame
} = require("../controllers/gameController");

router.route("/getAllGames").get(getAllGames);
router.route("/createGame").get(createGame);



module.exports = router;
