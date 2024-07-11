const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateStory = async (prompt:string) => {

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
  
    return text;
  } catch (error) {
    console.error("Error generating story:", error);
    return null;
  }
};
