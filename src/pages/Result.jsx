export default function Result() {
  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* Score Section */}
      <div className="bg-blue-100 p-6 rounded-2xl text-center mb-6">
        <h2 className="text-3xl font-bold">8/10</h2>
        <p className="text-gray-700">Good, but can improve</p>
      </div>

      {/* Grid Layout */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Skills */}
        <div className="bg-white shadow-md rounded-2xl p-5">
          <h3 className="font-semibold mb-3">Skills Detected</h3>
          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-200 px-3 py-1 rounded-full">React</span>
            <span className="bg-blue-200 px-3 py-1 rounded-full">JavaScript</span>
            <span className="bg-blue-200 px-3 py-1 rounded-full">CSS</span>
          </div>
        </div>

        {/* Missing */}
        <div className="bg-white shadow-md rounded-2xl p-5">
          <h3 className="font-semibold mb-3">Missing Keywords</h3>
          <ul className="list-disc ml-5 text-gray-600">
            <li>Redux</li>
            <li>Testing</li>
          </ul>
        </div>

        {/* Suggestions */}
        <div className="bg-white shadow-md rounded-2xl p-5">
          <h3 className="font-semibold mb-3">Suggestions</h3>
          <ul className="list-disc ml-5 text-gray-600">
            <li>Add measurable achievements</li>
            <li>Improve summary section</li>
          </ul>
        </div>

        {/* Job Match */}
        <div className="bg-white shadow-md rounded-2xl p-5">
          <h3 className="font-semibold mb-3">Job Match</h3>
          <p className="text-gray-600">
            Frontend Developer, Junior Web Developer
          </p>
        </div>

      </div>
    </div>
  );
}