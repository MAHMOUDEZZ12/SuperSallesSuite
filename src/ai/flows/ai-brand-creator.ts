
'use server';

/**
 * @fileOverview An AI flow to configure the user's workspace from uploaded documents.
 *
 * This flow analyzes user-provided documents (e.g., company profile, brand guide)
 * and extracts structured data to set up their brand identity and create project lists,
 * acting as a command from the AI Assistant. It can process both text-based documents
 * and images, using OCR for the latter.
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
import {extractTextFromImage} from '@/services/vision';

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
  prompt: `You are an expert system administrator for selltoday.ai. Your task is to configure the user's workspace based on their command and the text content extracted from the documents they provide. Some content may come from images via OCR.

  User Command: "{{{command}}}"

  Extracted Document Content:
  {{#each documents}}
  - Document {{add @index 1}} Content: {{{this}}}
  ---
  {{/each}}

  Analyze the document content and the command carefully. Extract the following information:
  1.  **Brand Information**: 
      - Look for the company name.
      - Extract a short (1-2 sentence) description of the company, if available.
      - Find contact details (a primary person's name, phone, and email).
      - Identify the primary and one accent brand color. Provide them as hex codes (e.g., #1A2B3C). If no colors are explicitly mentioned, infer them from the context (e.g., a "luxury" brand might use black and gold).
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
    // Process documents: if it's an image, use OCR; otherwise, keep as is (for text content from PDFs etc.)
    const processedDocuments = await Promise.all(
      input.documents.map(async docDataUri => {
        if (docDataUri.startsWith('data:image/')) {
          return await extractTextFromImage(docDataUri);
        }
        // Placeholder for future text extraction from PDFs. For now, assume non-image is text.
        // In a real app, we'd use a library like pdf-parse here.
        // For this flow, the prompt expects the text content, not the media URI itself.
        // We will pass a note for non-image files.
        return `[Content from a non-image file like a PDF or text document. The user's command was: ${input.command}]`;
      })
    );

    const promptInput = {
      ...input,
      documents: processedDocuments, // Pass the extracted text content to the prompt
    };

    const {output} = await aiBrandCreatorPrompt(promptInput);
    if (!output) {
      throw new Error('The AI failed to process the setup documents.');
    }
    // In a real application, you would now use the 'output' data to update
    // the user's settings in your database. For this simulation, we just
    // return the extracted data and the summary.
    return output;
  }
);

    