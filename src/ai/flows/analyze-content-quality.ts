


/**
 * @fileOverview An AI flow to analyze the quality and trustworthiness of web content.
 *
 * This flow acts as a data quality expert, reviewing scraped text from a URL
 * to determine if it is high-quality, relevant, and free of scam-like indicators.
 * It's a critical component of the deep scraping tool to ensure clean training data.
 *
 * @module AI/Flows/AnalyzeContentQuality
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { AnalyzeContentQualityInputSchema, AnalyzeContentQualityOutputSchema, type AnalyzeContentQualityInput, type AnalyzeContentQualityOutput } from '@/types';


const analyzeContentQualityPrompt = ai.definePrompt({
  name: 'analyzeContentQualityPrompt',
  input: { schema: AnalyzeContentQualityInputSchema },
  output: { schema: AnalyzeContentQualityOutputSchema },
  prompt: `You are an expert data quality analyst for the real estate industry. Your task is to review the provided text content from a website and determine if it is high-quality and trustworthy.

  **Source URL:** {{{sourceUrl}}}
  **Content:**
  {{{content}}}

  **Instructions:**
  1.  **Assess Relevance:** Read the content and determine how relevant it is to the real estate industry (e.g., market analysis, property listings, agent advice). Assign a \`relevanceScore\` from 0 (not relevant) to 1 (highly relevant).
  2.  **Assess Trustworthiness:** Look for signs of expertise, authority, and trustworthiness. Does it have an author? Is it well-written? Does it cite sources? Conversely, look for red flags like overly aggressive sales language, guaranteed high returns, pressure tactics, or poor grammar. Assign a \`trustworthinessScore\` from 0 (very untrustworthy/scam) to 1 (very trustworthy).
  3.  **Determine Content Type:** Classify the content into one of the predefined types.
  4.  **Make a Final Judgment:** Based on your scores, decide if the content is high-quality. Generally, content should be considered high-quality if both \`relevanceScore\` and \`trustworthinessScore\` are above 0.6. Set the \`isHighQuality\` boolean accordingly.
  5.  **Provide Reasoning:** Write a brief, one-sentence explanation for your decision.
  `,
});


/**
 * An AI flow that analyzes the quality of scraped web content.
 *
 * @param {AnalyzeContentQualityInput} input - The input data for the analysis.
 * @returns {Promise<AnalyzeContentQualityOutput>} A promise that resolves with the quality analysis.
 */
export async function analyzeContentQuality(input: AnalyzeContentQualityInput): Promise<AnalyzeContentQualityOutput> {
  const { output } = await analyzeContentQualityPrompt(input);
  if (!output) {
    throw new Error('The AI failed to analyze the content quality.');
  }
  return output;
}
