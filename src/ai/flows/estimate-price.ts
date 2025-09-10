
'use server';

/**
 * @fileOverview An AI flow to estimate the price of a real estate property.
 *
 * This flow simulates calling a deployed machine learning model on Vertex AI.
 * It takes property characteristics as input and returns a price estimate
 * along with a confidence interval.
 *
 * @module AI/Flows/EstimatePrice
 *
 * @export {function} estimatePrice - The main function to estimate a property's price.
 * @export {type} EstimatePriceInput - The Zod schema for the input of the flow.
 * @export {type} EstimatePriceOutput - The Zod schema for the output of the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {
  EstimatePriceInputSchema,
  EstimatePriceOutputSchema,
  type EstimatePriceInput,
  type EstimatePriceOutput,
} from '@/types';


/**
 * An AI flow that estimates a property's price.
 * This function serves as a wrapper for the underlying Genkit flow.
 *
 * @param {EstimatePriceInput} input - The input data for the estimation.
 * @returns {Promise<EstimatePriceOutput>} A promise that resolves with the price estimation.
 */
export async function estimatePrice(
  input: EstimatePriceInput
): Promise<EstimatePriceOutput> {
  return estimatePriceFlow(input);
}

const estimatePricePrompt = ai.definePrompt({
  name: 'estimatePricePrompt',
  input: {schema: EstimatePriceInputSchema},
  output: {schema: EstimatePriceOutputSchema},
  prompt: `You are a real estate pricing model endpoint. Given the following property details, provide a realistic market value estimation in AED.

  **Property Details:**
  - Location: {{{location}}}
  - Property Type: {{{propertyType}}}
  - Bedrooms: {{{bedrooms}}}
  - Bathrooms: {{{bathrooms}}}
  - Square Footage: {{{squareFootage}}} sqft
  - Property Age: {{{age}}} years
  - Condition: {{{condition}}}

  **Instructions:**
  1.  Act as if you are a trained regression model. Calculate a plausible 'estimatedPrice'.
  2.  Calculate a 'confidenceRange' where the lower and upper bounds are approximately 5-10% away from the estimated price.
  3.  Provide 2-3 fictional but realistic 'comparableSales' that justify your estimation. These should be in a similar location and have similar characteristics.
  
  Return ONLY the structured JSON output.
  `,
});

const estimatePriceFlow = ai.defineFlow(
  {
    name: 'estimatePriceFlow',
    inputSchema: EstimatePriceInputSchema,
    outputSchema: EstimatePriceOutputSchema,
  },
  async input => {
    // In a production environment, this is where you would format the input
    // and make a REST API call to your deployed model on a Vertex AI Endpoint.
    // e.g., const response = await fetch('https://<your-endpoint-url>', { body: JSON.stringify(input) });
    // const result = await response.json();
    // return result;

    // For this prototype, we use a structured prompt with Gemini to simulate the model's output.
    const {output} = await estimatePricePrompt(input);
    if (!output) {
      throw new Error('The AI failed to generate a price estimate.');
    }
    return output;
  }
);
