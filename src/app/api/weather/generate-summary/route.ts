import { NextApiRequest, NextApiResponse } from "next";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { prompt } = req.body;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    console.log(text);
    res.status(200).json({ text });
  } catch (error) {
    console.error("Error generating story:", error);
    res.status(500).json({ error: "Error generating story" });
  }
};

export const GET = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(405).json({ error: "Method not allowed" });
};
