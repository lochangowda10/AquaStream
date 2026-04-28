import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyC9RmTaSSg_5U38W4fsxrI27N51ppj3uKU";
const genAI = new GoogleGenerativeAI(apiKey);

async function testModel(modelName) {
  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent("Say 'hello world'");
    const text = result.response.text();
    console.log(`Success with ${modelName}: ${text}`);
    return true;
  } catch (e) {
    console.error(`Error with ${modelName}:`, e.message);
    return false;
  }
}

async function runTests() {
  await testModel("gemini-2.5-flash");
  await testModel("gemini-flash-latest");
}

runTests();
