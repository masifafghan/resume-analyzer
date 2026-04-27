import express from "express";
import multer from "multer";
import fs from "fs";
import pdfParse from "pdf-parse";

const router = express.Router();

// File storage
const upload = multer({ dest: "uploads/" });

router.post("/analyze", upload.single("resume"), async (req, res) => {
  try {
    const filePath = req.file.path;

    // Read PDF
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);

    const text = pdfData.text;

    // 🔥 TEMP: Dummy analysis (replace with AI later)
    const response = {
      score: 7,
      skills: ["JavaScript", "React", "CSS"],
      missing: ["Redux", "Testing"],
      suggestions: [
        "Add measurable achievements",
        "Improve summary section"
      ],
      jobs: ["Frontend Developer", "Junior Developer"]
    };

    res.json(response);

  } catch (error) {
    res.status(500).json({ error: "Error analyzing resume" });
  }
});

export default router;