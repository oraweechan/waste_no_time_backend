require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT 

const userVolunteerController = require("./controllers/userVolunteerController");


app.use(cors());
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/users", userVolunteerController);


// Default Route
app.get("/", (req, res) => {
  // add redirect at some point
  // res.status(200).json({
  //     "status": 200,
  //     "msg" : "server is up and running"
  // })
  // Cannot set headers after they are sent to the client
  // res.send('hello')
  res.redirect('/')
});

app.set("port", process.env.PORT);

app.listen(app.get("port"), () => {
  console.log(`✅ PORT: ${app.get("port")} 🌟`);
});