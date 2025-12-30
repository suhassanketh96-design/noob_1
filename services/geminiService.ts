
import { GoogleGenAI, Type } from "@google/genai";
import { PC_PARTS } from "../constants";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Fix: Initialize GoogleGenAI strictly using process.env.API_KEY as per guidelines
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async getBuildRecommendation(budget: number, usage: string, preferences: string) {
    const partsList = PC_PARTS.map(p => `${p.name} ($${p.price}) - ${p.category}`).join(', ');
    
    const prompt = `Recommend a PC build for a user with a $${budget} budget.
    Usage focus: ${usage}.
    Specific preferences: ${preferences}.
    
    Available parts in our inventory: ${partsList}.
    
    Respond in JSON format with:
    1. rationale: Why this build is good.
    2. suggestedPartIds: An array of part IDs from the available list that fit this budget.
    3. performanceEstimation: Estimated FPS in 1440p gaming (Ultra settings).`;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              rationale: { type: Type.STRING },
              suggestedPartIds: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              performanceEstimation: { type: Type.NUMBER }
            },
            required: ["rationale", "suggestedPartIds", "performanceEstimation"]
          }
        }
      });

      return JSON.parse(response.text);
    } catch (error) {
      console.error("Gemini Error:", error);
      throw error;
    }
  }
}

export const gemini = new GeminiService();
