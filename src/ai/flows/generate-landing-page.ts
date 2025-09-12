

/**
 * @fileOverview AI flow to generate a landing page for a specific project based on project details and user branding.
 *
 * This flow generates the HTML for a complete landing page, incorporating project details,
 * user branding preferences, and information from an optional brochure.
 *
 * @module AI/Flows/GenerateLandingPage
 *
 * @export {function} generateLandingPage - The main function to generate a landing page.
 * @export {type} GenerateLandingPageInput - The Zod schema for the input of the generateLandingPage flow.
 * @export {type} GenerateLandingPageOutput - The Zod schema for the output of the generateLandingPage flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {
  GenerateLandingPageInputSchema,
  GenerateLandingPageOutputSchema,
  type GenerateLandingPageInput,
  type GenerateLandingPageOutput,
} from '@/types';


/**
 * An AI flow that generates the HTML for a landing page.
 * This function serves as a wrapper for the underlying Genkit flow.
 *
 * @param {GenerateLandingPageInput} input - The input data for generating the landing page.
 * @returns {Promise<GenerateLandingPageOutput>} A promise that resolves with the generated landing page HTML.
 */
export async function generateLandingPage(
  input: GenerateLandingPageInput
): Promise<GenerateLandingPageOutput> {
  return generateLandingPageFlow(input);
}

const headlinePrompt = ai.definePrompt({
    name: 'landingPageHeadlinePrompt',
    input: { schema: GenerateLandingPageInputSchema },
    output: { schema: GenerateLandingPageOutputSchema },
    prompt: `You are an expert real estate marketing strategist. Based on the following project details, generate 3 distinct strategies for the main headline and call-to-action (CTA) for a landing page.

    **Project Details:**
    - Project Name: {{{projectName}}}
    - Offer Details: {{{projectDetails}}}

    For each strategy, provide a name (e.g., "Urgency-Focused", "Luxury-Focused", "Benefit-Focused"), a compelling headline, and a clear call-to-action.
    `,
});


const landingPagePrompt = ai.definePrompt({
  name: 'landingPagePrompt',
  input: {schema: GenerateLandingPageInputSchema },
  output: {schema: GenerateLandingPageOutputSchema},
  prompt: `You are an expert web developer specializing in high-converting real estate landing pages. Your task is to generate a complete, single-file HTML document using Tailwind CSS for styling.

  **Project Details:**
  - Project Name: {{{projectName}}}
  - Offer Details: {{{projectDetails}}}
  - Branding Style(s): {{{brandingStyle}}}
  - Desired Page Structure: Create a page with {{{numberOfSections}}} main sections.
  {{#if projectBrochureDataUri}}
  - Project Brochure: {{media url=projectBrochureDataUri}}
  {{/if}}

  **Chosen Strategy:**
  - Headline: {{{selectedHeadline}}}
  - Call-to-Action: {{{selectedCta}}}

  **Instructions:**

  1.  **HTML Structure:** Create a full HTML5 document structure (\`<!DOCTYPE html>\`, \`<html>\`, \`<head>\`, \`<body>\`).
  2.  **Tailwind CSS:** Use the Tailwind CSS CDN script in the \`<head>\` for styling. Do not use any other CSS frameworks or custom CSS. \`<script src="https://cdn.tailwindcss.com"></script>\`
  3.  **Hero Section:** Create a visually impressive hero section using a high-quality placeholder image from picsum.photos as the background. It must feature the chosen **Headline** and **Call-to-Action**.
  4.  **Content Sections:** Based on the 'numberOfSections' parameter, build out the page.
      - If 2 sections: Hero + Lead Capture Form.
      - If 3 sections: Hero + Key Features + Lead Capture Form.
      - If 4 sections: Hero + Key Features + Gallery + Lead Capture Form.
      - If 5 sections: Hero + Key Features + Gallery + Location/Map + Lead Capture Form.
      - Use placeholder images from picsum.photos for the gallery and other sections.
  5.  **Lead Capture Form:** This is critical. Include a prominent lead capture form with fields for Name, Email, and Phone Number, and a clear "Register Your Interest" button.
  6.  **Branding:** Ensure the overall design (colors, fonts) reflects the specified 'Branding Style(s)'. If multiple styles are provided, blend them intelligently (e.g., Modern structure with Luxury accents).
  7.  **Output:** Return ONLY the complete, raw HTML code for the landing page in the landingPageHtml field. Do not include any explanations, markdown, or other text outside of the HTML itself.
  `,
});

const generateLandingPageFlow = ai.defineFlow(
  {
    name: 'generateLandingPageFlow',
    inputSchema: GenerateLandingPageInputSchema,
    outputSchema: GenerateLandingPageOutputSchema,
  },
  async input => {
    if (input.generateHeadlinesOnly) {
        const { output } = await headlinePrompt(input);
        if (!output || !output.headlineOptions) {
            throw new Error('Failed to generate headline strategies.');
        }
        return { headlineOptions: output.headlineOptions };
    }

    const {output} = await landingPagePrompt(input);
    if (!output) {
      throw new Error('Failed to generate landing page HTML.');
    }
    
    return output;
  }
);
