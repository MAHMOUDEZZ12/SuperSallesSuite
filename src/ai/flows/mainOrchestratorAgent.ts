'use server';
/**
 * @fileOverview The main AI orchestrator for the entire WhatsMAP platform.
 * This is the central brain that receives user queries and determines the best
 * course of action, dynamically constructing a UI response.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { MainOrchestratorInput, MainOrchestratorOutput } from '@/types';

// Define tools for the orchestrator to use
const projectSearch = ai.defineTool(
  {
    name: 'projectSearch',
    description: 'Search the real estate project database for listings matching a query.',
    input: z.string(),
    output: z.any(),
  },
  async (query) => {
    // In a real app, this would be a call to our /api/projects/scan endpoint
    console.log(`TOOL: projectSearch called with query: ${query}`);
    return {
      projects: [{ id: 'p-1', name: `${query}`, developer: 'Emaar', area: 'Dubai Marina', city: 'Dubai', country: 'AE', priceFrom: 'AED 2.5M', status: 'Ready', thumbnailUrl: 'https://picsum.photos/seed/project1/600/400' }],
    };
  }
);

const orchestratorPrompt = ai.definePrompt({
  name: 'mainOrchestratorAgentPrompt',
  system: `You are the master orchestrator AI for WhatsMAP, an AI-native real estate platform.
  Your primary function is to receive a user's raw query and transform it into a structured, multi-step "Intelligence Briefing".
  This briefing is a JSON object containing a series of UI components ('content_blocks') that will be rendered for the user.

  1.  **Analyze the Query:** First, understand the user's intent and persona.
      - **Persona:** Is this an Investor (cares about ROI, yield, financials), a Homebuyer (cares about lifestyle, schools, amenities), or a Broker (cares about commission, talking points)? Default to Homebuyer if unsure.
      - **Intent:** Is this an informational query, a comparison, a transactional query, or something else?

  2.  **Formulate a Plan:** Based on the persona and intent, decide which UI components are needed for a complete and helpful response. Use your available tools to gather the necessary data.

  3.  **Construct the Briefing:** Build the final JSON output.
      - Start with a 'summary' component to set the stage.
      - If project data is found, always include a 'listing_card_interactive' component.
      - Add persona-specific components:
          - For **Investors**, add a 'financial_summary' component.
          - For **Brokers**, add a 'broker_tools' component.
          - For **Homebuyers**, add a 'lifestyle_score' component.

  4.  **Output JSON:** Return ONLY the valid JSON object for the 'MainOrchestratorOutput' schema. Do not include any other text or explanations.

  Example for query "What's the price of Emaar Beachfront?":
  {
    "inferred_persona": "Investor",
    "content_blocks": [
      { "type": "summary", "content": "Emaar Beachfront shows high investor interest and strong rental yield potential. Here is the top result:" },
      { "type": "listing_card_interactive", "data": { "id": "p-1", "name": "Emaar Beachfront Tower 1", "developer": "Emaar", "area": "Dubai Marina", "city": "Dubai", "country": "AE", "priceFrom": "AED 2.5M", "status": "Ready", "thumbnailUrl": "https://picsum.photos/seed/project1/600/400" } },
      { "type": "financial_summary", "data": { "roi": "8.2%", "yield": "6.5%", "cap_rate": "5.9%" } }
    ]
  }`,
  tools: [projectSearch],
  output: { schema: MainOrchestratorOutput },
});

export const mainOrchestratorAgent = ai.defineFlow(
  {
    name: 'mainOrchestratorAgent',
    inputSchema: MainOrchestratorInput,
    outputSchema: MainOrchestratorOutput,
  },
  async ({ command }) => {
    const { output } = await orchestratorPrompt({ command });
    if (!output) {
      throw new Error('The orchestrator agent failed to produce a response.');
    }
    return output;
  }
);
