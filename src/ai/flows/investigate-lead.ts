


/**
 * @fileOverview An AI flow to investigate a lead across various online sources.
 *
 * This flow takes basic lead information, searches public sources (simulated),
 * and returns a list of potential matches with a summary and confidence score.
 *
 * @module AI/Flows/InvestigateLead
 *
 * @export {function} investigateLead - The main function to investigate a lead.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {
  InvestigateLeadInputSchema,
  InvestigateLeadOutputSchema,
  InvestigateLeadInput,
  InvestigateLeadOutput,
} from '@/types';


const investigateLeadPrompt = ai.definePrompt({
  name: 'investigateLeadPrompt',
  input: {schema: InvestigateLeadInputSchema},
  output: {schema: InvestigateLeadOutputSchema},
  prompt: `You are an expert lead investigator and open-source intelligence (OSINT) analyst. Your task is to find information about a potential lead based on the provided details. You must search across simulated platforms like LinkedIn, Facebook, Instagram, and general web search.

  **Lead Details:**
  - Name: {{{name}}}
  {{#if company}}- Company: {{{company}}}{{/if}}
  {{#if email}}- Email: {{{email}}}{{/if}}
  {{#if location}}- Location: {{{location}}}{{/if}}
  {{#if role}}- Role: {{{role}}}{{/if}}

  **Instructions:**

  1.  **Simulate Search:** Based on the input, simulate a search across professional networks (like LinkedIn), social media (Facebook, Instagram), and the web.
  2.  **Generate Matches:** Create 1-3 plausible but fictional matches. For each match:
      *   Provide a name, the source (e.g., "LinkedIn"), a fictional but valid-looking profile URL.
      *   Write a summary of the person's fictional profile (e.g., title, company, a brief bio snippet).
      *   Assign a confidence score based on how well the fictional profile matches the input details.
  3.  **Handle Ambiguity:** If the input is vague (e.g., just a common name), generate multiple potential matches and lower the confidence scores. If the input is very specific, generate one strong match with a high confidence score.
  4.  **Provide a Summary:** Write a brief overall summary of your findings, for example: "I found a strong potential match on LinkedIn and a possible secondary match on Facebook. Further refinement may be needed."

  Return the results in the specified format.
  `,
});

const investigateLeadFlow = ai.defineFlow(
  {
    name: 'investigateLeadFlow',
    inputSchema: InvestigateLeadInputSchema,
    outputSchema: InvestigateLeadOutputSchema,
  },
  async input => {
    // Simulate a longer processing time for a more realistic user experience
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    const {output} = await investigateLeadPrompt(input);
    if (!output) {
      throw new Error('The AI failed to investigate the lead.');
    }
    return output;
  }
);


/**
 * An AI flow that investigates a lead.
 *
 * @param {InvestigateLeadInput} input - The input data for the investigation.
 * @returns {Promise<InvestigateLeadOutput>} A promise that resolves with the investigation results.
 */
export async function investigateLead(
  input: InvestigateLeadInput
): Promise<InvestigateLeadOutput> {
  return investigateLeadFlow(input);
}
