
export async function handler(event) {
  const { question } = JSON.parse(event.body || "{}");
  if (!question) {
    return {
      statusCode: 400,
      body: JSON.stringify({ answer: "Питання не вказано." })
    };
  }

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: question }]
      })
    });

    const data = await res.json();
    const answer = data.choices?.[0]?.message?.content || "Вибач, я не зміг знайти відповідь.";
    return {
      statusCode: 200,
      body: JSON.stringify({ answer })
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ answer: "Помилка під час звернення до AI." })
    };
  }
}
