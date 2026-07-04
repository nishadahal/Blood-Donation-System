const express = require("express");

const router = express.Router();

const {
  registerDonor,
  searchDonor,
  findNearestDonor,
  getAllDonors,
  deleteDonor,
  updateDonor,
} = require("../controllers/donorController");

// Register Donor
router.post("/register", registerDonor);

// Search Donor by Blood Group
router.get("/donors/:bloodGroup", searchDonor);

// Find Nearest Donor (Euclidean Algorithm)
router.post("/nearest-donor", findNearestDonor);

// Get All Donors
router.get("/all-donors", getAllDonors);

// Delete Donor
router.delete("/donor/:id", deleteDonor);

// Update Donor
router.put("/donor/:id", updateDonor);

module.exports = router;