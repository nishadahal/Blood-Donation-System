import { useState } from "react";

function DonorForm() {
  const [donor, setDonor] = useState({
    name: "",
    phone: "",
    bloodGroup: "",
    location: "",
  });

  const handleChange = (e) => {
    setDonor({
      ...donor,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donor),
      });

      const data = await response.json();

      if (data.success) {
        alert("Donor Registered Successfully");

        setDonor({
          name: "",
          phone: "",
          bloodGroup: "",
          location: "",
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-red-700 mb-6">
        Donor Registration
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={donor.name}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={donor.phone}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <select
          name="bloodGroup"
          value={donor.bloodGroup}
          onChange={handleChange}
          className="w-full p-3 border rounded"
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

        <select
          name="location"
          value={donor.location}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        >
          <option value="">Select Location</option>
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

        <button
          type="submit"
          className="w-full bg-red-700 text-white py-3 rounded-lg hover:bg-red-800"
        >
          Register Donor
        </button>

      </form>
    </div>
  );
}

export default DonorForm;