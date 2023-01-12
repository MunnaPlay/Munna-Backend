const mongoose = require('mongoose');

const gamesSchema = mongoose.Schema(
  {
    name: String,
    status:String,
    entryStartsAt:String,
    entryEndsAt:String,
    resultTime:String,
    result:Number
  },
  { timestamps: true }
);

module.exports = Game = mongoose.model('Games', gamesSchema);
