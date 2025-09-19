const API_URL = "http://localhost:5000/api";

export async function getMessages() {
  const res = await fetch(`${API_URL}/messages`);
  return res.json();
}

export async function sendMessage(sender, content) {
  const res = await fetch(`${API_URL}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sender, content }),
  });
  return res.json();
}
