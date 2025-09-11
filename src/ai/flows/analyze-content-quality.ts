
'use server';

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

// Define Zod schemas for input and output
export const AnalyzeContentQualityInputSchema = z.object({
  sourceUrl: z.string().url().describe("The original URL the content was scraped from."),
  content: z.string().describe("The text content of the webpage."),
});
export type AnalyzeContentQualityInput = z.infer<typeof AnalyzeContentQualityInputSchema>;

export const AnalyzeContentQualityOutputSchema = z.object({
  isHighQuality: z.boolean().describe("A simple boolean indicating if the content is high-quality."),
  contentType: z.enum(['Article', 'Blog Post', 'Forum', 'Listing', 'Company Page', 'Other']).describe("The detected type of content."),
  relevanceScore: z.number().min(0).max(1).describe("A score from 0-1 indicating relevance to the real estate domain."),
  trustworthinessScore: z.number().min(0).max(1).describe("A score from 0-1 indicating the trustworthiness of the content."),
  reasoning: z.string().describe("A brief explanation for the scores and quality assessment."),
});
export type AnalyzeContentQualityOutput = z.infer<typeof AnalyzeContentQualityOutputSchema>;


const analyzeContentQualityPrompt = ai.definePrompt({
  name: 'analyzeContentQualityPrompt',
  input: { schema: AnalyzeContentQualityInputSchema },
  output: { schema: AnalyzeContentQualityOutputSchema },
  prompt: `You are an expert data quality analyst for the real estate industry. Your task is to review the provided text content from a website and determine if it is high-quality and trustworthy.

  **Source URL:** {{{sourceUrl}}}
  **Content:**
  {{{content}}}

  **Instructions:**
  1.  **Assess Relevance:** Read the content and determine how relevant it is to the real estate industry (e.g., market analysis, property listings, agent advice). Assign a `relevanceScore` from 0 (not relevant) to 1 (highly relevant).
  2.  **Assess Trustworthiness:** Look for signs of expertise, authority, and trustworthiness. Does it have an author? Is it well-written? Does it cite sources? Conversely, look for red flags like overly aggressive sales language, guaranteed high returns, pressure tactics, or poor grammar. Assign a `trustworthinessScore` from 0 (very untrustworthy/scam) to 1 (very trustworthy).
  3.  **Determine Content Type:** Classify the content into one of the predefined types.
  4.  **Make a Final Judgment:** Based on your scores, decide if the content is high-quality. Generally, content should be considered high-quality if both `relevanceScore` and `trustworthinessScore` are above 0.6. Set the `isHighQuality` boolean accordingly.
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
