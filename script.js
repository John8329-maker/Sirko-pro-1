
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");
const popup = document.getElementById("donation-popup");
const questionCountEl = document.getElementById("question-count");

let count = parseInt(localStorage.getItem("questionCount") || "0");
questionCountEl.textContent = `Питань: ${count}/10`;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  if (count >= 10 && !localStorage.getItem("donated")) {
    popup.classList.remove("hidden");
    return;
  }

  addMessage("Ви", text);
  input.value = "";
  addMessage("Sirko", "⏳ Зачекай...");

  try {
    const res = await fetch("/.netlify/functions/ask", {
      method: "POST",
      body: JSON.stringify({ question: text }),
    });
    const data = await res.json();
    chatBox.lastChild.textContent = "Sirko: " + (data.answer || "Вибач, сталася помилка.");
  } catch (e) {
    chatBox.lastChild.textContent = "Sirko: Вибач, щось пішло не так.";
  }

  count += 1;
  localStorage.setItem("questionCount", count);
  questionCountEl.textContent = `Питань: ${count}/10`;
});

function addMessage(role, text) {
  const div = document.createElement("div");
  div.textContent = role + ": " + text;
  chatBox.appendChild(div);
}
