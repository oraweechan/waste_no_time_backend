
const express = require("express");
const router = express.Router();
const Event = require("../models/eventSchema");
const User = require("../models/userSchema");
const auth = require ('../middleware/auth.js');

//post event
router.post("/", async (req, res) => {
  try {
    Event.create(req.body)
    .then((event) => res.status(201).json({ status: 201, event: event }))
  } catch (error) {
    res.status(500).json({ error: error.message });
}});

// get all events
router.get("/", async (req, res) => {
  try {
    Event.find()
    .then((posts) => res.json(posts))
  } catch (error) {
    res.status(400).json({error: error.message});
  } 
});

// get individual events
router.get("/:id", async (req, res) => {
  
  try {
    const { id } = req.params;
    Event.findById(id)
    .then((post) => res.json(post))
  } catch (error) {
    res.status(400).json({error: error.message});
  } 
});


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

//delete event
router.delete("/:id", (req, res) => {
  Event.deleteOne({ _id: req.params.id }).then(() => {
    res.status(204).json();
  });
});

// update event
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const eventDoc = await Event.findById(id);
    console.log(eventDoc)
    const updateEvent = await eventDoc.updateOne(
      req.body
    )
    const savedEvent = await eventDoc.save()
    return res.json(savedEvent)
  } catch (error) {
    res.status(500).json({ error: error.message });
}});

module.exports = router;