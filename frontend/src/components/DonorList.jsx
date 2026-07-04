import { useEffect, useState } from "react";
import EditDonor from "./EditDonor";

function DonorList() {
  const [donors, setDonors] = useState([]);
  const [selectedDonor, setSelectedDonor] = useState(null);

  const loadDonors = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/all-donors");
      const data = await response.json();

      if (data.success) {
        setDonors(data.donorList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadDonors();
  }, []);

  const deleteDonor = async (id) => {
    if (!window.confirm("Are you sure you want to delete this donor?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/donor/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Donor Deleted Successfully");
        loadDonors();
      } else {
        alert("Delete Failed");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-xl p-8 mt-10">

      <h2 className="text-3xl font-bold text-center text-red-700 mb-8">
        Registered Donors
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full border border-gray-300">

          <thead className="bg-red-700 text-white">

            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Blood Group</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">X</th>
              <th className="p-3 border">Y</th>
              <th className="p-3 border">Action</th>
            </tr>

          </thead>

          <tbody>

            {donors.length > 0 ? (
              donors.map((donor) => (
                <tr
                  key={donor.id}
                  className="text-center hover:bg-red-50"
                >
                  <td className="border p-3">{donor.name}</td>
                  <td className="border p-3">{donor.phone}</td>
                  <td className="border p-3 font-bold text-red-700">
                    {donor.blood_group}
                  </td>
                  <td className="border p-3">{donor.location}</td>
                  <td className="border p-3">{donor.x_coordinate}</td>
                  <td className="border p-3">{donor.y_coordinate}</td>

                  <td className="border p-3">

                    <button
                      onClick={() => setSelectedDonor(donor)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteDonor(donor.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center p-5 text-gray-500"
                >
                  No Donors Found
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      {selectedDonor && (
        <EditDonor
          donor={selectedDonor}
          onClose={() => setSelectedDonor(null)}
          onUpdated={loadDonors}
        />
      )}

    </div>
  );
}

export default DonorList;