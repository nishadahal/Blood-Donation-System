import { useState, useEffect } from "react";

function EditDonor({ donor, onClose, onUpdated }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    bloodGroup: "",
    location: "",
    x_coordinate: "",
    y_coordinate: "",
  });

  useEffect(() => {
    if (donor) {
      setFormData({
        name: donor.name,
        phone: donor.phone,
        bloodGroup: donor.blood_group,
        location: donor.location,
        x_coordinate: donor.x_coordinate,
        y_coordinate: donor.y_coordinate,
      });
    }
  }, [donor]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const updateDonor = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/donor/${donor.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Donor updated successfully");
        onUpdated();
        onClose();
      } else {
        alert("Update failed");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[500px]">
        <h2 className="text-2xl font-bold text-red-700 mb-5">
          Edit Donor
        </h2>

        <form onSubmit={updateDonor} className="space-y-3">

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Name"
            required
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Phone"
            required
          />

          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="w-full border p-2 rounded"
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
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Location"
            required
          />

          <input
            type="number"
            name="x_coordinate"
            value={formData.x_coordinate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="X Coordinate"
            required
          />

          <input
            type="number"
            name="y_coordinate"
            value={formData.y_coordinate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Y Coordinate"
            required
          />

          <div className="flex justify-end gap-3 mt-5">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-red-700 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditDonor;