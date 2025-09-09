
'use server';

/**
 * @fileOverview AI flow to generate a one-week social media strategy from a given topic or URL.
 *
 * This flow creates a comprehensive, one-week social media plan, including multiple post
 * variations, a tiered hashtag strategy, and specific image suggestions.
 *
 * @module AI/Flows/GenerateSocialPost
 *
 * @export {function} generateSocialPost - The main function to generate a social media strategy.
 * @export {type} GenerateSocialPostInput - The Zod schema for the input of the flow.
 * @export {type} GenerateSocialPostOutput - The Zod schema for the output of the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {
  GenerateSocialPostInputSchema,
  GenerateSocialPostOutputSchema,
  type GenerateSocialPostInput,
  type GenerateSocialPostOutput,
} from '@/types';


/**
 * An AI flow that generates a social media post from a topic or URL.
 * This function serves as a wrapper for the underlying Genkit flow.
 *
 * @param {GenerateSocialPostInput} input - The input data for generating the post.
 * @returns {Promise<GenerateSocialPostOutput>} A promise that resolves with the generated social post content.
 */
export async function generateSocialPost(
  input: GenerateSocialPostInput
): Promise<GenerateSocialPostOutput> {
  return generateSocialPostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSocialPostPrompt',
  input: {schema: GenerateSocialPostInputSchema},
  output: {schema: GenerateSocialPostOutputSchema},
  prompt: `You are an expert real estate social media strategist. Your task is to create a complete, 7-day content plan based on the provided source.

  **Source:** {{{source}}}
  **Platform:** {{{platform}}}
  **Tone:** {{{tone}}}

  **Instructions:**

  1.  **Weekly Content Plan:** Generate a unique, engaging post for each day of the week (Monday to Sunday) and place it in the 'posts' output field. Each post should offer a different angle or highlight a different aspect of the source content.
  2.  **Image Suggestions:** For each daily post, provide a specific and compelling image suggestion that would visually complement the text.
  3.  **Hashtag Strategy:** Create a comprehensive hashtag strategy divided into three tiers:
      *   **Primary:** 5-7 high-volume, broad-appeal hashtags relevant to real estate and the platform.
      *   **Secondary:** 5-7 niche-specific hashtags related to the source content (e.g., #luxurycondo, #firsttimebuyer).
      *   **Location:** 3-5 hashtags for the specific city or neighborhood mentioned or implied in the source (e.g., #miamirealestate, #downtownliving).

  Structure the output to be a complete, ready-to-use strategy for a busy real estate professional.
  `,
});

const generateSocialPostFlow = ai.defineFlow(
  {
    name: 'generateSocialPostFlow',
    inputSchema: GenerateSocialPostInputSchema,
    outputSchema: GenerateSocialPostOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
