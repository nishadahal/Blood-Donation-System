import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-red-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">

        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">
          ❤️ Blood Donation System
        </h1>

        <ul className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm md:text-lg font-medium">

          <li>
            <Link
              to="/"
              className="hover:text-yellow-300 transition duration-300"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/register"
              className="hover:text-yellow-300 transition duration-300"
            >
              Register Donor
            </Link>
          </li>

          <li>
            <Link
              to="/search"
              className="hover:text-yellow-300 transition duration-300"
            >
              Search Donor
            </Link>
          </li>

          <li>
            <Link
              to="/request"
              className="hover:text-yellow-300 transition duration-300"
            >
              Blood Request
            </Link>
          </li>

          <li>
            <Link
              to="/donors"
              className="hover:text-yellow-300 transition duration-300"
            >
              Donor List
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className="hover:text-yellow-300 transition duration-300"
            >
              Contact
            </Link>
          </li>

        </ul>

      </div>
    </nav>
  );
}

export default Navbar;