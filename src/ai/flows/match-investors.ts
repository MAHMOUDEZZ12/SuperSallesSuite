


/**
 * @fileOverview An AI flow to match investment properties with suitable clients from a database.
 *
 * This flow analyzes property details and a client database to identify the best investor matches,
 * providing a ranked list with justifications.
 *
 * @module AI/Flows/MatchInvestors
 *
 * @export {function} matchInvestors - The main function to find investor matches.
 * @export {type} MatchInvestorsInput - The Zod schema for the input of the matchInvestors flow.
 * @export {type} MatchInvestorsOutput - The Zod schema for the output of the matchInvestors flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {
  MatchInvestorsInputSchema,
  MatchInvestorsOutputSchema,
  type MatchInvestorsInput,
  type MatchInvestorsOutput,
} from '@/types';


/**
 * An AI flow that matches an investment property with the best clients.
 * This function serves as a wrapper for the underlying Genkit flow.
 *
 * @param {MatchInvestorsInput} input - The input data for matching investors.
 * @returns {Promise<MatchInvestorsOutput>} A promise that resolves with the list of matched investors.
 */
export async function matchInvestors(
  input: MatchInvestorsInput
): Promise<MatchInvestorsOutput> {
  return matchInvestorsFlow(input);
}

const matchInvestorsPrompt = ai.definePrompt({
  name: 'matchInvestorsPrompt',
  input: {schema: MatchInvestorsInputSchema},
  output: {schema: MatchInvestorsOutputSchema},
  prompt: `You are an expert real estate investment analyst. Your task is to analyze the provided investment property and client database (in CSV format) to identify the top 3-5 best-fit investors.

  **Investment Property Details:**
  - Property Type: {{{propertyType}}}
  - Location: {{{location}}}
  - Price: \${{{price}}}
  - Cap Rate: {{{capRate}}}%
  - Investment Thesis: {{{investmentThesis}}}
  - Key Features: {{{keyFeatures}}}

  **Client Database:**
  {{media url=clientDatabase}}

  Analyze the client database, considering their past purchases, stated interests, budget, and risk tolerance. Return a ranked list of the top matches. For each match, provide their name, email, a match score (out of 100), and a brief reasoning for the match.
  `,
});

const matchInvestorsFlow = ai.defineFlow(
  {
    name: 'matchInvestorsFlow',
    inputSchema: MatchInvestorsInputSchema,
    outputSchema: MatchInvestorsOutputSchema,
  },
  async input => {
    const {output} = await matchInvestorsPrompt(input);
    return output!;
  }
);
