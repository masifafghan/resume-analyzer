import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleUpload = () => {
    if (!file) return;
    // later: send to backend
    navigate("/result");
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96 text-center">

        <h2 className="text-xl font-semibold mb-4">
          Upload Your Resume
        </h2>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4"
        />

        {file && (
          <p className="text-sm text-gray-600 mb-2">
            {file.name}
          </p>
        )}

        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700"
        >
          Upload & Analyze
        </button>

      </div>
    </div>
  );
}