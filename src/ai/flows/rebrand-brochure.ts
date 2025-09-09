
'use server';

/**
 * @fileOverview A flow that rebrands a brochure with personal details, company logo, and chosen branding elements.
 *
 * This flow takes an existing brochure and applies a new brand identity to it, including contact details,
 * a company logo (generating one if not provided), and brand-specific tone and colors.
 *
 * @module AI/Flows/RebrandBrochure
 *
 * @export {function} rebrandBrochure - The main function to rebrand a brochure.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { RebrandBrochureInputSchema, RebrandBrochureOutputSchema, RebrandBrochureInput, RebrandBrochureOutput } from '@/types';


/**
 * An AI flow that rebrands a brochure with new branding elements.
 * This function serves as a wrapper for the underlying Genkit flow.
 *
  * @param {RebrandBrochureInput} input - The input data for rebranding the brochure.
 * @returns {Promise<RebrandBrochureOutput>} A promise that resolves with the rebranded brochure and optional generated logo.
 */
export async function rebrandBrochure(
  input: RebrandBrochureInput
): Promise<RebrandBrochureOutput> {
  return rebrandBrochureFlow(input);
}

const rebrandBrochurePrompt = ai.definePrompt({
  name: 'rebrandBrochurePrompt',
  input: {schema: RebrandBrochureInputSchema},
  output: {schema: RebrandBrochureOutputSchema},
  prompt: `You are an expert marketing assistant specializing in rebranding brochures.

You will rebrand the brochure provided with the user's contact details, company logo, and chosen branding elements.

If the user doesn't provide a company logo, you will generate one based on the company name and branding elements. Try to create a simple and memorable logo. Return the logo as a data URI.

Use the following information to rebrand the brochure:

Contact Details: {{{contactDetails}}}
Company Name: {{{companyName}}}
Company Logo: {{#if companyLogoDataUri}}{{media url=companyLogoDataUri}}{{else}}Generate a logo based on the company name and branding elements.{{/if}}
Tone of Voice: {{{toneOfVoice}}}
Colors: {{{colors}}}

Brochure: {{media url=brochureDataUri}}

{{#if deepEditInstructions}}
Deep Edit Instructions: Apply these specific changes carefully:
{{{deepEditInstructions}}}
{{/if}}

Output the rebranded brochure as a data URI.
`,
});

const rebrandBrochureFlow = ai.defineFlow(
  {
    name: 'rebrandBrochureFlow',
    inputSchema: RebrandBrochureInputSchema,
    outputSchema: RebrandBrochureOutputSchema,
  },
  async input => {
    let logoToUse = input.companyLogoDataUri;
    let generatedLogoUri: string | undefined;

    // If no logo is provided and the instructions mention a logo, generate one.
    if (!logoToUse && input.deepEditInstructions?.includes("logo")) {
      const { media } = await ai.generate({
        model: googleAI.model('imagen-4.0-fast-generate-001'),
        prompt: `Create a clean, professional, and minimalist logo for a real estate company named "${input.companyName}". The primary colors should be based on: ${input.colors}. The logo should be on a transparent background.`
      });
      if (media) {
        generatedLogoUri = media.url;
        logoToUse = generatedLogoUri; // Use the newly generated logo for the main rebranding task.
      }
    }
    
    // In a real implementation, you would pass the logoToUse to the model
    // that actually edits the brochure. For now, we simulate this process.
    console.log("Simulating brochure rebranding with instructions:", input.deepEditInstructions);
    console.log("Using logo:", logoToUse ? "Provided or Generated Logo" : "No Logo");

    // The main prompt call is now just a placeholder for the actual brochure modification
    // which would happen here using another model or tool.
    // For this simulation, we return the original brochure URI.
    return {
      rebrandedBrochureDataUri: input.brochureDataUri,
      logoDataUri: generatedLogoUri, // Return the generated logo if one was created
    };
  }
);
