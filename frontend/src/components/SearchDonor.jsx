import { useState } from "react";

function SearchDonor() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState("");

  const [nearestDonor, setNearestDonor] = useState(null);
  const [donorList, setDonorList] = useState([]);

  const searchNearestDonor = async () => {
    if (bloodGroup === "" || location === "") {
      alert("Please fill all fields.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/nearest-donor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bloodGroup,
          location,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setNearestDonor(data.nearestDonor);
        setDonorList(data.donorList);
      } else {
        alert(data.message);
        setNearestDonor(null);
        setDonorList([]);
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl p-8 mt-10">

      <h2 className="text-3xl font-bold text-center text-red-700 mb-8">
        Search Nearest Donor
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <select
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          className="border p-3 rounded-lg"
        >
          <option value="">Select Blood Group</option>
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>AB+</option>
          <option>AB-</option>
          <option>O+</option>
          <option>O-</option>
        </select>

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-3 rounded-lg"
        >
          <option value="">Select Your Location</option>
           <option>Kalanki</option>
  <option>Kalimati</option>
  <option>Thamel</option>
  <option>New Road</option>
  <option>Putalisadak</option>
  <option>Dillibazar</option>
  <option>Naxal</option>
  <option>Baneshwor</option>
  <option>New Baneshwor</option>
  <option>Old Baneshwor</option>
  <option>Gaushala</option>
  <option>Chabahil</option>
  <option>Maharajgunj</option>
  <option>Baluwatar</option>
  <option>Samakhusi</option>
  <option>Gongabu</option>
  <option>Tokha</option>
  <option>Balaju</option>
  <option>Sitapaila</option>
  <option>Swoyambhu</option>
  <option>Kirtipur</option>

  <option>Patan</option>
  <option>Pulchowk</option>
  <option>Jawalakhel</option>
  <option>Sanepa</option>
  <option>Lagankhel</option>
  <option>Ekantakuna</option>
  <option>Satdobato</option>

  <option>Bhaktapur</option>
  <option>Lokanthali</option>
  <option>Suryabinayak</option>
  <option>Thimi</option>

  <option>Thankot</option>
  <option>Koteshwor</option>
        </select>

      </div>

      <button
        onClick={searchNearestDonor}
        className="w-full mt-6 bg-red-700 hover:bg-red-800 text-white py-3 rounded-lg text-lg font-semibold"
      >
        Find Nearest Donor
      </button>

      {nearestDonor && (
        <div className="mt-8 bg-green-100 border border-green-500 rounded-xl p-6">

          <h3 className="text-2xl font-bold text-green-700 mb-4">
            ⭐ Nearest Donor
          </h3>

          <p><strong>Name:</strong> {nearestDonor.name}</p>
          <p><strong>Phone:</strong> {nearestDonor.phone}</p>
          <p><strong>Blood Group:</strong> {nearestDonor.blood_group}</p>
          <p><strong>Location:</strong> {nearestDonor.location}</p>
          <p><strong>Distance:</strong> {nearestDonor.distance}</p>

        </div>
      )}

      {donorList.length > 0 && (
        <div className="mt-10">

          <h3 className="text-2xl font-bold text-red-700 mb-4">
            All Matching Donors
          </h3>

          <table className="w-full border-collapse border">

            <thead className="bg-red-700 text-white">
              <tr>
                <th className="border p-3">Name</th>
                <th className="border p-3">Phone</th>
                <th className="border p-3">Blood Group</th>
                <th className="border p-3">Location</th>
                <th className="border p-3">Distance</th>
              </tr>
            </thead>

            <tbody>
              {donorList.map((donor) => (
                <tr key={donor.id}>
                  <td className="border p-2">{donor.name}</td>
                  <td className="border p-2">{donor.phone}</td>
                  <td className="border p-2">{donor.blood_group}</td>
                  <td className="border p-2">{donor.location}</td>
                  <td className="border p-2">{donor.distance}</td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default SearchDonor;