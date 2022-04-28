
const express = require("express");
const router = express.Router();
const Event = require("../models/eventSchema");
const User = require("../models/userSchema");
const auth = require ('../middleware/auth.js');

router.post("/", (req, res) => {
  Event.create(req.body).then((event) => {
    res.status(201).json({ status: 201, event: event });
  });
});

router.get("/", async (req, res) => {
  try {
    Event.find()
    .then((posts) => res.json(posts))
  } catch(error) {
    res.status(400).json("error: " + error.message);
  } 
});
// router.get("/", auth, async (req, res) => {
//   try {
//     Event.find()
//     .then((posts) => res.json(posts))
//   } catch(error) {
//     res.status(400).json("error: " + error.message);
//   } 
// });

//add event
// router.route("/create/:id").post(auth, async (req, res) => {
//   const { title, body, address, date, startTime, endTime } = req.body;
//   const { id } = req.params;
//   const user = await User.findById(id);
//   const newEvent = new Event({
//     title, body, address, date, startTime, endTime,
//     users: user.email
//   });
//   newEvent
//     .save()
//     .then(() => res.json( {newEvent} ))
//     .catch((err) => res.status(400).json(err));
// });

router.route("/add/:id").put( async (req, res) => {
  try {
    const { email } = req.body;
    const  eventId  = req.params.id;
    const eventDoc = await Event.findById(eventId)
    const addUserEvent = await eventDoc.updateOne(
      { $addToSet:{ users: email}}
    )
    const savedEvent = await eventDoc.save()
    return res.json(savedEvent)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete("/:id", (req, res) => {
  Event.deleteOne({ _id: req.params.id }).then(() => {
    res.status(204).json();
  });
});

module.exports = router;