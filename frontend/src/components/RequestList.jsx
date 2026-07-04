import { useEffect, useState } from "react";

function RequestList() {
  const [requests, setRequests] = useState([]);

  const loadRequests = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/blood-requests"
      );

      const data = await response.json();

      if (data.success) {
        setRequests(data.requestList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-xl p-8 mt-10">

      <h2 className="text-3xl font-bold text-center text-red-700 mb-8">
        Blood Request List
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full border border-gray-300">

          <thead className="bg-red-700 text-white">

            <tr>
              <th className="border p-3">Patient</th>
              <th className="border p-3">Phone</th>
              <th className="border p-3">Blood Group</th>
              <th className="border p-3">Hospital</th>
              <th className="border p-3">Location</th>
              <th className="border p-3">Units</th>
              <th className="border p-3">Date</th>
            </tr>

          </thead>

          <tbody>

            {requests.length > 0 ? (
              requests.map((request) => (
                <tr
                  key={request.id}
                  className="text-center hover:bg-red-50"
                >
                  <td className="border p-3">
                    {request.patient_name}
                  </td>

                  <td className="border p-3">
                    {request.phone}
                  </td>

                  <td className="border p-3 font-bold text-red-700">
                    {request.blood_group}
                  </td>

                  <td className="border p-3">
                    {request.hospital}
                  </td>

                  <td className="border p-3">
                    {request.location}
                  </td>

                  <td className="border p-3">
                    {request.units_required}
                  </td>

                  <td className="border p-3">
                    {new Date(
                      request.request_date
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center p-5 text-gray-500"
                >
                  No Blood Requests Found
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default RequestList;