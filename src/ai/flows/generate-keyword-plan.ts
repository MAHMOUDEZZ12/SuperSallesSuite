


/**
 * @fileOverview An AI flow to generate a strategic keyword plan for Google Ads.
 *
 * This flow acts as an expert SEM strategist, taking a topic and location,
 * and returning a comprehensive plan including ad groups, keyword variations,
 * and negative keywords.
 *
 * @module AI/Flows/GenerateKeywordPlan
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {
  GenerateKeywordPlanInputSchema,
  GenerateKeywordPlanOutputSchema,
  type GenerateKeywordPlanInput,
  type GenerateKeywordPlanOutput,
} from '@/types';


const generateKeywordPlanPrompt = ai.definePrompt({
  name: 'generateKeywordPlanPrompt',
  input: {schema: GenerateKeywordPlanInputSchema},
  output: {schema: GenerateKeywordPlanOutputSchema},
  prompt: `You are an expert Google Ads strategist specializing in real estate. Your task is to create a comprehensive keyword plan for a search campaign.

  **Topic:** {{{topic}}}
  **Target Location:** {{{targetLocation}}}

  **Instructions:**

  1.  **Develop a Plan Title:** Create a clear title for the plan.
  2.  **Create Logical Ad Groups:** Generate 2-4 distinct ad groups based on the topic. Examples could include "Branded Terms" (if a brand is mentioned), "Location-Specific," "Feature-Specific," or "Competitor Terms."
  3.  **Populate Keywords:** For each ad group, generate a list of relevant keywords.
      *   For each keyword, provide variations for 'Broad', 'Phrase', and 'Exact' match types.
      *   Estimate a plausible 'monthlySearches' volume (e.g., 100, 500, 1500).
      *   Estimate the 'competition' level ('Low', 'Medium', 'High').
  4.  **Recommend Negative Keywords:** Provide a list of at least 5-10 essential negative keywords to prevent wasted ad spend (e.g., "jobs", "free", "cheap", "rent").

  Return a complete and professional keyword plan ready for a user to implement in their Google Ads account.
  `,
});

const generateKeywordPlanFlow = ai.defineFlow(
  {
    name: 'generateKeywordPlanFlow',
    inputSchema: GenerateKeywordPlanInputSchema,
    outputSchema: GenerateKeywordPlanOutputSchema,
  },
  async input => {
    const {output} = await generateKeywordPlanPrompt(input);
    if (!output) {
      throw new Error('The AI failed to generate a keyword plan.');
    }
    return output;
  }
);


/**
 * An AI flow that generates a keyword plan for Google Ads.
 *
 * @param {GenerateKeywordPlanInput} input - The input data for the plan.
 * @returns {Promise<GenerateKeywordPlanOutput>} A promise that resolves with the keyword plan.
 */
export async function generateKeywordPlan(
  input: GenerateKeywordPlanInput
): Promise<GenerateKeywordPlanOutput> {
  return generateKeywordPlanFlow(input);
}
