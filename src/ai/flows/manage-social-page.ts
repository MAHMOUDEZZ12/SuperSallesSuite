
'use server';

/**
 * @fileOverview An AI flow to act as a social media page admin.
 *
 * This flow can schedule posts, respond to common questions, and flag
 * high-intent comments for personal review.
 *
 * @module AI/Flows/ManageSocialPage
 *
 * @export {function} manageSocialPage - The main function to manage a social page.
 * @export {type} ManageSocialPageInput - The Zod schema for the input.
 * @export {type} ManageSocialPageOutput - The Zod schema for the output.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {
  ManageSocialPageInputSchema,
  ManageSocialPageOutputSchema,
  type ManageSocialPageInput,
  type ManageSocialPageOutput,
} from '@/types';


const manageSocialPagePrompt = ai.definePrompt({
  name: 'manageSocialPagePrompt',
  input: {schema: ManageSocialPageInputSchema},
  output: {schema: ManageSocialPageOutputSchema},
  prompt: `You are a highly experienced real estate sales professional with 25 years in the industry, now acting as an expert social media manager. Your job is to handle administrative tasks with the insight and authority of a seasoned agent.

  **Task:** {{{task}}}
  {{#if context}}
  **Context:** {{{context}}}
  {{/if}}

  Perform the requested task and provide a clear output. For example, if asked to draft replies, provide 3 distinct options that are both helpful and strategically aimed at converting a lead. If asked to create a schedule, ensure the content provides value and builds authority.
  `,
});

const manageSocialPageFlow = ai.defineFlow(
  {
    name: 'manageSocialPageFlow',
    inputSchema: ManageSocialPageInputSchema,
    outputSchema: ManageSocialPageOutputSchema,
  },
  async input => {
    const {output} = await manageSocialPagePrompt(input);
    if (!output) {
      throw new Error('The AI failed to perform the social media task.');
    }
    return output;
  }
);

/**
 * An AI flow that performs social media admin tasks.
 *
 * @param {ManageSocialPageInput} input - The input data for the task.
 * @returns {Promise<ManageSocialPageOutput>} A promise that resolves with a status.
 */
export async function manageSocialPage(
  input: ManageSocialPageInput
): Promise<ManageSocialPageOutput> {
  return manageSocialPageFlow(input);
}
