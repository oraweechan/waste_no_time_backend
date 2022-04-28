require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

// const PORT = process.env.PORT || 8080;

const userRouter = require("./controllers/userController");
const eventController = require("./controllers/eventController");


app.use(cors());
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/users", userRouter);
app.use("/events", eventController);


// Default Route
// app.get("/", (req, res) => {
  // add redirect at some point
  // res.status(200).json({
  //     "status": 200,
  //     "msg" : "server is up and running"
  // })
  // Cannot set headers after they are sent to the client
  // res.send('hello')
//   res.redirect('/')
// });

app.set("port", process.env.PORT || 8080);

app.listen(app.get("port"), () => {
  console.log(`✅ PORT: ${app.get("port")} 🌟`);
});