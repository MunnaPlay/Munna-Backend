/** @format */

const asyncHandler = require("express-async-handler");
const Games = require("../models/gameModel");

const getAllGames = asyncHandler(async (req, res) => {
  const isGames = await Games.find();
  if(isGames)
  {
    return res.status(200).json({
      data: {games:isGames},
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
  const game = new Games({
    gameId:'DESHWAR5AM',
    name: "Desawar (देशावर)",
    status:'Upcoming',
    entryOpenTime:Date.now(),
    entryCloseTime:Date.now(),
    resultTime:Date.now(),
    lastDayResult:45,
    todayResult:32,
    everyDayResultTime:'5 AM'
  });
  game.save()
  return res.status(200).json({
    data: {},
    status: false,
    msg: "no games found",
  });
});


module.exports = {
  getAllGames,
  createGame
};
