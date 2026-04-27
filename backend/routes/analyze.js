import express from "express";
import multer from "multer";
import fs from "fs";
import pdfParse from "pdf-parse";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const upload = multer({ dest: "uploads/" });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/analyze", upload.single("resume"), async (req, res) => {
  try {
    const filePath = req.file.path;

    // Read PDF
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    const resumeText = pdfData.text;

    // 🔥 Send to OpenAI
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a professional resume analyzer."
        },
        {
          role: "user",
          content: `
Analyze this resume and return JSON only:

{
  "score": number (0-10),
  "skills": [],
  "missing": [],
  "suggestions": [],
  "jobs": []
}

Resume:
${resumeText}
          `
        }
      ],
      temperature: 0.7
    });

    // Extract AI text
    const rawText = aiResponse.choices[0].message.content;

    // Convert string → JSON
    const parsed = JSON.parse(rawText);

    res.json(parsed);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI analysis failed" });
  }
});

export default router;