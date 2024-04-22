// Fonction pour envoyer la destination à l'API de ChatGPT
export async function fetchChatGPTResponse(
  destination: string
): Promise<string> {
  const response = await fetch("/api/chatgpt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ destination }),
  })

  if (!response.ok) {
    console.error("Failed to fetch ChatGPT response:", response.statusText)
    throw new Error("Failed to fetch ChatGPT response")
  }

  return response.json()
}
