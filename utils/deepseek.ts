import { cleanedType } from "./reddit";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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
      model: "gemini-2.5-flash", // Good for large context, speed, and structured output
      contents: prompt, // Your combined data + instructions
      config: {
        // Set the model's 'personality' or core instructions
        systemInstruction:
          "You are an AI that points out painpoints and problems and returns JSON ONLY.",

        // **Guaranteed JSON Output**
        responseMimeType: "application/json",
        responseJsonSchema: structuredProblems,

        // Control creativity and length
        temperature: 0.7,
        maxOutputTokens: 2048, // Adjusted up for 10 detailed ideas
      },
    });

    // The model ensures response.text is valid JSON based on the schema
    console.log("Problems");
    console.log(response);
    return JSON.parse(response.text ?? "something went wrong!");
  } catch (error) {
    // A common error for large input is 'ResourceExhausted' (Context is too long)
    console.error("API Call failed:", error);
    //
    console.error(
      "The error may be caused by the large size of the JSON string exceeding the token limit for the model."
    );
    throw error;
  }
  //   return response;
};

// Simple chat
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
      model: "gemini-2.5-flash", // Good for large context, speed, and structured output
      contents: ideaGenPrompt, // Your combined data + instructions
      config: {
        // Set the model's 'personality' or core instructions
        systemInstruction:
          "You are an AI that generates detailed tech product ideas and returns JSON ONLY.",

        // **Guaranteed JSON Output**
        responseMimeType: "application/json",
        responseJsonSchema: structuredJson,

        // Control creativity and length
        temperature: 0.7,
        maxOutputTokens: 8048, // Adjusted up for 10 detailed ideas
      },
    });
    // The model ensures response.text is valid JSON based on the schema
    console.log(response.text);
    return JSON.parse(
      response?.text?.replace(/[\u0000-\u001F\u007F]/g, "") ??
        "something went wrong!"
    );
  } catch (error) {
    // A common error for large input is 'ResourceExhausted' (Context is too long)
    console.error("API Call failed:", error);
    //
    console.error(
      "The error may be caused by the large size of the JSON string exceeding the token limit for the model."
    );
    throw error;
  }
};
