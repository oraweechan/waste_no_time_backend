const express = require("express");
const router = express.Router();
const EventReport = require("../models/eventReportSchema");
const User = require("../models/userSchema");
const auth = require("../middleware/auth.js");

//post event report
router.post("/", async (req, res) => {
  try {
    EventReport.create(req.body).then((eventReport) =>
      res.status(201).json({ status: 201, eventReport: eventReport })
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get all event reports
router.get("/", async (req, res) => {
  try {
    EventReport.find().then((posts) => res.json(posts));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get individual event report
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    EventReport.findById(id).then((post) => res.json(post));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
