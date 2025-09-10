
import { ok, fail } from "@/lib/api-helpers";
import { SearchServiceClient } from "@google-cloud/discoveryengine";
import { NextRequest } from "next/server";

const client = new SearchServiceClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
      return fail("Query parameter 'q' is required.", 400);
    }
    
    const projectId = "supersellerae-4rzzy";
    const location = "global"; 
    const dataStoreId = "all-sites_1722002324355"; 

    const request = {
      pageSize: 20,
      query: query,
      servingConfig: `projects/${projectId}/locations/${location}/collections/default_collection/dataStores/${dataStoreId}/servingConfigs/default_search`,
      // This filter is now less restrictive and will boost results where the developer matches.
      filter: `developer: ANY("${query}") OR searchable_text: CONTAINS("${query}")`,
      contentSearchSpec: {
        summarySpec: {
          summaryResultCount: 3,
          ignoreAdversarialQuery: true,
        },
        extractiveContentSpec: {
          maxExtractiveAnswerCount: 3,
        }
      },
    };

    const [response] = await client.search(request);
    
    // Transform the Vertex AI Search results into our existing Project structure
    const results = response.results?.map(result => {
      const doc = result.document?.derivedStructData?.fields;
      if (!doc) return null;
      
      const getVal = (key: string) => doc[key]?.stringValue || doc[key]?.numberValue || '';

      return {
        id: result.document?.id || `vertex-${Math.random()}`,
        name: getVal('title') || getVal('name') || 'Untitled Project',
        developer: getVal('developer') || 'N/A',
        area: getVal('area') || getVal('location') || 'N/A',
        city: getVal('city') || 'Dubai',
        country: getVal('country') || 'AE',
        priceFrom: getVal('priceFrom') || 'N/A',
        status: getVal('status') || 'Varies',
        thumbnailUrl: getVal('thumbnailUrl') || `https://picsum.photos/seed/${result.document?.id}/400/200`,
        developerLogoUrl: getVal('developerLogoUrl') || '/logos/emaar-logo.png',
        tags: [new URL(result.document?.uri || 'https://google.com').hostname],
        // Add other fields as needed
      };
    }).filter(Boolean);


    return ok(results);
  } catch (e: any) {
    console.error("Vertex AI Search Error:", e);
    // Provide a more detailed error message if available
    const errorMessage = e.details || e.message || 'An unknown error occurred while searching.';
    return fail(errorMessage, 500);
  }
}
