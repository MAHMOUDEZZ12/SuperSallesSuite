
'use server';

/**
 * @fileOverview An AI flow to review a lease agreement for potential issues.
 *
 * This flow acts as a legal assistant, analyzing a lease document based on
 * user-provided concerns and identifying relevant clauses, potential risks,
 * and summarizing complex legal language.
 *
 * @module AI/Flows/ReviewLeaseAgreement
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

// Define Zod schemas for input and output
export const ReviewLeaseAgreementInputSchema = z.object({
  leaseDocumentUri: z.string().describe("The lease document as a data URI."),
  userConcerns: z.array(z.string()).describe("A list of specific user concerns to check for in the lease."),
});
export type ReviewLeaseAgreementInput = z.infer<typeof ReviewLeaseAgreementInputSchema>;

export const ReviewLeaseAgreementOutputSchema = z.object({
  summary: z.string().describe("A high-level summary of the lease agreement's key terms."),
  findings: z.array(
    z.object({
      concern: z.string().describe("The user's original concern."),
      clause: z.string().describe("The exact clause from the lease that addresses the concern."),
      explanation: z.string().describe("A plain-English explanation of what the clause means."),
      riskLevel: z.enum(['Low', 'Medium', 'High', 'Informational']).describe("The assessed risk level associated with this clause."),
    })
  ).describe("A list of findings related to the user's concerns."),
});
export type ReviewLeaseAgreementOutput = z.infer<typeof ReviewLeaseAgreementOutputSchema>;


const reviewLeasePrompt = ai.definePrompt({
  name: 'reviewLeasePrompt',
  input: { schema: ReviewLeaseAgreementInputSchema },
  output: { schema: ReviewLeaseAgreementOutputSchema },
  prompt: `You are an expert AI legal assistant specializing in real estate contracts. Your task is to review the provided lease agreement and address the user's specific concerns.

  **Lease Document:**
  {{media url=leaseDocumentUri}}

  **User Concerns:**
  {{#each userConcerns}}
  - {{{this}}}
  {{/each}}

  **Instructions:**
  1.  **Read and Understand:** Thoroughly analyze the entire lease document.
  2.  **Summarize Key Terms:** Provide a brief, high-level summary of the lease, including term length, rent amount, and property details.
  3.  **Address Each Concern:** For each user concern, locate the most relevant clause in the document.
      - Extract the exact wording of the clause.
      - Explain the clause in simple, easy-to-understand language.
      - Assess the potential risk to the tenant as 'Low', 'Medium', 'High', or 'Informational'. For example, a standard late fee policy is 'Low' risk, while a clause allowing the landlord to enter without notice is 'High' risk.
  4.  **Be Neutral:** Do not provide legal advice. Only analyze and explain the contents of the provided document.
  `,
});


/**
 * An AI flow that reviews a lease agreement.
 *
 * @param {ReviewLeaseAgreementInput} input - The input data for the review.
 * @returns {Promise<ReviewLeaseAgreementOutput>} A promise that resolves with the review findings.
 */
export async function reviewLeaseAgreement(input: ReviewLeaseAgreementInput): Promise<ReviewLeaseAgreementOutput> {
  const { output } = await reviewLeasePrompt(input);
  if (!output) {
    throw new Error('The AI failed to review the lease agreement.');
  }
  return output;
}
