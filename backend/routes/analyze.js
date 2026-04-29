import express from "express";
import multer from "multer";
import fs from "fs";
import pkg from "pdf-parse";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const pdfParse = pkg;

const router = express.Router();
const upload = multer({ dest: "uploads/" });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/analyze", upload.single("resume"), async (req, res) => {
  let filePath;

  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    filePath = req.file.path;

    // 📄 Read PDF
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    const resumeText = pdfData.text || "";

    // 🤖 OpenAI Request
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a professional resume analyzer. Return ONLY valid JSON.",
        },
        {
          role: "user",
          content: `
Analyze this resume and return ONLY JSON (no markdown, no text):

{
  "score": number,
  "skills": [],
  "missing": [],
  "suggestions": [],
  "jobs": []
}

Resume:
${resumeText}
          `,
        },
      ],
      temperature: 0.7,
    });

    let rawText = aiResponse.choices?.[0]?.message?.content || "";

    // 🧹 Clean response (VERY IMPORTANT)
    rawText = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(rawText);
    } catch (err) {
      console.log("❌ Invalid AI response:", rawText);

      return res.status(500).json({
        error: "AI returned invalid JSON",
        raw: rawText,
      });
    }

    return res.json(parsed);

  } catch (error) {
    console.error("Server Error:", error);

    return res.status(500).json({
      error: "AI analysis failed",
    });

  } finally {
    // 🧹 Always delete uploaded file
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
});

export default router;