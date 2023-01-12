/** @format */

const asyncHandler = require("express-async-handler");
const Games = require("../models/gameModel");

const getAllGames = asyncHandler(async (req, res) => {
  const isGames = await Games.find();
  if(isGames)
  {
    return res.status(200).json({
      data: {isGames},
      status: true,
      msg: "game data has been fetched",
    });
  }
  else
  {
    return res.status(200).json({
      data: {},
      status: false,
      msg: "no games found",
    });
  }
});

const createGame = asyncHandler(async (req, res) => {
  const {name} = req.body;
  const isGames = await Games.find();
  if(isGames)
  {
    return res.status(200).json({
      data: {isGames},
      status: true,
      msg: "game data has been fetched",
    });
  }
  else
  {
    return res.status(200).json({
      data: {},
      status: false,
      msg: "no games found",
    });
  }
});


module.exports = {
  getAllGames,
  createGame
};
