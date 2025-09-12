
'use server';

/**
 * @fileOverview An AI flow to synthesize market trends from qualitative data sources.
 *
 * This flow acts as an expert analyst, reviewing sources like Property Finder's
 * Insights Hub to provide a summary of emerging trends for a given topic.
 *
 * @module AI/Flows/GetMarketTrends
 *
 * @export {function} getMarketTrends - The main function to generate the trend analysis.
 * @export {type} GetMarketTrendsInput - The Zod schema for the input.
 * @export {type} GetMarketTrendsOutput - The Zod schema for the output.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {
  GetMarketTrendsInputSchema,
  GetMarketTrendsOutputSchema,
  type GetMarketTrendsInput,
  type GetMarketTrendsOutput,
} from '@/types';


/**
 * An AI flow that analyzes market trends for a specific topic.
 *
 * @param {GetMarketTrendsInput} input - The input data for the analysis.
 * @returns {Promise<GetMarketTrendsOutput>} A promise that resolves with the trend analysis.
 */
export async function getMarketTrends(
  input: GetMarketTrendsInput
): Promise<GetMarketTrendsOutput> {
  return getMarketTrendsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getMarketTrendsPrompt',
  input: {schema: GetMarketTrendsInputSchema},
  output: {schema: GetMarketTrendsOutputSchema},
  prompt: `You are an expert real estate market analyst. Your task is to analyze the latest articles and data from sources like Property Finder Insights Hub to provide a synthesized report on a given topic.

  **Topic:** {{{topic}}}

  **Instructions:**

  1.  **Synthesize Information:** Based on the likely content of recent articles related to the topic, provide a high-level analysis.
  2.  **Determine Overall Sentiment:** Summarize the general feeling of the market regarding the topic. Is it positive, negative, or neutral?
  3.  **Identify Key Emerging Trends:** List 2-4 of the most significant new trends you can infer from the articles. For each trend, provide a brief description.
  4.  **Offer a Future Outlook:** Based on the trends, provide a brief forecast of what to expect in the next 3-6 months related to this topic.
  `,
});

const getMarketTrendsFlow = ai.defineFlow(
  {
    name: 'getMarketTrendsFlow',
    inputSchema: GetMarketTrendsInputSchema,
    outputSchema: GetMarketTrendsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
        throw new Error('The AI failed to generate a market trend analysis.');
    }
    return output;
  }
);
