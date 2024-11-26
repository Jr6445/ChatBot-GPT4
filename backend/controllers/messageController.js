const { callGPT } = require("../services/openaiService");
/* 
This is the system prompt that is used to generate the response
If you want to customize this bot, you can change this prompt to what is needed
*/
const system = 'You are an AI travel assistant. Provide accurate, balanced, and respectful information about destinations, travel itineraries, cultural tips, accommodations, transportation, and travel strategies. Always maintain a professional and friendly tone, avoid bias, and base your responses on verified information and reliable data. Be mindful of diverse cultures and customs, ensuring your answers are inclusive and respectful to travelers from all backgrounds. Make your recommendations clear, practical, and aligned with the users preferences and travel needs.';

// This is the initial chat log message for context to the bot
let chatLog =
  "Chat Log: Chat Bot: Hola, ¿A dónde desea ir?\n";

async function handleMessage(req, res) {
  const content = req.body.message;

  if (content.trim() === "") {
    return res.status(400).json({ error: "Empty message" });
  }

  const response = await callGPT(content, system, chatLog);
  // The chat log is updated with the user message and the response from the bot for context
  chatLog += "User: " + content + "\n";
  chatLog += "Chat Bot: " + response + "\n";

  return res.json({ message: response });
}

module.exports = { handleMessage };
