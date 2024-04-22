import { NextApiRequest } from "next"
import { NextResponse } from "next/server"
import OpenAI from "openai"

export async function POST(req: NextApiRequest) {
  const { destination } = req.body

  const chatGPT = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.ORGANIZATION_ID,
    project: process.env.PROJECT_ID,
  })

  const anwser = await chatGPT.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `Agit comme un expert du voyages, j'aimerais partir à ${destination}, quel sont les activité que tu me recommande ?`,
      },
    ],
    max_tokens: 514,
    temperature: 0.7,
    n: 1,
  })

  console.log(anwser)
  // const chatGPTResponse = await fetch("https://api.openai.com/v1/completions", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  //   },
  //   body: JSON.stringify({
  //     model: "text-davinci-003",
  //     prompt: `Agit comme un expert du voyages, j'aimerais partir à ${destination}, quel sont les activité que tu me recommande ?`,
  //     max_tokens: 100,
  //     temperature: 0.7,
  //     n: 1,
  //   }),
  // })

  // if (!chatGPTResponse.ok) {
  //   console.log(chatGPTResponse)
  //   return NextResponse.json(
  //     {
  //       error: "Failed to fetch ChatGPT response",
  //     },
  //     {
  //       status: 500,
  //     }
  //   )
  // }

  // const responseData = await chatGPTResponse.json()
  NextResponse.json(anwser, {
    status: 200,
  })
}
