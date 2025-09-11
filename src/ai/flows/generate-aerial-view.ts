
'use server';

/**
 * @fileOverview An AI flow to generate a cinematic aerial view of a property.
 *
 * This flow takes a property address and uses a video generation model to create
 * a short, sweeping aerial video, simulating a drone shot.
 *
 * @module AI/Flows/GenerateAerialView
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'zod';

// Define Zod schemas for input and output
export const GenerateAerialViewInputSchema = z.object({
  address: z.string().describe("The full address of the property to generate a view for."),
});
export type GenerateAerialViewInput = z.infer<typeof GenerateAerialViewInputSchema>;

export const GenerateAerialViewOutputSchema = z.object({
  videoDataUri: z.string().url().describe("A data URI of the generated aerial video, in mp4 format."),
  analysis: z.string().describe("A brief AI analysis of the location and what the video showcases."),
});
export type GenerateAerialViewOutput = z.infer<typeof GenerateAerialViewOutputSchema>;

/**
 * An AI flow that generates a cinematic aerial video of a property.
 *
 * @param {GenerateAerialViewInput} input - The input data for the video generation.
 * @returns {Promise<GenerateAerialViewOutput>} A promise that resolves with the video data URI and analysis.
 */
export async function generateAerialView(input: GenerateAerialViewInput): Promise<GenerateAerialViewOutput> {
  return await generateAerialViewFlow(input);
}

const generateAerialViewFlow = ai.defineFlow(
  {
    name: 'generateAerialViewFlow',
    inputSchema: GenerateAerialViewInputSchema,
    outputSchema: GenerateAerialViewOutputSchema,
  },
  async ({ address }) => {
    // 1. Generate the video with Veo
    const videoGenerationPrompt = `A cinematic, sweeping aerial drone shot of the property located at ${address}. The video should be smooth, high-definition, and showcase the property and its immediate surroundings in a flattering, professional manner. Start with a wide view and slowly zoom in.`;
    
    let { operation } = await ai.generate({
        model: googleAI.model('veo-2.0-generate-001'),
        prompt: videoGenerationPrompt,
        config: {
          durationSeconds: 8,
          aspectRatio: "16:9",
        }
    });

    if (!operation) {
        throw new Error("Video generation did not return a long-running operation.");
    }

    // 2. Poll for video completion
    while (!operation.done) {
        console.log('Checking aerial video generation status...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.checkOperation(operation);
    }

    if (operation.error) {
        throw new Error(`Video generation failed: ${operation.error.message}`);
    }
    
    // 3. Extract video from the result
    const video = operation.output?.message?.content.find(p => p.media?.contentType?.startsWith('video/'));
    if (!video || !video.media?.url) {
      throw new Error("Generated video not found in operation result.");
    }

    // 4. Download video content and convert to a data URI
    const fetch = (await import('node-fetch')).default;
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not set.");
    }
    
    const videoResponse = await fetch(`${video.media.url}&key=${apiKey}`);
    if (!videoResponse.ok) throw new Error(`Failed to download video: ${videoResponse.statusText}`);
    
    const videoBuffer = await videoResponse.arrayBuffer();
    const videoDataUri = `data:video/mp4;base64,${Buffer.from(videoBuffer).toString('base64')}`;

    // 5. Generate a descriptive analysis of the video
    const analysisPrompt = ai.definePrompt({
        name: 'aerialViewAnalysisPrompt',
        prompt: `You have just generated a cinematic aerial video for the property at ${address}. Briefly describe what the video shows and what makes the location appealing.`,
        output: {
            schema: z.object({
                analysis: z.string().describe("A brief analysis of the location and what the video showcases.")
            })
        }
    });

    const { output } = await analysisPrompt({});

    return {
      videoDataUri,
      analysis: output?.analysis || 'An aerial view showcasing the property and its beautiful surroundings.',
    };
  }
);
