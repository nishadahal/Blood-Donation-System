function Footer() {
  return (
    <footer className="bg-red-700 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div>
            <h2 className="text-2xl font-bold mb-4">
              ❤️ Blood Donation System
            </h2>

            <p className="text-red-100 leading-7">
              Blood Donation Management System helps connect blood donors
              with patients quickly using the Euclidean Distance Algorithm.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">
              Quick Links
            </h2>

            <ul className="space-y-2">
              <li className="hover:text-yellow-300 cursor-pointer">Home</li>
              <li className="hover:text-yellow-300 cursor-pointer">Register Donor</li>
              <li className="hover:text-yellow-300 cursor-pointer">Search Donor</li>
              <li className="hover:text-yellow-300 cursor-pointer">Blood Request</li>
              <li className="hover:text-yellow-300 cursor-pointer">Donor List</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">
              Contact
            </h2>

            <p className="mb-2">📧 blooddonation@gmail.com</p>
            <p className="mb-2">📞 +977-9843785483</p>
            <p>📍 Kathmandu, Nepal</p>
          </div>

        </div>

        <hr className="border-red-400 my-8" />

        <div className="text-center text-red-100">
          © 2026 Blood Donation Management System | Developed using React,
          Node.js, Express.js & MySQL
        </div>

      </div>
    </footer>
  );
}

export default Footer;