const mongoose = require("../db/connection");

const eventSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
      }],
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
