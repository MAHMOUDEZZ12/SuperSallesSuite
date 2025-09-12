
import { ImageAnnotatorClient } from '@google-cloud/vision';

// Instantiates a client
let client: ImageAnnotatorClient;
let clientInitializationError: Error | null = null;

try {
  client = new ImageAnnotatorClient();
} catch (e: any) {
  clientInitializationError = e;
  console.error("Failed to initialize ImageAnnotatorClient:", e);
}


/**
 * Extracts text from an image using the Google Cloud Vision API.
 * @param {string} dataUri The image as a data URI.
 * @returns {Promise<string>} The extracted text.
 */
export async function extractTextFromImage(dataUri: string): Promise<string> {
  if (clientInitializationError) {
    const detailedError = "Failed to initialize Google Cloud Vision client. This often happens in a local development environment if you haven't authenticated. Please run 'gcloud auth application-default login' in your terminal and try again.";
    console.error(detailedError, clientInitializationError);
    throw new Error(detailedError);
  }

  try {
    // Convert data URI to base64
    const base64Image = dataUri.split(',')[1];
    if (!base64Image) {
        throw new Error('Invalid data URI format.');
    }

    const request = {
      image: {
        content: base64Image,
      },
      features: [{ type: 'DOCUMENT_TEXT_DETECTION' }],
    };

    const [result] = await client.documentTextDetection(request);
    const fullTextAnnotation = result.fullTextAnnotation;

    if (fullTextAnnotation && fullTextAnnotation.text) {
      return fullTextAnnotation.text;
    } else {
      return 'No text found in the image.';
    }
  } catch (error: any) {
    if (error.message.includes('Could not refresh access token')) {
        const detailedError = "Google Cloud authentication failed. This often happens in a local development environment if you haven't authenticated. Please run 'gcloud auth application-default login' in your terminal and try again.";
        console.error(detailedError, error);
        throw new Error(detailedError);
    }
    console.error('ERROR in Cloud Vision API:', error);
    throw new Error('Failed to process image with Cloud Vision API.');
  }
}
