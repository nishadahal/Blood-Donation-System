import { useState } from "react";

function RequestBlood() {
  const [requestData, setRequestData] = useState({
    patient_name: "",
    phone: "",
    blood_group: "",
    hospital: "",
    location: "",
    units_required: "",
  });

  const handleChange = (event) => {
    setRequestData({
      ...requestData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!/^[0-9]{10}$/.test(requestData.phone)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    if (Number(requestData.units_required) <= 0) {
      alert("Units Required must be greater than 0.");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/request-blood",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Blood Request Submitted Successfully");

        setRequestData({
          patient_name: "",
          phone: "",
          blood_group: "",
          hospital: "",
          location: "",
          units_required: "",
        });
      } else {
        alert("Failed to Submit Request");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8 mt-10">
      <h2 className="text-3xl font-bold text-center text-red-700 mb-8">
        Blood Request Form
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <input
          type="text"
          name="patient_name"
          placeholder="Patient Name"
          value={requestData.patient_name}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={requestData.phone}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <select
          name="blood_group"
          value={requestData.blood_group}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
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

        <input
          type="text"
          name="hospital"
          placeholder="Hospital Name"
          value={requestData.hospital}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={requestData.location}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="number"
          name="units_required"
          placeholder="Units Required"
          value={requestData.units_required}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-red-700 hover:bg-red-800 text-white py-3 rounded-lg text-lg font-semibold"
          >
            Request Blood
          </button>
        </div>
      </form>
    </div>
  );
}

export default RequestBlood;