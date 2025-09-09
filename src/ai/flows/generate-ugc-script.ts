
'use server';

/**
 * @fileOverview An AI flow to generate a UGC-style social media video script.
 *
 * This flow uses a few-shot prompting technique to analyze a sample script,
 * understand its structure, and then generate a new script for a different
 * product while maintaining the same successful framework.
 *
 * @module AI/Flows/GenerateUgcScript
 */

import { ai } from '@/ai/genkit';
import {
  GenerateUgcScriptInputSchema,
  GenerateUgcScriptOutputSchema,
  type GenerateUgcScriptInput,
  type GenerateUgcScriptOutput,
} from '@/types';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'zod';

const systemInstruction = `You are a professional scriptwriter with expertise in writing authentic user-generated content (UGC) style social media video advertisements. Your job is to help the user with creativity-related tasks. These may be long-form writing tasks, content creation, conversation-related tasks, role-playing, or others. While crafting your answers, emphasize a range of approaches, distinct stylistic choices, and imaginative solutions, all grounded in factual correctness. Feel free to elaborate with your responses but make sure you stay on topic.`;

const analysisPrompt = `To help me write a script, first analyze the 'Original Script' below to fully understand the framework and stages of the ad. Format the analysis as a JSON object with these properties below:

{
  "Concept-Name": "(string) a 1-2 word identifier of the messaging or theme of the video— excluding the product name.",
  "Script": "(array) an array of nested objects with the keys: 'Scene-Name' and 'Original-Script'"
}

Every single line in the 'Original Script' should be its own object. Do not include any explanations, just respond with the JSON code.

Original Script: My teeth have never been so white. Cymbal's teeth whitening kit is a game changer. I saw amazing results in just two days. It's easy to use, safe on sensitive teeth, and there's zero cleanup. It takes only nine minutes per day. Now people keep asking me how my teeth are so white.`;

const exampleAnalysis = `{
  "Concept-Name": "Teeth Whitening",
  "Script": [
    { "Scene-Name": "Testimonial", "Original-Script": "My teeth have never been so white." },
    { "Scene-Name": "Product Introduction", "Original-Script": "Cymbal's teeth whitening kit is a game changer." },
    { "Scene-Name": "Results", "Original-Script": "I saw amazing results in just two days." },
    { "Scene-Name": "Ease of Use", "Original-Script": "It's easy to use, safe on sensitive teeth, and there's zero cleanup." },
    { "Scene-Name": "Time Commitment", "Original-Script": "It takes only nine minutes per day." },
    { "Scene-Name": "Social Proof", "Original-Script": "Now people keep asking me how my teeth are so white." }
  ]
}`;

const generationPromptTemplate = (productDescription: string) => `Now write a UGC Script about the 'New Product' below using the exact same structure as the 'Original Script'. Be sure to use all of the same scenes in the same order as the original and match the overall length of the script. Use a similar tone, style, and language to the Original, but make sure all product details accurately reflect the 'New Product'. Maintain the structure of the JSON object and simply add the key 'New-Script' to the existing nested objects in the 'Script' array. Each new line should be added to an existing nested object. Do not include any explanations, just respond with the JSON code.

'New Product': ${productDescription}`;


const generateUgcScriptFlow = ai.defineFlow(
  {
    name: 'generateUgcScriptFlow',
    inputSchema: GenerateUgcScriptInputSchema,
    outputSchema: GenerateUgcScriptOutputSchema,
  },
  async ({ productDescription }) => {
    
    // In a real-world scenario, you might have a dynamic way to get the analysis,
    // but for this example, we use a few-shot approach where we provide the
    // user's analysis request and the model's expected response as examples.
    
    const { output } = await ai.generate({
      model: googleAI.model('gemini-1.5-flash-latest'),
      system: systemInstruction,
      prompt: [
        { role: 'user', content: [{ text: analysisPrompt }] },
        { role: 'model', content: [{ text: exampleAnalysis }] },
        { role: 'user', content: [{ text: generationPromptTemplate(productDescription) }] },
      ],
      config: {
        temperature: 1,
        topP: 0.95,
        maxOutputTokens: 8192,
        // Safety settings from the user's provided context
        safetySettings: [ 
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
        ],
      },
      output: {
          format: 'json',
          schema: GenerateUgcScriptOutputSchema
      }
    });

    if (!output) {
      throw new Error('The AI failed to generate a UGC script.');
    }
    
    return output;
  }
);


/**
 * An AI flow that generates a UGC-style script.
 *
 * @param {GenerateUgcScriptInput} input - The input data for the script generation.
 * @returns {Promise<GenerateUgcScriptOutput>} A promise that resolves with the generated script.
 */
export async function generateUgcScript(
  input: GenerateUgcScriptInput
): Promise<GenerateUgcScriptOutput> {
  return generateUgcScriptFlow(input);
}
