const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contestSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
  },
  startTime: {
    type: Number,
  },
  endTime: {
    type: Number,
  },
});

var Contests = mongoose.model('Contest', contestSchema);
module.exports = Contests;
