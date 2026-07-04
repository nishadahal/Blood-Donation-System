import { useEffect, useState } from "react";

function Dashboard() {
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalRequests: 0,
    Aplus: 0,
    Aminus: 0,
    Bplus: 0,
    Bminus: 0,
    ABplus: 0,
    ABminus: 0,
    Oplus: 0,
    Ominus: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const donorResponse = await fetch("http://127.0.0.1:5000/all-donors");
      const donorData = await donorResponse.json();

      const requestResponse = await fetch("http://127.0.0.1:5000/blood-requests");
      const requestData = await requestResponse.json();

      if (donorData.success && requestData.success) {
        const donors = donorData.donorList;

        setStats({
          totalDonors: donors.length,
          totalRequests: requestData.requestList.length,
          Aplus: donors.filter((d) => d.blood_group === "A+").length,
          Aminus: donors.filter((d) => d.blood_group === "A-").length,
          Bplus: donors.filter((d) => d.blood_group === "B+").length,
          Bminus: donors.filter((d) => d.blood_group === "B-").length,
          ABplus: donors.filter((d) => d.blood_group === "AB+").length,
          ABminus: donors.filter((d) => d.blood_group === "AB-").length,
          Oplus: donors.filter((d) => d.blood_group === "O+").length,
          Ominus: donors.filter((d) => d.blood_group === "O-").length,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cards = [
    { title: "Total Donors", value: stats.totalDonors, icon: "👥" },
    { title: "Blood Requests", value: stats.totalRequests, icon: "🩸" },
    { title: "A+", value: stats.Aplus, icon: "🅰️" },
    { title: "A-", value: stats.Aminus, icon: "🅰️" },
    { title: "B+", value: stats.Bplus, icon: "🅱️" },
    { title: "B-", value: stats.Bminus, icon: "🅱️" },
    { title: "AB+", value: stats.ABplus, icon: "💉" },
    { title: "AB-", value: stats.ABminus, icon: "💉" },
    { title: "O+", value: stats.Oplus, icon: "🩸" },
    { title: "O-", value: stats.Ominus, icon: "🩸" },
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <h2 className="text-4xl font-bold text-center text-red-700">
        Blood Donation Dashboard
      </h2>

      <p className="text-center text-gray-600 mt-2 mb-10">
        Overview of registered donors and blood requests.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition duration-300 border-t-4 border-red-700"
          >
            <div className="text-5xl mb-4">{card.icon}</div>

            <h3 className="text-lg font-semibold text-gray-700">
              {card.title}
            </h3>

            <p className="text-4xl font-bold text-red-700 mt-3">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;