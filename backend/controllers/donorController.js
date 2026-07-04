const databaseConnection = require("../config/databaseConnection");

// Location → Coordinates (NO API)
const locationCoordinates = {
  "Kalanki": { x: 5, y: 8 },
  "Kalimati": { x: 7, y: 10 },
  "Thamel": { x: 10, y: 12 },
  "New Road": { x: 11, y: 12 },
  "Putalisadak": { x: 12, y: 14 },
  "Dillibazar": { x: 13, y: 13 },
  "Naxal": { x: 15, y: 15 },
  "Baneshwor": { x: 18, y: 16 },
  "New Baneshwor": { x: 20, y: 18 },
  "Old Baneshwor": { x: 19, y: 17 },
  "Gaushala": { x: 14, y: 20 },
  "Chabahil": { x: 16, y: 20 },
  "Maharajgunj": { x: 14, y: 18 },
  "Baluwatar": { x: 13, y: 17 },
  "Samakhusi": { x: 10, y: 18 },
  "Gongabu": { x: 9, y: 20 },
  "Tokha": { x: 12, y: 22 },
  "Balaju": { x: 8, y: 18 },
  "Sitapaila": { x: 6, y: 14 },
  "Swoyambhu": { x: 8, y: 16 },
  "Kirtipur": { x: 6, y: 4 },

  "Patan": { x: 21, y: 11 },
  "Pulchowk": { x: 22, y: 12 },
  "Jawalakhel": { x: 23, y: 11 },
  "Sanepa": { x: 21, y: 9 },
  "Lagankhel": { x: 24, y: 10 },
  "Ekantakuna": { x: 20, y: 8 },
  "Satdobato": { x: 25, y: 8 },

  "Koteshwor": { x: 24, y: 20 },
  "Lokanthali": { x: 27, y: 19 },
  "Suryabinayak": { x: 31, y: 19 },
  "Thimi": { x: 28, y: 17 },
  "Bhaktapur": { x: 30, y: 18 },

  "Thankot": { x: 2, y: 7 }
};
// REGISTER DONOR
const registerDonor = (req, res) => {
  const { name, phone, bloodGroup, location } = req.body;

  console.log(req.body);

  const coord = locationCoordinates[location];

  console.log("Coordinate:", coord);

  if (!coord) {
    return res.json({
      success: false,
      message: "Invalid location"
    });
  }

  const sql = `
    INSERT INTO donors
    (name, phone, blood_group, location, x_coordinate, y_coordinate)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  databaseConnection.query(
    sql,
    [name, phone, bloodGroup, location, coord.x, coord.y],
    (err, result) => {

      console.log("Database Error:", err);

      if (err) {
        return res.json({
          success: false,
          message: err.sqlMessage
        });
      }

      res.json({
        success: true,
        message: "Donor Registered Successfully"
      });
    }
  );
};

// SEARCH DONOR
const searchDonor = (req, res) => {
  const bloodGroup = req.params.bloodGroup;

  databaseConnection.query(
    "SELECT * FROM donors WHERE blood_group = ?",
    [bloodGroup],
    (err, results) => {
      if (err) return res.json([]);

      res.json(results);
    }
  );
};

// NEAREST DONOR (EUCLIDEAN)
const findNearestDonor = (req, res) => {
  const { bloodGroup, location } = req.body;

  const userCoord = locationCoordinates[location];

  if (!userCoord) {
    return res.json({
      success: false,
      message: "Invalid user location"
    });
  }

  databaseConnection.query(
    "SELECT * FROM donors WHERE blood_group = ?",
    [bloodGroup],
    (err, donors) => {
      if (err) {
        return res.json({
          success: false,
          message: "Database error"
        });
      }

      if (donors.length === 0) {
        return res.json({
          success: false,
          message: "No donors found"
        });
      }

      const list = donors.map(d => {
        const dist = Math.sqrt(
          Math.pow(d.x_coordinate - userCoord.x, 2) +
          Math.pow(d.y_coordinate - userCoord.y, 2)
        );

        return {
          ...d,
          distance: Number(dist.toFixed(2))
        };
      });

      list.sort((a, b) => a.distance - b.distance);

      res.json({
        success: true,
        nearestDonor: list[0],
        donorList: list
      });
    }
  );
};

// GET ALL DONORS
const getAllDonors = (req, res) => {
  databaseConnection.query(
    "SELECT * FROM donors ORDER BY id DESC",
    (err, results) => {
      if (err) return res.json({ success: false });

      res.json({
        success: true,
        donorList: results
      });
    }
  );
};

// DELETE
const deleteDonor = (req, res) => {
  databaseConnection.query(
    "DELETE FROM donors WHERE id = ?",
    [req.params.id],
    (err) => {
      if (err) return res.json({ success: false });

      res.json({ success: true });
    }
  );
};

// UPDATE
const updateDonor = (req, res) => {
  const { name, phone, bloodGroup, location } = req.body;
  console.log("Request Body:", req.body);
console.log("Location:", req.body.location);
  const coord = locationCoordinates[location];

  databaseConnection.query(
    `
    UPDATE donors 
    SET name=?, phone=?, blood_group=?, location=?, x_coordinate=?, y_coordinate=?
    WHERE id=?
    `,
    [name, phone, bloodGroup, location, coord.x, coord.y, req.params.id],
    (err) => {
      if (err) return res.json({ success: false });

      res.json({ success: true });
    }
  );
};

module.exports = {
  registerDonor,
  searchDonor,
  findNearestDonor,
  getAllDonors,
  deleteDonor,
  updateDonor
};