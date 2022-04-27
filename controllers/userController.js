const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/userSchema");
const Event = require("../models/eventSchema");

//All users
router.get("/", (req, res) => {
  User.find().then((user) => {
    res.json({ status: 200, user: user });
  });
});

//Update users


// router.put("/update-user/:id", (req, res) => {
//   User.findByIdAndUpdate(
//     { _id: req.params.id },
//     { $addToSet: { events: req.body.events }}
//   ).then((result, error) => {
//     if (error) {
//       console.log(error);
//       res.status(500).json({
//         message:
//         "Something went wrong, please try again later."
//       })
//     } else {
//       res.status(200).json({ result });
//     }
//   });
// });

// delete user
router.delete("/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id }).then(() => {
    res.status(204).json();
  });
});




// Signup
router.post("/signup", async (req, res) => {
  try {
    let { name, email, password, role } = req.body;
    // validate
    if (!name || !email || !password || !role)
      return res.status(422).json({ error: "Please add all fields" });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: passwordHash,
      name,
      role,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// SignIn
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Please add all fields." });
    const existingUser = await User.findOne({ email: email });
    if (!existingUser)
      return res.status(400).json({ msg: "Invalid Email or password." });
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid Email or password." });
    const token = jwt.sign({ id: existingUser._id }, "secret");
    res.json({
      token,
      user: {
        id: existingUser._id,
        username: existingUser.username,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Check if token is valid
router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, "secret");
    if (!verified) return res.json(false);
    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    displayName: user.displayName,
    id: user._id,
  });
});


//add event
router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  const email = user.email ;
  // delete from events
  const events = await Event.find({ users: email });
  const event = events
console.log(event)

});


module.exports = router;


