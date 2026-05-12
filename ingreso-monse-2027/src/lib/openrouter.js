import OpenAI from "openai";

let openrouter;

export function createOpenRouterClient() {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error("Falta OPENROUTER_API_KEY en el entorno.");
  }

  if (!openrouter) {
    openrouter = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
      defaultHeaders: {
        "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "http://localhost:3000",
        "X-Title": process.env.OPENROUTER_SITE_NAME || "Abril Quest",
      },
    });
  }

  return openrouter;
}

export async function callOpenRouter(modelName, systemPrompt, userMessage, maxTokens = 1024) {
  const client = createOpenRouterClient();

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
    throw new Error("OpenRouter no devolvio contenido de texto.");
  }

  return text.trim();
}
