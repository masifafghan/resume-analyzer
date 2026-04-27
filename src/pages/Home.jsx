import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center mt-20 px-4">
      <h1 className="text-4xl font-bold mb-4">
        AI Resume Analyzer
      </h1>
      <p className="text-gray-600 mb-6">
        Improve your resume instantly with AI feedback
      </p>

      <Link to="/upload">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">
          Analyze Resume
        </button>
      </Link>
    </div>
  );
}