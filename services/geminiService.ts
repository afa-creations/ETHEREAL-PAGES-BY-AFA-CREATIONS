
import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function generatePoemBackground(title: string, content: string): Promise<string | null> {
  const ai = getAI();
  
  // Construct a prompt focused on the requirements: soft, aesthetic, pastel, watercolor
  const prompt = `Create a soft, aesthetic background image in pastel colors inspired by this poem titled "${title}". 
  The poem's content is: "${content.substring(0, 300)}".
  Style: watercolor, dreamy, minimalist, artistic.
  The image should be gentle, calming, and suitable for overlaying text. 
  Avoid harsh contrasts, busy details, text, or realistic faces. 
  Focus on abstract shapes, soft gradients, and nature-inspired motifs if relevant. 
  The final output should be an image part.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "9:16", // Good for vertical presentation
        }
      }
    });

    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating background:", error);
    return null;
  }
}

export async function editPoemImage(base64Image: string, editPrompt: string): Promise<string | null> {
  const ai = getAI();
  const base64Data = base64Image.split(',')[1] || base64Image;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: 'image/png'
            }
          },
          { text: `Modify this background based on the following instruction while keeping it soft, pastel, and aesthetic: ${editPrompt}` }
        ]
      }
    });

    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Error editing image:", error);
    return null;
  }
}
