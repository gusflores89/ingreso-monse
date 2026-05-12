import Groq from "groq-sdk";

let groq;

export function createGroqClient() {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("Falta GROQ_API_KEY en el entorno.");
  }

  if (!groq) {
    groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }

  return groq;
}

export async function callGroq(modelName, systemPrompt, userMessage, maxTokens = 1024) {
  const client = createGroqClient();

  const response = await client.chat.completions.create({
    model: modelName,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
    max_tokens: maxTokens,
    temperature: 0.7,
  });

  const text = response.choices?.[0]?.message?.content;
  if (!text) {
    throw new Error("Groq no devolvio contenido de texto.");
  }

  return text.trim();
}
