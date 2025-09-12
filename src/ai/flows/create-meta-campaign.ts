


/**
 * @fileOverview An AI flow to create a complete Meta (Facebook/Instagram) ad campaign structure.
 *
 * This flow acts as an expert ad manager, taking a high-level goal and project details
 * and generating a comprehensive campaign plan, from campaign objectives down to
 * specific ad creatives. The publishing of the campaign is handled by a separate tool.
 *
 * @module AI/Flows/CreateMetaCampaign
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { CreateMetaCampaignInputSchema, CreateMetaCampaignOutputSchema, CreateMetaCampaignInput, CreateMetaCampaignOutput } from '@/types';


const createMetaCampaignPrompt = ai.definePrompt({
  name: 'createMetaCampaignPrompt',
  input: {schema: CreateMetaCampaignInputSchema}, 
  output: {schema: CreateMetaCampaignOutputSchema},
  prompt: `You are an expert Meta Ads strategist specializing in real estate. Your task is to take a user's goal and project brochure and create a complete, ready-to-launch campaign structure.

  **User Inputs:**
  - Campaign Goal: {{{campaignGoal}}}
  - Total Budget: {{{budget}}}
  - Duration (Days): {{{durationDays}}}
  {{#if projectBrochureDataUri}}
  - Project Brochure: {{media url=projectBrochureDataUri}}
  {{/if}}

  **Instructions:**

  1.  **Infer Audience:** Based *only* on the project brochure, infer the ideal target audience. Who is this property for? (e.g., "Young professionals," "High-net-worth families," "First-time international investors").
  2.  **Campaign Name & Objective:** Based on the user's goal and the project, create a clear campaign name and choose the most appropriate Meta Ads objective (e.g., LEAD_GENERATION, AWARENESS, TRAFFIC).
  3.  **Ad Sets:**
      - Create at least two ad sets. One for a broad audience based on your inferred persona, and one for a more niche, targeted audience (e.g., a specific interest group or lookalike audience).
      - For each ad set, provide a name and a summary of the recommended targeting strategy (demographics, interests, location).
      - Calculate a reasonable daily budget for each ad set based on the total budget and duration.
  4.  **Ad Creatives:**
      - Generate at least three distinct ad creative variations.
      - For each creative, write a compelling headline and body text, extracting key selling points from the brochure.
      - **CRITICAL**: The call to action and ad copy MUST be tailored to the specific 'Campaign Goal'. For example, if the goal is "Lead Generation to WhatsApp", the CTA should be "Chat on WhatsApp" and the copy should encourage a direct conversation. If the goal is "Lead Generation to Landing Page", the CTA should be "Learn More" and the copy should drive clicks to the website.
      - Provide a specific image suggestion for each creative that would be visually appealing and relevant.
  5.  **Optimization Advice:** Provide one key piece of advice for the user to keep in mind while running this campaign on Meta's platforms.
  6.  **Confirmation**: Output a dummy publishedCampaignId of "campaign-not-published" to indicate the plan is ready but has not been sent to Meta.
  `,
});


const createMetaCampaignFlow = ai.defineFlow(
  {
    name: 'createMetaCampaignFlow',
    inputSchema: CreateMetaCampaignInputSchema,
    outputSchema: CreateMetaCampaignOutputSchema,
  },
  async input => {
    const {output} = await createMetaCampaignPrompt(input);
    if (!output) {
      throw new Error('The AI failed to generate a campaign structure.');
    }
    // The responsibility of publishing is now separate. This flow only creates the plan.
    return output;
  }
);


/**
 * An AI flow that generates a full Meta ad campaign structure.
 * This is the exported server function that can be called from client components.
 *
 * @param {CreateMetaCampaignInput} input - The input data for the campaign.
 * @returns {Promise<CreateMetaCampaignOutput>} A promise that resolves with the generated campaign structure.
 */
export async function createMetaCampaign(input: CreateMetaCampaignInput): Promise<CreateMetaCampaignOutput> {
  return await createMetaCampaignFlow(input);
}

    
