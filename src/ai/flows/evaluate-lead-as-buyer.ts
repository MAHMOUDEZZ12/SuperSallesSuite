


/**
 * @fileOverview An AI flow to evaluate an enriched lead and create a detailed buyer profile.
 *
 * This flow acts as an expert analyst, taking information about a lead
 * (like that from the Lead Investigator tool) and inferring their purchasing power,
 * property preferences, and likely investment goals. This is a key step in an
 * automated lead nurturing and matching system.
 *
 * @module AI/Flows/EvaluateLeadAsBuyer
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { EvaluateLeadAsBuyerInputSchema, EvaluateLeadAsBuyerOutputSchema, EvaluateLeadAsBuyerInput, EvaluateLeadAsBuyerOutput } from '@/types';


/**
 * An AI flow that evaluates a lead and creates a detailed buyer profile.
 *
 * @param {EvaluateLeadAsBuyerInput} input - The enriched lead data.
 * @returns {Promise<EvaluateLeadAsBuyerOutput>} A promise that resolves with the buyer profile.
 */
export async function evaluateLeadAsBuyer(input: EvaluateLeadAsBuyerInput): Promise<EvaluateLeadAsBuyerOutput> {
  return await evaluateLeadAsBuyerFlow(input);
}


const evaluateLeadPrompt = ai.definePrompt({
  name: 'evaluateLeadPrompt',
  input: { schema: EvaluateLeadAsBuyerInputSchema },
  output: { schema: EvaluateLeadAsBuyerOutputSchema },
  prompt: `You are an expert real estate lead profiler. Your task is to analyze the provided information about a potential lead and create a detailed buyer profile.

  **Lead Information:**
  - Name: {{{lead.name}}}
  - Location: {{{lead.location}}}
  - Summary: {{{lead.summary}}}
  {{#if lead.company}}- Company: {{{lead.company}}}{{/if}}
  {{#if lead.role}}- Role: {{{lead.role}}}{{/if}}

  **Instructions:**

  1.  **Estimate Budget:** Based on their role, company, and location, estimate a realistic budget range for a property purchase (e.g., "$500K - $750K", "$2M - $3.5M").
  2.  **Infer Property Preferences:** What type of properties would they likely be interested in? Consider factors like family status (inferred from age/role), and lifestyle. (e.g., "Luxury downtown penthouse", "Family villa with garden", "Starter 2-bedroom apartment"). List 2-3 preferences.
  3.  **Determine Primary Motivation:** What is the most likely reason for their purchase? (e.g., "Primary Residence", "Investment/Rental Yield", "Vacation Home").
  4.  **Create a Profile Summary:** Write a brief, 1-2 sentence summary of this person as a potential real estate client.

  Return a complete and insightful buyer profile.
  `,
});

const evaluateLeadAsBuyerFlow = ai.defineFlow(
  {
    name: 'evaluateLeadAsBuyerFlow',
    inputSchema: EvaluateLeadAsBuyerInputSchema,
    outputSchema: EvaluateLeadAsBuyerOutputSchema,
  },
  async (input) => {
    const { output } = await evaluateLeadPrompt(input);
    if (!output) {
      throw new Error("The AI failed to evaluate the lead.");
    }
    return output;
  }
);
