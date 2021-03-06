const mongoose = require("../db/connection");

const eventSchema = new mongoose.Schema({
  termsAndConditions: {
    type: String,
  },
  organizationName: {
    type: String,
  },
  eventName: {
    type: String,
  },
  cleanupLocation: {
    type: String,
  },
  primaryContact: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    address: {
      type: String,
    },
    mobilePhone: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  secondaryContact: {
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    mobilePhone: { type: String },
    email: { type: String },
  },
  dateCleanup: {
    date: { type: String },
    startTime: { type: String },
    endTime: { type: String },
  },
  rainDate: {
    date: { type: String },
    startTime: { type: String },
    endTime: { type: String },
  },
  mainStreetCleaning1: {
    mainStreet: { type: String },
    crossStreet1: { type: String },
    crossStreet2: { type: String },
  },
  mainStreetCleaning2: {
    mainStreet: { type: String },
    crossStreet1: { type: String },
    crossStreet2: { type: String },
  },
  mainStreetCleaning3: {
    mainStreet: { type: String },
    crossStreet1: { type: String },
    crossStreet2: { type: String },
  },
  bagPickupLocation1: {
    bagPickupLocation: { type: String },
    atIntersection: { type: String },
    inFront: { type: String },
  },
  bagPickupLocation2: {
    bagPickupLocation: { type: String },
    atIntersection: { type: String },
    inFront: { type: String },
  },
  bagPickupLocation3: {
    bagPickupLocation: { type: String },
    atIntersection: { type: String },
    inFront: { type: String },
  },
  litter: {
    type: String,
  },
  largerItems: {
    type: String,
  },
  requireSupplies: {
    type: String,
  },
  brooms: {
    type: String,
  },
  shovels: {
    type: String,
  },
  rakes: {
    type: String,
  },
  litterPickers: {
    type: String,
  },
  gloves: {
    type: String,
  },
  volunteerCount: {
    type: String,
  },
  consentToPublic: {
    type: String,
  },
  reportSubmitted: {
    type: String,
  },
  cleanUpReport: {
    numOfBags: {
      type: String,
    },
    numOfVolunteers: {
      type: String,
    },
    imgBefore: {
      type: String,
    },
    imgAfter: {
      type: String,
    },
  },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
