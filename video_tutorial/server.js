require("dotenv").config();
const express = require("express");
const app = express();
const port = 5000;
//Get routes to the variabel here
const router =  require("./src/routes")

// use the Express JSON middleware
app.use(express.json());

// Start the Express server
app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});

const cors = require('cors');
app.use(express.json())
app.use(cors())
app.use("/", router)

app.get("/", cors(), async (req, res) => {
  res.send("Server connected")
})
