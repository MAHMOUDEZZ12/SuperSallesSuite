
'use server';

/**
 * @fileOverview An AI flow to translate a brochure into a specified language.
 *
 * This flow takes a source brochure document and a target language, then returns
 * a new, translated version of the brochure, aiming to preserve the original
 * layout and design.
 *
 * @module AI/Flows/TranslateBrochure
 *
 * @export {function} translateBrochure - The main function to translate a brochure.
 * @export {type} TranslateBrochureInput - The Zod schema for the input.
 * @export {type} TranslateBrochureOutput - The Zod schema for the output.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {
  TranslateBrochureInputSchema,
  TranslateBrochureOutputSchema,
  type TranslateBrochureInput,
  type TranslateBrochureOutput,
} from '@/types';


/**
 * An AI flow that translates a brochure into a specified language.
 *
 * @param {TranslateBrochureInput} input - The input data for the translation.
 * @returns {Promise<TranslateBrochureOutput>} A promise that resolves with the translated brochure.
 */
export async function translateBrochure(
  input: TranslateBrochureInput
): Promise<TranslateBrochureOutput> {
  return translateBrochureFlow(input);
}


const translateBrochurePrompt = ai.definePrompt({
  name: 'translateBrochurePrompt',
  input: {schema: TranslateBrochureInputSchema},
  output: {schema: TranslateBrochureOutputSchema},
  prompt: `You are an expert document translator and designer. Your task is to translate the provided brochure into the specified target language while preserving the original layout, formatting, and design as closely as possible.

  **Target Language:** {{{targetLanguage}}}
  
  **Source Brochure:**
  {{media url=brochureDataUri}}

  Instructions:
  1.  Translate all text content accurately into the target language.
  2.  Maintain the original font styles, sizes, and colors.
  3.  Keep all images and logos in their original positions.
  4.  Ensure the layout of the translated text flows correctly within the existing design.
  
  Return the fully translated document as a new PDF data URI.
  `,
});


const translateBrochureFlow = ai.defineFlow(
  {
    name: 'translateBrochureFlow',
    inputSchema: TranslateBrochureInputSchema,
    outputSchema: TranslateBrochureOutputSchema,
  },
  async input => {
    const {output} = await translateBrochurePrompt(input);
    if (!output) {
      throw new Error('The AI failed to translate the brochure.');
    }
    return output;
  }
);
