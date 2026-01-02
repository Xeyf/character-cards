import OpenAI from "openai";
import { skyrimSchema, skyrimInstructions } from "@/templates/skyrim";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userInput } = body as { userInput: string };

    // IMPORTANT: keep key server-side only.
    const resp = await client.responses.create({
      // Usa el modelo que tengas disponible en tu cuenta; si falla, prueba con otro de tu roster.
      model: "gpt-4.1-mini",
      instructions: skyrimInstructions,
      input: [
        {
          role: "user",
          content: `Create one Skyrim character sheet from this user request:\n${userInput}`
        }
      ],
      text: {
        format: {
          type: "json_schema",
          name: "skyrim_character_sheet_v1",
          strict: true,
          schema: skyrimSchema
        }
      }
    });

    const sheet = JSON.parse(resp.output_text);
    return Response.json({ sheet });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message ?? "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
