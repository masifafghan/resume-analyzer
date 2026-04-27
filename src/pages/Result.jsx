import { useLocation } from "react-router-dom";

export default function Result() {
  const { state } = useLocation();

  // If no data (user refreshed page)
  if (!state) {
    return (
      <div className="text-center mt-20 text-red-500">
        No data found. Please upload a resume first.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* Score Section */}
      <div className="bg-blue-100 p-6 rounded-2xl text-center mb-6">
        <h2 className="text-3xl font-bold">
          {state.score}/10
        </h2>
        <p className="text-gray-700">
          {state.score > 7
            ? "Strong resume"
            : state.score > 4
            ? "Good, but can improve"
            : "Needs improvement"}
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Skills */}
        <div className="bg-white shadow-md rounded-2xl p-5">
          <h3 className="font-semibold mb-3">Skills Detected</h3>
          <div className="flex flex-wrap gap-2">
            {state.skills?.map((skill, i) => (
              <span
                key={i}
                className="bg-blue-200 px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Missing Keywords */}
        <div className="bg-white shadow-md rounded-2xl p-5">
          <h3 className="font-semibold mb-3">Missing Keywords</h3>
          <ul className="list-disc ml-5 text-gray-600">
            {state.missing?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Suggestions */}
        <div className="bg-white shadow-md rounded-2xl p-5">
          <h3 className="font-semibold mb-3">Suggestions</h3>
          <ul className="list-disc ml-5 text-gray-600">
            {state.suggestions?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Job Match */}
        <div className="bg-white shadow-md rounded-2xl p-5">
          <h3 className="font-semibold mb-3">Job Match</h3>
          <div className="text-gray-600">
            {state.jobs?.map((job, i) => (
              <p key={i}>{job}</p>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}