const express = require("express");

const router = express.Router();

const {
  requestBlood,
  getAllRequests,
} = require("../controllers/requestController");

// Submit Blood Request
router.post("/request-blood", requestBlood);

// Get All Blood Requests
router.get("/blood-requests", getAllRequests);

module.exports = router;