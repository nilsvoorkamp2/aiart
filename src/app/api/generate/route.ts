import { NextRequest, NextResponse } from "next/server";

const HF_API_URL =
  "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2";
const TIMEOUT_MS = 30000;

export async function POST(request: NextRequest) {
  try {
    const { prompt, style, imageBase64 } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const apiToken = process.env.HUGGINGFACE_API_TOKEN;
    if (!apiToken) {
      // Return a placeholder image when no API token is configured
      return NextResponse.json({
        imageUrl: "/samples/abstract-01.svg",
        message: "Using placeholder — configure HUGGINGFACE_API_TOKEN to generate real images",
      });
    }

    const composedPrompt = imageBase64
      ? `${prompt}, ${style} style, based on uploaded photo`
      : `${prompt}, ${style} style, high quality, detailed`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const response = await fetch(HF_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: composedPrompt }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        // Fallback to placeholder
        return NextResponse.json({
          imageUrl: "/samples/abstract-01.svg",
          message: "AI generation failed — showing placeholder",
        });
      }

      const blob = await response.blob();
      const buffer = Buffer.from(await blob.arrayBuffer());
      const base64Image = `data:image/png;base64,${buffer.toString("base64")}`;

      return NextResponse.json({ imageUrl: base64Image });
    } catch {
      clearTimeout(timeoutId);
      // Timeout or network error fallback
      return NextResponse.json({
        imageUrl: "/samples/abstract-01.svg",
        message: "Generation timed out — showing placeholder",
      });
    }
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
