const mongoose = require("../db/connection");

const eventReportSchema = new mongoose.Schema({
  numberOfVolunteers: {
    type: Number,
  },
  numberOfBagsCollected: {
    type: Number,
  },
  beforePictures: {
    type: Object,
  },
  afterPictures: {
    type: Object,
  },
});

const EventReport = mongoose.model("EventReport", eventReportSchema);
module.exports = EventReport;
