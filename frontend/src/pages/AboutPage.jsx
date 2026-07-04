function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto bg-white p-10 rounded-lg shadow-lg mt-10">
      <h1 className="text-4xl font-bold text-red-700 mb-6">
        About Blood Donation System
      </h1>

      <p className="text-lg text-gray-700 leading-8">
        Blood Donation Management System is a web application developed using
        React, Node.js, Express.js and MySQL. It helps users register as blood
        donors, search for nearby donors using the Euclidean Distance
        Algorithm, and submit blood requests.
      </p>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-red-700">
          Technologies Used
        </h2>

        <ul className="list-disc ml-8 mt-4 text-lg">
          <li>React.js</li>
          <li>Node.js</li>
          <li>Express.js</li>
          <li>MySQL</li>
          <li>Tailwind CSS</li>
          <li>Euclidean Distance Algorithm</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutPage;