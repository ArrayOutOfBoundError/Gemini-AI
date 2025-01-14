import { GoogleGenerativeAI } from "@google/generative-ai";
import { History } from "./model.js";

const genAI = async (req, res) => {
  try {
    console.log("Received request:", req.body);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = req.body.request;
    const history = await History.create({
      request: prompt,
    });
    if (!prompt || typeof prompt !== "string") {
      return res
        .status(400)
        .json({ error: "'request' must be a non-empty string." });
    }

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    console.log("Generated content:", responseText);

    res.status(200).json({ content: responseText });
    console.log("Response sent successfully");

    history.response = responseText;
    await history.save();
  } catch (error) {
    console.error("Error in genAI:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { genAI };
