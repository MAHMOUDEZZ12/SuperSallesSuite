
import { NextRequest, NextResponse } from 'next/server';
import { ok, fail } from '@/lib/api-helpers';
import { google } from 'googleapis';
import * as cheerio from 'cheerio';
import { analyzeContentQuality } from '@/ai/flows/analyze-content-quality';

const customsearch = google.customsearch('v1');

async function fetchWithTimeout(resource: any, options: any, timeout = 8000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal  
  });
  clearTimeout(id);
  return response;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');

  if (!query) {
    return fail("Query parameter 'q' is required.", 400);
  }

  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  const SEARCH_ENGINE_ID = process.env.SEARCH_ENGINE_ID;

  if (!GOOGLE_API_KEY || !SEARCH_ENGINE_ID) {
    return fail("Google API key or Search Engine ID is not configured.", 500);
  }

  try {
    // 1. Use Google Search to find relevant URLs
    const searchRes = await customsearch.cse.list({
      auth: GOOGLE_API_KEY,
      cx: SEARCH_ENGINE_ID,
      q: query,
      num: 10, // Get top 10 results
    });

    const items = searchRes.data.items;
    if (!items || items.length === 0) {
      return ok({ message: 'No search results found for the query.' });
    }

    const urls = items.map(item => item.link).filter(link => !!link) as string[];

    // 2. Scrape content and analyze quality for each URL
    const analysisPromises = urls.map(async (url) => {
      try {
        const response = await fetchWithTimeout(url, {}, 5000);
        if (!response.ok) {
          return { url, status: 'failed', reason: `HTTP error ${response.status}` };
        }
        const html = await response.text();
        const $ = cheerio.load(html);
        const textContent = $('body').text().replace(/\s\s+/g, ' ').trim();

        if (textContent.length < 200) {
             return { url, status: 'failed', reason: 'Not enough content to analyze.' };
        }

        // 3. Use AI to analyze content quality
        const analysisResult = await analyzeContentQuality({
          sourceUrl: url,
          content: textContent.substring(0, 8000), // Limit content size for the AI
        });

        return { url, status: 'analyzed', analysis: analysisResult };
      } catch (error: any) {
        return { url, status: 'failed', reason: error.message };
      }
    });

    const results = await Promise.all(analysisPromises);

    // 4. Filter for high-quality content
    const highQualityContent = results.filter(res => res.status === 'analyzed' && res.analysis?.isHighQuality);

    return ok({
        query,
        resultsFound: items.length,
        highQualityCount: highQualityContent.length,
        highQualityLinks: highQualityContent,
        allResults: results, // Include all results for debugging
    });

  } catch (e: any) {
    console.error('Deep Scrape Error:', e);
    return fail(e.message, 500);
  }
}
