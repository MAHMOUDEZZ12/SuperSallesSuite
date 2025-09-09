
'use server';

/**
 * @fileOverview An AI flow to configure the user's workspace from uploaded documents.
 *
 * This flow analyzes user-provided documents (e.g., company profile, brand guide)
 * and extracts structured data to set up their brand identity and create project lists,
 * acting as a command from the AI Assistant.
 *
 * @module AI/Flows/AIBrandCreator
 *
 * @export {function} aiBrandCreator - The main function to configure the workspace.
 * @export {type} AIBrandCreatorInput - The Zod schema for the input of the aiBrandCreator flow.
 * @export {type} AIBrandCreatorOutput - The Zod schema for the output of the aiBrandCreator flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {
  AIBrandCreatorInputSchema,
  AIBrandCreatorOutputSchema,
  type AIBrandCreatorInput,
  type AIBrandCreatorOutput,
} from '@/types';


/**
 * An AI flow that configures the user's workspace based on provided documents and a command.
 * This function serves as a wrapper for the underlying Genkit flow.
 *
 * @param {AIBrandCreatorInput} input - The input data for the setup process.
 * @returns {Promise<AIBrandCreatorOutput>} A promise that resolves with the extracted setup data.
 */
export async function aiBrandCreator(
  input: AIBrandCreatorInput
): Promise<AIBrandCreatorOutput> {
  return aiBrandCreatorFlow(input);
}

const aiBrandCreatorPrompt = ai.definePrompt({
  name: 'aiBrandCreatorPrompt',
  input: {schema: AIBrandCreatorInputSchema},
  output: {schema: AIBrandCreatorOutputSchema},
  prompt: `You are an expert system administrator for the Super Seller Suite. Your task is to configure the user's workspace based on their command and the documents they provide.

  User Command: "{{{command}}}"

  Provided Documents:
  {{#each documents}}
  - Document {{add @index 1}}: {{media url=this}}
  {{/each}}

  Analyze the documents and the command carefully. Extract the following information:
  1.  **Brand Information**: 
      - Look for company name.
      - Extract a short (1-2 sentence) description of the company.
      - Find contact details (a primary person's name, phone, email).
      - Identify brand colors (provide as hex codes if possible).
  2.  **Projects**: Identify a list of current or past projects, including their name, location, and status if available.

  Once you have extracted the information, provide a brief, human-readable summary of what you have done. For example: "I've updated your brand with the details from 'CompanyProfile.pdf' and created 5 new projects from 'ProjectList.csv'."
  `,
});

const aiBrandCreatorFlow = ai.defineFlow(
  {
    name: 'aiBrandCreatorFlow',
    inputSchema: AIBrandCreatorInputSchema,
    outputSchema: AIBrandCreatorOutputSchema,
  },
  async input => {
    const {output} = await aiBrandCreatorPrompt(input);
    if (!output) {
      throw new Error('The AI failed to process the setup documents.');
    }
    // In a real application, you would now use the 'output' data to update
    // the user's settings in your database. For this simulation, we just
    // return the extracted data and the summary.
    return output;
  }
);

