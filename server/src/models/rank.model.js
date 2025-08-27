const mongoose = require("mongoose");

const rankSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  data: {
    type: Number,
    min: 0,  
    default: 0,
  },
  height: {
    type: Number,
    default: 1,
  },
  leftNode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rank",
    default: null,
  },
  rightNode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rank",
    default: null,
  },
});

module.exports = mongoose.model("Rank", rankSchema);
