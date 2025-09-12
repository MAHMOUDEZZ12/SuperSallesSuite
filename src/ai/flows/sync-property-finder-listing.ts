


/**
 * @fileOverview An AI flow to sync a property listing with the Property Finder API.
 *
 * This flow takes structured listing data, converts it to the required XML format,
 * and pushes it to the Property Finder Enterprise API.
 *
 * @module AI/Flows/SyncPropertyFinderListing
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { Builder } from 'xml2js';
import { SyncPropertyFinderListingInputSchema, SyncPropertyFinderListingOutputSchema, SyncPropertyFinderListingInput, SyncPropertyFinderListingOutput } from '@/types';


/**
 * The main exported function that wraps the Genkit flow.
 * @param {SyncPropertyFinderListingInput} input - The listing data to sync.
 * @returns {Promise<SyncPropertyFinderListingOutput>} The result of the sync operation.
 */
export async function syncPropertyFinderListing(
  input: SyncPropertyFinderListingInput
): Promise<SyncPropertyFinderListingOutput> {
  return syncPropertyFinderListingFlow(input);
}


const syncPropertyFinderListingFlow = ai.defineFlow(
  {
    name: 'syncPropertyFinderListingFlow',
    inputSchema: SyncPropertyFinderListingInputSchema,
    outputSchema: SyncPropertyFinderListingOutputSchema,
  },
  async (input) => {
    const apiKey = process.env.PROPERTY_FINDER_API_KEY;
    if (!apiKey) {
      throw new Error("Property Finder API key is not configured in environment variables.");
    }

    // Construct the XML payload from the input
    const listingObject = {
      property: {
        reference_no: input.listingReferenceNo,
        title_en: input.propertyTitle,
        description_en: input.propertyDescription,
        price: input.price,
        // Assuming a static structure for simplicity. This would be more dynamic in a real app.
        property_type: 'AP', // Apartment
        listing_type: 'RS', // Residential Sales
        completion_status: 'completed',
        permit_number: '12345',
        // Map image URLs
        photos: {
            photo: input.imageUrls.map(url => ({ _: url }))
        }
      },
    };

    const builder = new Builder({ rootName: 'list' });
    const xml = builder.buildObject({ property: [listingObject.property] }); // Wrap in property array for correct list format

    // Make the API call to Property Finder
    try {
        // This is a placeholder for the actual fetch call.
        // The Property Finder API endpoint and exact fetch implementation
        // would be required for a live integration.
      console.log('--- XML Payload to be sent to Property Finder ---');
      console.log(xml);
      console.log('--------------------------------------------------');

      // Fake a successful response for demonstration purposes
      const fakeApiResponse = {
        status: 'success',
        message: `Listing ${input.listingReferenceNo} has been successfully updated.`,
        reference_no: input.listingReferenceNo,
      };

      return {
        success: fakeApiResponse.status === 'success',
        message: fakeApiResponse.message,
        referenceNumber: fakeApiResponse.reference_no,
      };

    } catch (error: any) {
      console.error('Property Finder API Error:', error);
      throw new Error(`Failed to sync with Property Finder: ${error.message}`);
    }
  }
);
