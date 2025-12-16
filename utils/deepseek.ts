import { cleanedType } from "./reddit";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const agi = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY_1 });
const asi = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY_2 });

export const getStructuredJson = async (
  problemJson: (cleanedType | null)[]
) => {
  const stringifiedJson = JSON.stringify(problemJson);
  const structuredProblems = {
    type: "object",
    properties: {
      problems: {
        type: "array",
        description: "A list of problems",
        items: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "a descriptive title about the problem",
            },
            description: {
              type: "string",
              description: " a detailed explanation of what the problem is",
            },
          },
          required: ["title", "description"],
        },
      },
    },
    required: ["problems"],
  };

  const prompt = `
  --- DATA START ---
  Here is a large JSON array of posts and their respective comments and their replies if:
  ${stringifiedJson}
  --- DATA END ---

  TASK:
  Using the structured problems provided above, Extract the problems, complaints, unmet needs, and desires expressed here and provide a comprehensive and detailed description about them 

  Each generated problem MUST strictly adhere to the required JSON schema for the output.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
      config: {
        systemInstruction:
          "You are an AI that points out painpoints and problems and returns JSON ONLY.",

        responseMimeType: "application/json",
        responseJsonSchema: structuredProblems,

        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    });

    console.log("Problems");
    console.log(JSON.parse(response.text ?? "S"));
    return JSON.parse(response.text ?? "something went wrong!");
  } catch (error) {
    console.error("API Call failed:", error);
    console.error(
      "The error may be caused by the large size of the JSON string exceeding the token limit for the model."
    );
    throw error;
  }
};

export const listOfIdeas = async (
  problemsJSON: {
    problems: { title: string; description: string }[];
  },
  message: string
) => {
  const stringifiedJson = JSON.stringify(problemsJSON);
  const structuredJson = {
    type: "object",
    properties: {
      ideas: {
        type: "array",
        description: "a list of tech product ideas",
        items: {
          type: "object",
          properties: {
            name: { type: "string", description: "the name of the product" },
            description: {
              type: "string",
              description:
                "a detailed description of what the product do, and what problem it  solves and how it does that",
            },
            targetAudience: {
              type: "string",
              description: "the target audience that could use the product",
            },
            feasibility: {
              type: "string",
              description:
                "feasibility of the product rated from 1-10, and the reason for the rating",
            },
          },
        },
      },
    },
  };
  const ideaGenPrompt = `
  --- DATA START ---
  Here is a large JSON array of proplems their title and the description:
  ${stringifiedJson}
  --- DATA END ---

  TASK:
  Using the structured problems provided above, generate tech ideas, apps, tools, or AI products that solve or improve these issues.
  --START OF SPECIFIC INSTRUCTION--
  ${message}
  --END OF SPECIFIC INSTRUCTION--
  Each generated problem MUST strictly adhere to the required JSON schema for the output.`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: ideaGenPrompt,
      config: {
        systemInstruction:
          "You are an AI that generates detailed tech product ideas and returns JSON ONLY.",

        responseMimeType: "application/json",
        responseJsonSchema: structuredJson,

        temperature: 0.7,
        maxOutputTokens: 8048,
      },
    });
    console.log(response.text);
    return JSON.parse(
      response?.text?.replace(/[\u0000-\u001F\u007F]/g, "") ??
        "something went wrong!"
    );
  } catch (error) {
    console.error("API Call failed:", error);
    console.error(
      "The error may be caused by the large size of the JSON string exceeding the token limit for the model."
    );
    throw error;
  }
};
