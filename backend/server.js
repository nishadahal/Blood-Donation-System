const express = require("express");
const cors = require("cors");

require("./config/databaseConnection");

const donorRoutes = require("./routes/donorRoutes");
const requestRoutes = require("./routes/requestRoutes");

const application = express();

application.use(cors());
application.use(express.json());

application.get("/", (request, response) => {
  response.send("Blood Donation System API is Running...");
});

// Donor Routes
application.use("/", donorRoutes);

// Blood Request Routes
application.use("/", requestRoutes);

application.listen(5000, () => {
  console.log("Server running on port 5000");
});