const mysql = require("mysql2");

const databaseConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "blood_donation",
});

databaseConnection.connect((error) => {
  if (error) {
    console.log("Database Connection Error:", error);
  } else {
    console.log("Database Connected Successfully");
  }
});

module.exports = databaseConnection;