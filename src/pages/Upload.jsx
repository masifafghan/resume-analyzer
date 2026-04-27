import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadBox from "../components/UploadBox";

export default function Upload() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    const res = await fetch("http://localhost:5000/api/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    // send data to result page
    navigate("/result", { state: data });
  };

  return (
    <div className="max-w-3xl mx-auto mt-20 text-center">
      <h2 className="text-3xl font-bold mb-6">Upload Resume</h2>

      <UploadBox onFileSelect={setFile} />

      <button
        onClick={handleSubmit}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-xl"
      >
        Analyze Resume
      </button>
    </div>
  );
}