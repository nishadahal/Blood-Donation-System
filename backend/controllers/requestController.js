const databaseConnection = require("../config/databaseConnection");

// Save Blood Request
const requestBlood = (request, response) => {
  const {
    patient_name,
    phone,
    blood_group,
    hospital,
    location,
    units_required,
  } = request.body;

  const sqlQuery = `
    INSERT INTO blood_requests
    (patient_name, phone, blood_group, hospital, location, units_required)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  databaseConnection.query(
    sqlQuery,
    [
      patient_name,
      phone,
      blood_group,
      hospital,
      location,
      units_required,
    ],
    (error) => {
      if (error) {
        console.log(error);

        return response.status(500).json({
          success: false,
          message: "Failed to submit request",
        });
      }

      response.json({
        success: true,
        message: "Blood request submitted successfully",
      });
    }
  );
};

// Get All Blood Requests
const getAllRequests = (request, response) => {
  const sqlQuery =
    "SELECT * FROM blood_requests ORDER BY id DESC";

  databaseConnection.query(sqlQuery, (error, requestList) => {
    if (error) {
      console.log(error);

      return response.status(500).json({
        success: false,
      });
    }

    response.json({
      success: true,
      requestList,
    });
  });
};

module.exports = {
  requestBlood,
  getAllRequests,
};