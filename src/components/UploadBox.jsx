import { useState } from "react";

export default function UploadBox({ onFileSelect }) {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    setFileName(file.name);
    onFileSelect(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    onFileSelect(file);
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-2xl p-8 text-center transition ${
        dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
    >
      <input type="file" onChange={handleChange} className="hidden" id="fileUpload" />

      <label htmlFor="fileUpload" className="cursor-pointer">
        <p className="text-lg font-medium">
          Drag & Drop your resume here
        </p>
        <p className="text-sm text-gray-500">
          or click to upload (PDF/DOCX)
        </p>
      </label>

      {fileName && (
        <p className="mt-4 text-green-600">{fileName}</p>
      )}
    </div>
  );
}