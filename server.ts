import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// ESM / CJS __dirname fallback
const currentDirname = typeof __dirname !== "undefined" ? __dirname : process.cwd();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // API Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "AIRS Autonomous Intelligence Engine" });
  });

  // AI Executive Q&A / Deep Narrative Generator
  app.post("/api/ai-analyze", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(400).json({
          error: "GEMINI_API_KEY is not configured. Please set the secret in AI Studio Settings.",
        });
      }

      const { prompt, datasetSummary } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required." });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const systemInstruction = `You are AIRS (Autonomous Intelligence Reporting System), an elite executive data scientist and C-suite advisor. 
You analyze structured datasets, identify operational risks, PII privacy threats, anomalies, and strategic growth opportunities.
Answer concisely, with data-driven executive tone, using bullet points and clear sections. Include concrete numbers from the dataset provided.`;

      const userContent = `DATASET CONTEXT SUMMARY:
${JSON.stringify(datasetSummary, null, 2)}

EXECUTIVE QUESTION:
${prompt}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: userContent,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      return res.json({
        answer: response.text || "No response generated.",
      });
    } catch (err: any) {
      console.error("Error in /api/ai-analyze:", err);
      return res.status(500).json({
        error: err?.message || "Failed to generate AI executive insights.",
      });
    }
  });

  // Vite middleware vs Static Production bundle
  const distPath = path.join(process.cwd(), "dist");
  const isProduction =
    process.env.NODE_ENV === "production" ||
    process.argv[1]?.includes("server.cjs") ||
    !process.argv[1]?.endsWith("server.ts");

  if (isProduction && fs.existsSync(path.join(distPath, "index.html"))) {
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[AIRS Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("[AIRS Server] Startup failed:", err);
});
