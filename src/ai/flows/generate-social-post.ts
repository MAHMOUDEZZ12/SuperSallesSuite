
'use server';

/**
 * @fileOverview AI flow to generate a one-week social media strategy from a given topic or URL, using a specified data store.
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

const getPromptForDataStore = (dataStore: string) => {
    let contextInstruction = "You should rely on your general knowledge.";

    if (dataStore === 'MarketMedia-Lib') {
        contextInstruction = "Your primary knowledge source is the 'MarketMedia-Lib' data store, which contains recent news articles, blogs, and media about the real estate market. Base your posts on facts and figures found in these sources."
    } else if (dataStore === 'Watcher') {
        contextInstruction = "Your primary knowledge source is the 'Watcher' data store, which contains analysis of emerging trends and market sentiment. Your posts should be forward-looking and insightful."
    } else if (dataStore === 'SuperSeller') {
        contextInstruction = "Your primary knowledge source is the 'SuperSeller' data store, which contains specific details about projects, brochures, and company information. Your posts should be focused on promoting these specific projects."
    }

    return `You are an expert real estate social media strategist. Your task is to create a complete, 7-day content plan based on the provided topic.

    **Knowledge Source Context:** ${contextInstruction}

    **Topic/Theme:** {{{topic}}}
    **Platform:** {{{platform}}}
    **Tone:** {{{tone}}}

    **Instructions:**

    1.  **Weekly Content Plan:** Generate a unique, engaging post for each day of the week (Monday to Sunday) based on the topic.
    2.  **Daily Theme:** For each day, create a clear theme (e.g., "Market Insight Monday", "Testimonial Tuesday").
    3.  **Image Suggestions:** For each daily post, provide a specific and compelling image suggestion that would visually complement the text.
    4.  **Hashtag Strategy:** Create a comprehensive hashtag strategy divided into three tiers:
        *   **Primary:** 5-7 high-volume, broad-appeal hashtags relevant to real estate and the platform.
        *   **Secondary:** 5-7 niche-specific hashtags related to the source content (e.g., #luxurycondo, #firsttimebuyer).
        *   **Location:** 3-5 hashtags for the specific city or neighborhood mentioned or implied in the source (e.g., #miamirealestate, #downtownliving).

    Structure the output to be a complete, ready-to-use strategy for a busy real estate professional.
    `;
};


const generateSocialPostFlow = ai.defineFlow(
  {
    name: 'generateSocialPostFlow',
    inputSchema: GenerateSocialPostInputSchema,
    outputSchema: GenerateSocialPostOutputSchema,
  },
  async input => {
    const promptTemplate = getPromptForDataStore(input.dataStore);
    
    const socialPostPrompt = ai.definePrompt({
        name: 'generateSocialPostDynamicPrompt',
        input: {schema: GenerateSocialPostInputSchema},
        output: {schema: GenerateSocialPostOutputSchema},
        prompt: promptTemplate,
    });
    
    const {output} = await socialPostPrompt(input);
    if (!output) {
        throw new Error('Failed to generate social media plan.');
    }
    return output;
  }
);
