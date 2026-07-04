import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="bg-gradient-to-r from-red-100 to-red-50 py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-10">

        <div className="md:w-1/2 text-center md:text-left">

          <h1 className="text-4xl md:text-6xl font-extrabold text-red-700 leading-tight">
            Donate Blood <br />
            <span className="text-black">& Save Lives ❤️</span>
          </h1>

          <p className="mt-6 text-gray-700 text-lg leading-8">
            Welcome to the Blood Donation Management System.
            This system helps patients quickly find the nearest blood donor
            using the <strong>Euclidean Distance Algorithm</strong>.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">

            <Link
              to="/register"
              className="bg-red-700 hover:bg-red-800 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg text-center"
            >
              Register Donor
            </Link>

            <Link
              to="/search"
              className="border-2 border-red-700 text-red-700 hover:bg-red-700 hover:text-white px-8 py-3 rounded-lg text-lg font-semibold text-center"
            >
              Search Donor
            </Link>

          </div>

        </div>

        <div className="md:w-1/2 flex justify-center">

          <div className="bg-white rounded-full w-64 h-64 md:w-96 md:h-96 flex items-center justify-center shadow-2xl border-8 border-red-200">

            <span className="text-[120px] md:text-[180px]">
              🩸
            </span>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Home;