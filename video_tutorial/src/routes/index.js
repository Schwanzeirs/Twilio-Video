const express = require("express");

//instantiate express module here
const router = express.Router()

// Controller
const {
    getTodos,
    addTodo,
  } = require("../controllers/VideoTutorial");

  const {
    postTwilio,
  } = require("../controllers/Twilio");
  
// Route
router.get("/todos", getTodos);
router.post("/todos", addTodo);
router.post("/join-room", postTwilio);

module.exports = router