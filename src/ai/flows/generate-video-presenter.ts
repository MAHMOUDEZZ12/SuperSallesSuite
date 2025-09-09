
'use server';

/**
 * @fileOverview An AI flow to generate a video of a presenter speaking a script.
 *
 * This flow can either take a pre-existing character image or generate a new one,
 * then uses a video generation model to animate the character speaking the provided script.
 * It also generates a separate high-quality audio file of the speech.
 *
 * @module AI/Flows/GenerateVideoPresenter
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { googleAI } from '@genkit-ai/googleai';
import { GenerateVideoPresenterInputSchema, GenerateVideoPresenterOutputSchema, GenerateVideoPresenterInput, GenerateVideoPresenterOutput } from '@/types';


/**
 * An AI flow that generates a video presenter.
 *
 * @param {GenerateVideoPresenterInput} input - The input data for the video generation.
 * @returns {Promise<GenerateVideoPresenterOutput>} A promise that resolves with the video and audio data.
 */
export async function generateVideoPresenter(input: GenerateVideoPresenterInput): Promise<GenerateVideoPresenterOutput> {
    return await generateVideoPresenterFlow(input);
}

const generateVideoPresenterFlow = ai.defineFlow(
  {
    name: 'generateVideoPresenterFlow',
    inputSchema: GenerateVideoPresenterInputSchema,
    outputSchema: GenerateVideoPresenterOutputSchema,
  },
  async (input) => {
    let characterImage = input.characterImageUri;

    // 1. Generate character image if not provided
    if (!characterImage) {
        if (!input.characterDescription) {
            throw new Error("Either a character image or description must be provided.");
        }
        const { media } = await ai.generate({
            model: googleAI.model('imagen-4.0-fast-generate-001'),
            prompt: `Professional studio portrait of a real estate agent: ${input.characterDescription}. Photorealistic, high-detail.`
        });
        if (!media?.url) throw new Error("Failed to generate character image.");
        characterImage = media.url;
    }

    // 2. Generate the video with sound using Veo 3
    const videoGenerationPrompt = [
        { media: { url: characterImage } },
        { text: `Make this person speak the following script in a professional, engaging manner, as if presenting to a client. The person should have natural facial expressions and mouth movements that match the words. The generated video should have synchronized sound.\n\nScript: "${input.script}"` }
    ];

    let { operation } = await ai.generate({
        model: googleAI.model('veo-3.0-generate-preview'),
        prompt: videoGenerationPrompt,
        config: {
          personGeneration: 'allow_all',
        }
    });

    if (!operation) {
        throw new Error("Video generation did not return a long-running operation.");
    }

    // 3. Poll for video completion
    while (!operation.done) {
        console.log('Checking video generation status...');
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds before checking again
        operation = await ai.checkOperation(operation);
    }

    if (operation.error) {
        throw new Error(`Video generation failed: ${operation.error.message}`);
    }
    
    // 4. Extract video and audio from the result
    const video = operation.output?.message?.content.find(p => p.media?.contentType?.startsWith('video/'));
    const audio = operation.output?.message?.content.find(p => p.media?.contentType?.startsWith('audio/'));

    if (!video || !video.media?.url) {
      throw new Error("Generated video not found in operation result.");
    }
    if (!audio || !audio.media?.url) {
      throw new Error("Generated audio not found in operation result.");
    }
    
    // 5. Download video and audio content and convert to data URIs
    const fetch = (await import('node-fetch')).default;
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not set.");
    }

    const [videoResponse, audioResponse] = await Promise.all([
      fetch(`${video.media.url}&key=${apiKey}`),
      fetch(`${audio.media.url}&key=${apiKey}`)
    ]);

    if (!videoResponse.ok) throw new Error(`Failed to download video: ${videoResponse.statusText}`);
    if (!audioResponse.ok) throw new Error(`Failed to download audio: ${audioResponse.statusText}`);

    const [videoBuffer, audioBuffer] = await Promise.all([
      videoResponse.arrayBuffer(),
      audioResponse.arrayBuffer()
    ]);
    
    const videoDataUri = `data:video/mp4;base64,${Buffer.from(videoBuffer).toString('base64')}`;
    const audioDataUri = `data:audio/mpeg;base64,${Buffer.from(audioBuffer).toString('base64')}`;

    return {
      videoUrl: videoDataUri,
      audioDataUri: audioDataUri,
    };
  }
);
