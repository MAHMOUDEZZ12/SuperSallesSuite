
'use server';

/**
 * @fileOverview AI-powered ad generation from project brochures or a simple project name.
 *
 * This flow generates compelling ad copy and a visually appealing ad design based on a project brochure (if provided) or just a project name, along with branding guidelines.
 *
 * @module AI/Flows/GenerateAdFromBrochure
 *
 * @export {function} generateAdFromBrochure - The main function to generate an ad.
 * @export {type} GenerateAdFromBrochureInput - The Zod schema for the input of the flow.
 * @export {type} GenerateAdFromBrochureOutput - The Zod schema for the output of the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {
  GenerateAdFromBrochureInputSchema,
  GenerateAdFromBrochureOutputSchema,
  type GenerateAdFromBrochureInput,
  type GenerateAdFromBrochureOutput,
} from '@/types';


/**
 * An AI flow that generates ad copy and designs from a project brochure or name.
 * This function serves as a wrapper for the underlying Genkit flow.
 *
 * @param {GenerateAdFromBrochureInput} input - The input data for generating the ad.
 * @returns {Promise<GenerateAdFromBrochureOutput>} A promise that resolves with the generated ad copy and design.
 */
export async function generateAdFromBrochure(
  input: GenerateAdFromBrochureInput
): Promise<GenerateAdFromBrochureOutput> {
  return generateAdFromBrochureFlow(input);
}

const generateAdFromBrochurePrompt = ai.definePrompt({
  name: 'generateAdFromBrochurePrompt',
  input: {schema: GenerateAdFromBrochureInputSchema},
  output: {schema: GenerateAdFromBrochureOutputSchema},
  prompt: `You are an AI-powered advertising expert for real estate. Your task is to generate compelling ad copy and a visually appealing ad design (as a one-page brochure PDF). The user's brand name, colors, and contact info should be inferred from the brochure itself if provided.

Here are the project details:

Focus Area: {{{focusArea}}}
{{#if projectName}}
Project Name: {{{projectName}}}
{{/if}}
{{#if additionalInformation}}
Additional Information: {{{additionalInformation}}}
{{/if}}
{{#if brochureDataUri}}
Brochure: {{media url=brochureDataUri}}
{{else}}
Instruction: If no brochure is provided, create a high-quality, professional one-page brochure for the project name given. Use placeholder text and images that match the focus area.
{{/if}}

Here are the branding guidelines:

Tone of Voice: {{{toneOfVoice}}}

Generate ad copy that is engaging, persuasive, and tailored to the specified focus area. Create an ad design as a one-page PDF brochure that is visually consistent with a modern, professional brand identity. Also, generate a landing page design to show off the listing.

Ensure that the ad copy and design align with the project details and branding guidelines.`,
});

const generateAdFromBrochureFlow = ai.defineFlow(
  {
    name: 'generateAdFromBrochureFlow',
    inputSchema: GenerateAdFromBrochureInputSchema,
    outputSchema: GenerateAdFromBrochureOutputSchema,
  },
  async input => {
    const {output} = await generateAdFromBrochurePrompt(input);
    return output!;
  }
);


