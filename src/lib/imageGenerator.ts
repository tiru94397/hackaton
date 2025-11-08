// src/lib/imageGenerator.ts
export async function generateFreeImage(prompt: string) {
  try {
    const encodedPrompt = encodeURIComponent(prompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}`;

    // Test the URL to ensure it loads
    const response = await fetch(imageUrl);
    if (!response.ok) {
      console.error("Pollinations error:", response.status);
      return null;
    }

    return { url: imageUrl };
  } catch (err) {
    console.error("❌ Image generation failed:", err);
    return null;
  }
}
