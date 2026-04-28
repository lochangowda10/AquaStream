import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyC9RmTaSSg_5U38W4fsxrI27N51ppj3uKU"; // From the user's .env
const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();
    console.log("Available models:");
    if (data.models) {
      data.models.forEach(model => {
        console.log(`- ${model.name} (Supported methods: ${model.supportedGenerationMethods.join(', ')})`);
      });
    } else {
        console.log(data);
    }
  } catch (e) {
    console.error("Error fetching models:", e);
  }
}

listModels();
