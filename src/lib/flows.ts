
'use client';
import { useToast } from '@/hooks/use-toast';

/**
 * A client-side helper function to securely call server-side Genkit flows.
 * This acts as the single bridge between the UI and the AI backend.
 * @param flowId The ID of the flow to run (e.g., 'mainOrchestratorAgent').
 * @param payload The input data for the flow.
 * @returns The result from the flow.
 */
export async function runFlow(flowId: string, payload: any): Promise<any> {
  try {
    const response = await fetch('/api/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ toolId: flowId, payload }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || `Flow '${flowId}' failed with status ${response.status}`);
    }

    return result;
  } catch (error: any) {
    console.error(`Error running flow '${flowId}':`, error);
    // Re-throw the error so the calling component can handle it if needed
    throw error;
  }
}
