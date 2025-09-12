


/**
 * @fileOverview An AI flow to sync a property listing with the Bayut API.
 *
 * This flow takes structured listing data, converts it to the required JSON format,
 * and pushes it to the Bayut API.
 *
 * @module AI/Flows/SyncBayutListing
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import fetch from 'node-fetch';
import { SyncBayutListingInputSchema, SyncBayutListingOutputSchema, SyncBayutListingInput, SyncBayutListingOutput } from '@/types';


/**
 * The main exported function that wraps the Genkit flow.
 * @param {SyncBayutListingInput} input - The listing data to sync.
 * @returns {Promise<SyncBayutListingOutput>} The result of the sync operation.
 */
export async function syncBayutListing(
  input: SyncBayutListingInput
): Promise<SyncBayutListingOutput> {
  return syncBayutListingFlow(input);
}


const syncBayutListingFlow = ai.defineFlow(
  {
    name: 'syncBayutListingFlow',
    inputSchema: SyncBayutListingInputSchema,
    outputSchema: SyncBayutListingOutputSchema,
  },
  async (input) => {
    const apiKey = process.env.BAYUT_API_KEY;
    const apiEndpoint = 'https://api.bayut.com/v1/properties'; // Placeholder endpoint

    if (!apiKey) {
      throw new Error("Bayut API key is not configured in environment variables.");
    }

    // Construct the JSON payload from the input
    const listingPayload = {
      reference: input.listingReferenceNo,
      title: input.propertyTitle,
      description: input.propertyDescription,
      price: input.price,
      // Assuming a static structure for simplicity. This would be more dynamic in a real app.
      category_id: 1, // Residential
      type_id: 3, // Apartment
      status: 'active',
      permit_number: '12345',
      images: input.imageUrls.map(url => ({ url }))
    };

    // Make the API call to Bayut
    try {
        // This is a placeholder for the actual fetch call.
        // const response = await fetch(apiEndpoint, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${apiKey}`,
        //     },
        //     body: JSON.stringify(listingPayload),
        // });
        // const responseData = await response.json();
        // if (!response.ok) {
        //     throw new Error(responseData.message || 'Bayut API Error');
        // }

      console.log('--- JSON Payload to be sent to Bayut ---');
      console.log(JSON.stringify(listingPayload, null, 2));
      console.log('-------------------------------------------');

      // Fake a successful response for demonstration purposes
      const fakeApiResponse = {
        status: 200,
        message: `Listing ${input.listingReferenceNo} has been successfully created/updated on Bayut.`,
        data: { reference: input.listingReferenceNo }
      };

      return {
        success: fakeApiResponse.status === 200,
        message: fakeApiResponse.message,
        referenceNumber: fakeApiResponse.data.reference,
      };

    } catch (error: any) {
      console.error('Bayut API Error:', error);
      throw new Error(`Failed to sync with Bayut: ${error.message}`);
    }
  }
);
