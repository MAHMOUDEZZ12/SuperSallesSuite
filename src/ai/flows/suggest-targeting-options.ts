


/**
 * @fileOverview AI flow to suggest targeting options for ad campaigns based on project details and target audience.
 *
 * This flow provides a detailed list of targeting options, including demographics, interests,
 * behaviors, and keywords, to help optimize ad campaigns for real estate projects.
 *
 * @module AI/Flows/SuggestTargetingOptions
 *
 * @export {function} suggestTargetingOptions - The main function to suggest targeting options.
 * @export {type} SuggestTargetingOptionsInput - The Zod schema for the input of the suggestTargetingOptions flow.
 * @export {type} SuggestTargetingOptionsOutput - The Zod schema for the output of the suggestTargetingOptions flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { SuggestTargetingOptionsInputSchema, SuggestTargetingOptionsOutputSchema, SuggestTargetingOptionsInput, SuggestTargetingOptionsOutput } from '@/types';


/**
 * An AI flow that suggests targeting options for an ad campaign.
 * This function serves as a wrapper for the underlying Genkit flow.
 *
 * @param {SuggestTargetingOptionsInput} input - The input data for suggesting targeting options.
 * @returns {Promise<SuggestTargetingOptionsOutput>} A promise that resolves with the suggested targeting options.
 */
export async function suggestTargetingOptions(
  input: SuggestTargetingOptionsInput
): Promise<SuggestTargetingOptionsOutput> {
  return suggestTargetingOptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTargetingOptionsPrompt',
  input: {schema: SuggestTargetingOptionsInputSchema},
  output: {schema: SuggestTargetingOptionsOutputSchema},
  prompt: `You are an expert in digital marketing and advertising, specializing in real estate.
  Based on the provided project details, suggest 2-3 distinct targeting strategies for an ad campaign on platforms like Meta (Facebook/Instagram) and Google.

  **TODO: The project data should be fetched from a database using the projectId.**
  For now, use this placeholder data for Project ID: {{projectId}}
  
  **Property Details:**
  - Location: "Downtown Dubai"
  - Property Type: "Luxury High-rise Condo"
  - Price Range: $1,000,000 - $2,500,000
  - Key Amenities: "Rooftop infinity pool, 24/7 concierge, state-of-the-art gym, valet parking"
  - Past Buyers Profile: High-net-worth individuals, tech executives, international investors.

  **Instructions:**
  
  1.  **Analyze the Project**: Based on the property details, infer the most likely buyer personas.
  2.  **Generate 2-3 Distinct Strategies**: Create multiple, distinct targeting strategies. For each strategy, recommend the most appropriate Meta Audience Type. For example:
      - **Strategy 1: The Local Professional**: Use 'Detailed Targeting' for high-income professionals in the area.
      - **Strategy 2: The International Investor**: Use 'Detailed Targeting' for individuals in key international markets known for investing in this city.
      - **Strategy 3: Past Buyer Lookalikes**: Suggest creating a 'Lookalike Audience' based on past buyer profiles to find similar users.
  3.  **Detail Each Strategy**: For each strategy, provide a clear name, the audience type, and a detailed breakdown of:
      - **Demographics:** Location, Age, Language, etc.
      - **Interests (for Facebook/Instagram):** Specific, actionable interests to target.
      - **Keywords (for Google Ads):** High-intent keywords for search campaigns.
  4.  **Format the Output**: Structure your response strictly according to the 'strategies' array in the output schema.
`,
});

const suggestTargetingOptionsFlow = ai.defineFlow(
  {
    name: 'suggestTargetingOptionsFlow',
    inputSchema: SuggestTargetingOptionsInputSchema,
    outputSchema: SuggestTargetingOptionsOutputSchema,
  },
  async input => {
    // In a future step, we would use input.projectId to fetch real data from Firestore.
    // For now, the prompt contains placeholder data.
    const {output} = await prompt(input);
    return output!;
  }
);

    
