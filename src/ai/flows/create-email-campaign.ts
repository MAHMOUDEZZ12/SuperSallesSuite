


/**
 * @fileOverview An AI flow to design, write, and schedule an email campaign.
 *
 * This flow takes a campaign goal and a source topic/URL and generates a
 * sequence of emails ready to be sent.
 *
 * @module AI/Flows/CreateEmailCampaign
 *
 * @export {function} createEmailCampaign - The main function to create a campaign.
 * @export {type} CreateEmailCampaignInput - The Zod schema for the input.
 * @export {type} CreateEmailCampaignOutput - The Zod schema for the output.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {
  CreateEmailCampaignInputSchema,
  CreateEmailCampaignOutputSchema,
  type CreateEmailCampaignInput,
  type CreateEmailCampaignOutput,
} from '@/types';


const createEmailCampaignPrompt = ai.definePrompt({
  name: 'createEmailCampaignPrompt',
  input: {schema: CreateEmailCampaignInputSchema},
  output: {schema: CreateEmailCampaignOutputSchema},
  prompt: `You are an expert email marketing strategist for the real estate industry. Your task is to create a complete email campaign based on the user's goal.

  **Campaign Goal:** {{{goal}}}
  **Content Source/Topic:** {{{source}}}
  **Tone of Voice:** {{{tone}}}

  **Instructions:**

  1.  **Determine the Sequence:** Based on the goal, decide if a single email or a multi-part sequence (e.g., a 3-part drip campaign) is more appropriate.
  2.  **Craft Compelling Content:** For each email in the sequence:
      *   Write a high-impact, engaging subject line.
      *   Write the full email body in clean, professional HTML. Use paragraphs, bold text, and bullet points to make it readable.
      *   Ensure the content is tailored to the source topic and the desired tone.
  3.  **Set the Schedule:** Define the send delay for each email in days. The first email should always have a delay of 0.

  Return a complete campaign structure that is ready to be implemented.
  `,
});

const createEmailCampaignFlow = ai.defineFlow(
  {
    name: 'createEmailCampaignFlow',
    inputSchema: CreateEmailCampaignInputSchema,
    outputSchema: CreateEmailCampaignOutputSchema,
  },
  async input => {
    const {output} = await createEmailCampaignPrompt(input);
    if (!output) {
      throw new Error('Failed to generate email campaign.');
    }
    return output;
  }
);

/**
 * An AI flow that creates an email campaign.
 *
 * @param {CreateEmailCampaignInput} input - The input data for the campaign.
 * @returns {Promise<CreateEmailCampaignOutput>} A promise that resolves with the campaign emails.
 */
export async function createEmailCampaign(
  input: CreateEmailCampaignInput
): Promise<CreateEmailCampaignOutput> {
  return createEmailCampaignFlow(input);
}

