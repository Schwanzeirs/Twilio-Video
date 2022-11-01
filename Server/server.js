'use strict';

//read .env
require("dotenv").config();

//express server
const express = require("express");
const app = express();
const port = process.env.PORT ||5000;
app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});

// body request
const cors = require('cors');
app.use(cors())
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// routes
const router =  require("./src/routes")
app.use("/", router)
app.get("/", cors(), async (req, res) => {
  res.send("Server connected")
})