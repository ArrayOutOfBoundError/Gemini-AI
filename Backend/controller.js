import { GoogleGenerativeAI } from "@google/generative-ai";
import { History } from "./model.js";
import * as fs from "node:fs";

const genAI = async (req, res) => {
  try {
    console.log("Received request:", req.body);
    console.log("Received file:", req.file);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    function fileToGenerativePart(path, mimeType) {
      return {
        inlineData: {
          data: Buffer.from(fs.readFileSync(path)).toString("base64"),
          mimeType,
        },
      };
    }

    const prompt = req.body.request;
    const file = req.file;

    if (!prompt) {
      return res.status(400).json({ error: "Enter your query first." });
    }

    const history = await History.create({ request: prompt });

    const imagePart = file
      ? fileToGenerativePart(file.path, file.mimetype)
      : undefined;

    const result = await model.generateContent([prompt, imagePart]);

    let responseText = result.response.text();
    if (!responseText) {
      responseText = "Sorry, no content returned.";
    } else {
      responseText = responseText.replace(/\*/g, "");
    }

    console.log("Generated content:", responseText);
    history.response = responseText;
    await history.save();

    res.status(200).json({ content: responseText });
  } catch (error) {
    console.error("Error in genAI:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { genAI };
