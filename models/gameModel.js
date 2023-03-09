const mongoose = require('mongoose');

const gamesSchema = mongoose.Schema(
  {
    gameId:String,
    name: String,
    status:String,
    entryOpenTime:Date,
    entryCloseTime:Date,
    resultTime:Date,
    lastDayResult:Number,
    todayResult:Number,
    everyDayResultTime:String
  },
  { timestamps: true }
);

module.exports = Game = mongoose.model('Games', gamesSchema);
