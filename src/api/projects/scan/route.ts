
import { ok, fail } from "@/lib/api-helpers";
import { SearchServiceClient } from "@google-cloud/discoveryengine";
import { NextRequest } from "next/server";

// It's better to instantiate the client outside the handler to allow for potential connection reuse.
let client: SearchServiceClient;
let clientInitializationError: Error | null = null;

try {
  client = new SearchServiceClient();
} catch (e: any) {
  clientInitializationError = e;
  console.error("Failed to initialize SearchServiceClient:", e);
}


export async function GET(req: NextRequest) {
  if (clientInitializationError) {
    const detailedError = "Failed to initialize Google Cloud Search client. This often happens in a local development environment if you haven't authenticated. Please run 'gcloud auth application-default login' in your terminal and try again.";
    console.error(detailedError, clientInitializationError);
    return fail(detailedError, 500);
  }

  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
      return fail("Query parameter 'q' is required.", 400);
    }
    
    const projectId = process.env.GCLOUD_PROJECT || "supersellerae-4rzzy";
    const location = "global"; 
    const dataStoreId = "all-sites_1722002324355"; 

    const request = {
      pageSize: 20,
      query: query,
      servingConfig: `projects/${projectId}/locations/${location}/collections/default_collection/dataStores/${dataStoreId}/servingConfigs/default_search`,
      contentSearchSpec: {
        summarySpec: {
          summaryResultCount: 3,
          ignoreAdversarialQuery: true,
          modelSpec: { version: "preview" },
        },
        extractiveContentSpec: {
          maxExtractiveAnswerCount: 3,
        }
      },
    };

    const [response] = await client.search(request);
    
    // Transform the Vertex AI Search results into our existing Project structure
    const projects = response.results?.map(result => {
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
        tags: [result.document?.uri ? new URL(result.document.uri).hostname : 'selltoday.ai'],
      };
    }).filter(Boolean);

    const searchResult = {
        summary: response.summary?.summaryText || null,
        projects: projects,
        extractiveAnswers: response.summary?.summaryWithMetadata?.summary,
    }

    return ok(searchResult);
  } catch (e: any) {
    if (e.message.includes('Could not refresh access token')) {
        const detailedError = "Google Cloud authentication failed. This often happens in a local development environment if you haven't authenticated. Please run 'gcloud auth application-default login' in your terminal and try again.";
        console.error(detailedError, e);
        return fail(detailedError, 500);
    }
    console.error("Vertex AI Search Error:", e);
    // Provide a more detailed error message if available
    const errorMessage = e.details || e.message || 'An unknown error occurred while searching.';
    return fail(errorMessage, 500);
  }
}
