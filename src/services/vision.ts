
import { ImageAnnotatorClient } from '@google-cloud/vision';

// Instantiates a client
const client = new ImageAnnotatorClient({ projectId: "supersellerae-4rzzy" });

/**
 * Extracts text from an image using the Google Cloud Vision API.
 * @param {string} dataUri The image as a data URI.
 * @returns {Promise<string>} The extracted text.
 */
export async function extractTextFromImage(dataUri: string): Promise<string> {
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
  } catch (error) {
    console.error('ERROR in Cloud Vision API:', error);
    throw new Error('Failed to process image with Cloud Vision API.');
  }
}
