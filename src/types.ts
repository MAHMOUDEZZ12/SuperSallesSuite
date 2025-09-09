
import { z } from 'zod';

// Core market identity
export type MarketKey = `${string}:${string}`; // e.g. "AE:Dubai"
export interface Market { country: string; city: string; key?: MarketKey }

// Catalog project (what you store in projects_catalog)
export interface Project {
  id: string;
  name: string;
  developer: string;
  city: string;
  country: string;
  area?: string;
  priceFrom?: string | number;
  unitTypes?: string[];
  handover?: string;
  status?: "New Launch" | "Off-plan" | "Ready" | string;
  thumbnailUrl?: string;
  tags?: string[];
}

// Per-user shortlist library
export interface UserLibrary {
  uid: string;
  marketKey: MarketKey;
  items: string[];       // array of project IDs
  ts: number;
}

// Brand kit stored with user
export interface BrandKit {
  logoUrl?: string;
  colors?: { primary?: string; accent?: string };
  contact?: { name?: string; phone?: string; email?: string; whatsappUrl?: string };
}

// Onboarding draft (saved/resumed)
export interface OnboardingDraft {
  city?: string;
  country?: string;
  devFocus?: string[];
  scanSelected?: string[];
  shortlist?: string[];
  brandKit?: BrandKit;
  connections?: Record<string, "connected" | "skipped">;
  payment?: { status?: "added" | "skipped" };
  progress?: { step: number; ts: number };
}

// Simple event envelope
export interface AppEvent {
  event: string;
  uid?: string;
  props?: Record<string, any>;
  ts?: any; // serverTimestamp()
}

// Schemas for AI Brand Creator
export const AIBrandCreatorInputSchema = z.object({
  command: z.string().describe('The command from the user.'),
  documents: z
    .array(z.string())
    .describe(
      "An array of documents (e.g., PDFs, text files) as data URIs. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AIBrandCreatorInput = z.infer<typeof AIBrandCreatorInputSchema>;

export const AIBrandCreatorOutputSchema = z.object({
  brandInfo: z
    .object({
      companyName: z.string().optional().describe('The name of the company.'),
      companyDescription: z.string().optional().describe('A short, compelling description of the company.'),
      contact: z.object({
        name: z.string().optional().describe('The primary contact person\'s name.'),
        phone: z.string().optional().describe('The contact phone number.'),
        email: z.string().optional().describe('The contact email address.'),
      }).optional().describe('The extracted contact information.'),
      primaryColor: z
        .string()
        .optional()
        .describe('The primary brand color, as a hex code.'),
      secondaryColor: z
        .string()
        .optional()
        .describe('The secondary brand color, as a hex code.'),
    })
    .optional(),
  projects: z
    .array(
      z.object({
        name: z.string().describe('The name of the project.'),
        location: z.string().optional().describe('The project location.'),
        status: z
          .string()
          .optional()
          .describe('The current status of the project.'),
      })
    )
    .optional(),
  summary: z
    .string()
    .describe(
      'A human-readable summary of the setup actions performed by the AI.'
    ),
});
export type AIBrandCreatorOutput = z.infer<typeof AIBrandCreatorOutputSchema>;

// Schemas for Create Email Campaign
export const CreateEmailCampaignInputSchema = z.object({
  goal: z
    .string()
    .describe(
      'The goal of the campaign (e.g., "New Listing Announcement", "Open House Follow-up").'
    ),
  source: z
    .string()
    .describe(
      'A URL or topic to use as the content basis (e.g., a property listing page, a market report topic).'
    ),
  tone: z
    .string()
    .describe('The desired tone of voice for the emails (e.g., "Professional & Urgent").'),
});
export type CreateEmailCampaignInput = z.infer<typeof CreateEmailCampaignInputSchema>;

export const CreateEmailCampaignOutputSchema = z.object({
  emails: z
    .array(
      z.object({
        subject: z.string().describe("The email's subject line."),
        bodyHtml: z.string().describe('The full HTML content of the email.'),
        sendDelayDays: z
          .number()
          .describe(
            'The number of days to wait before sending this email (e.g., 0 for immediate, 2 for two days later).'
          ),
      })
    )
    .describe('A sequence of generated emails for the campaign.'),
});
export type CreateEmailCampaignOutput = z.infer<typeof CreateEmailCampaignOutputSchema>;

// Schemas for Audience Creator AI
export const SuggestTargetingOptionsInputSchema = z.object({
  projectId: z.string().describe('The project ID to generate targeting for.'),
});
export const SuggestTargetingOptionsOutputSchema = z.object({
  strategies: z.array(z.object({
    strategyName: z.string().describe("The name of the targeting strategy (e.g., 'The Local Professional')."),
    audienceType: z.string().describe("The type of Meta audience to create (e.g., 'Detailed Targeting', 'Lookalike Audience')."),
    demographics: z.string().describe("The demographic targeting parameters (e.g., 'Age: 30-45, Location: Downtown Dubai')."),
    interests: z.string().describe("The interest-based targeting for platforms like Facebook/Instagram."),
    keywords: z.string().describe("The keyword targeting for platforms like Google Ads."),
  })).describe("A list of 2-3 distinct targeting strategies."),
});
export type SuggestTargetingOptionsInput = z.infer<typeof SuggestTargetingOptionsInputSchema>;
export type SuggestTargetingOptionsOutput = z.infer<typeof SuggestTargetingOptionsOutputSchema>;


// Schemas for Meta Ads Co-Pilot
export const CreateMetaCampaignInputSchema = z.object({
  campaignGoal: z.string().describe("The user's primary objective for the campaign. e.g. 'Lead Generation to Landing Page'"),
  projectBrochureDataUri: z.string().describe("The project brochure as a data URI."),
  budget: z.number().describe("The total ad spend budget."),
  durationDays: z.number().describe("The campaign duration in days."),
});

export const CreateMetaCampaignOutputSchema = z.object({
    publishedCampaignId: z.string().describe("A dummy ID confirming the plan is ready. Always 'campaign-not-published'."),
    campaignName: z.string().describe("The AI-generated name for the campaign."),
    campaignObjective: z.string().describe("The recommended Meta Ads objective (e.g., 'LEAD_GENERATION')."),
    inferredAudience: z.string().describe("A description of the target audience inferred by the AI."),
    adSets: z.array(z.object({
        name: z.string().describe("The name of the ad set."),
        targetingSummary: z.string().describe("A summary of the targeting strategy for this set."),
        dailyBudget: z.number().describe("The calculated daily budget for this ad set."),
    })).describe("A list of ad sets for the campaign."),
    adCreatives: z.array(z.object({
        headline: z.string().describe("The ad headline."),
        bodyText: z.string().describe("The ad's primary text/body."),
        callToAction: z.string().describe("The suggested call-to-action button text."),
        imageSuggestion: z.string().describe("A detailed suggestion for the ad's visual creative."),
    })).describe("A list of ad creative variations to test."),
    optimizationAdvice: z.string().describe("A key piece of advice for running the campaign."),
});

export type CreateMetaCampaignInput = z.infer<typeof CreateMetaCampaignInputSchema>;
export type CreateMetaCampaignOutput = z.infer<typeof CreateMetaCampaignOutputSchema>;


// Schemas for Lead Investigator AI
export const InvestigateLeadInputSchema = z.object({
  name: z.string().describe('The full name of the lead.'),
  company: z.string().optional().describe('The company the lead works for.'),
  email: z.string().optional().describe('The email address of the lead.'),
  location: z.string().optional().describe('The city or country of the lead.'),
  role: z.string().optional().describe('The job title or role of the lead.'),
});
export type InvestigateLeadInput = z.infer<typeof InvestigateLeadInputSchema>;

const LeadMatchSchema = z.object({
  name: z.string().describe('The name of the matched person.'),
  source: z.string().describe('The platform where the match was found (e.g., LinkedIn, Facebook, Company Website).'),
  profileUrl: z.string().url().describe('The URL to the profile or source page.'),
  summary: z.string().describe('A brief summary of why this might be the lead (e.g., "CEO at ACME Inc, based in Dubai").'),
  matchConfidence: z.number().min(0).max(1).describe('The AI\'s confidence that this is the correct person (0 to 1).'),
});

export const InvestigateLeadOutputSchema = z.object({
  matches: z.array(LeadMatchSchema).describe('A list of potential matches found for the lead.'),
  overallSummary: z.string().describe('A high-level summary of the investigation findings.'),
});
export type InvestigateLeadOutput = z.infer<typeof InvestigateLeadOutputSchema>;

// Schemas for AI Video Presenter
export const GenerateVideoPresenterInputSchema = z.object({
  characterImageUri: z.string().optional().describe("A data URI of a pre-existing character image. If not provided, a new character will be generated based on the description."),
  characterDescription: z.string().optional().describe("A text description to generate a new character image if no image URI is provided."),
  script: z.string().describe("The script for the presenter to speak."),
  projectId: z.string().optional().describe("An optional project ID to provide context for the speech."),
});
export type GenerateVideoPresenterInput = z.infer<typeof GenerateVideoPresenterInputSchema>;


export const GenerateVideoPresenterOutputSchema = z.object({
  videoUrl: z.string().describe("The URL of the generated presenter video."),
  audioDataUri: z.string().describe("A data URI of the generated speech audio in WAV format."),
});
export type GenerateVideoPresenterOutput = z.infer<typeof GenerateVideoPresenterOutputSchema>;


// Schemas for Property Finder Sync
export const SyncPropertyFinderListingInputSchema = z.object({
    listingReferenceNo: z.string().describe("The unique reference number for the listing."),
    propertyTitle: z.string().describe("The title of the property listing."),
    propertyDescription: z.string().describe("The detailed description of the property."),
    price: z.number().positive().describe("The price of the property."),
    imageUrls: z.array(z.string().url()).describe("An array of URLs for the property images."),
});
export type SyncPropertyFinderListingInput = z.infer<typeof SyncPropertyFinderListingInputSchema>;

export const SyncPropertyFinderListingOutputSchema = z.object({
    success: z.boolean().describe("Whether the API call was successful."),
    message: z.string().describe("A message from the API response."),
    referenceNumber: z.string().optional().describe("The reference number of the synced listing."),
});
export type SyncPropertyFinderListingOutput = z.infer<typeof SyncPropertyFinderListingOutputSchema>;

// Schemas for Bayut Sync
export const SyncBayutListingInputSchema = z.object({
    listingReferenceNo: z.string().describe("The unique reference number for the listing."),
    propertyTitle: z.string().describe("The title of the property listing."),
    propertyDescription: z.string().describe("The detailed description of the property."),
    price: z.number().positive().describe("The price of the property."),
    imageUrls: z.array(z.string().url()).describe("An array of URLs for the property images."),
});
export type SyncBayutListingInput = z.infer<typeof SyncBayutListingInputSchema>;

export const SyncBayutListingOutputSchema = z.object({
    success: z.boolean().describe("Whether the API call was successful."),
    message: z.string().describe("A message from the API response."),
    referenceNumber: z.string().optional().describe("The reference number of the synced listing."),
});
export type SyncBayutListingOutput = z.infer<typeof SyncBayutListingOutputSchema>;

// Schemas for Rebrand Brochure
export const RebrandBrochureInputSchema = z.object({
  brochureDataUri: z
    .string()
    .describe(
      "A brochure document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  contactDetails: z.string().describe('The contact details of the user.'),
  companyName: z.string().describe('The name of the user or company.'),
  companyLogoDataUri: z
    .string()
    .optional()
    .describe(
      "The company logo, as a data URI. If not provided, a logo will be generated."
    ),
  toneOfVoice: z
    .string()
    .describe('The desired tone of voice for the brochure.'),
  colors: z.string().describe('The desired colors for the brochure.'),
  deepEditInstructions: z
    .string()
    .optional()
    .describe('Optional specific instructions for deep editing.'),
});

export type RebrandBrochureInput = z.infer<typeof RebrandBrochureInputSchema>;

export const RebrandBrochureOutputSchema = z.object({
  rebrandedBrochureDataUri: z
    .string()
    .describe(
      "The rebranded brochure, as a data URI."
    ),
  logoDataUri: z
    .string()
    .optional()
    .describe(
      "The generated logo, as a data URI. Only present if a logo was generated."
    ),
});

export type RebrandBrochureOutput = z.infer<typeof RebrandBrochureOutputSchema>;

// Schemas for Edit PDF
export const EditPdfInputSchema = z.object({
  sourcePdf: z
    .string()
    .describe(
      "The source PDF document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  editInstructions: z
    .string()
    .describe('The instructions for editing the PDF.'),
  newImages: z
    .array(z.string())
    .optional()
    .describe(
      "An optional array of new images to be used, as data URIs. Expected format: 'data:<mimetype>;base64,<encoded_data>'. Only provide if your instructions reference replacing an image."
    ),
});
export type EditPdfInput = z.infer<typeof EditPdfInputSchema>;

const ExecutionStepSchema = z.object({
    description: z.string().describe("A human-readable description of the step."),
    tool: z.string().describe("The name of the tool or API to be called."),
    parameters: z.any().describe("The parameters to be passed to the tool."),
});

export const EditPdfOutputSchema = z.object({
  summary: z.string().describe("A brief summary of the planned edits."),
  executionPlan: z.array(ExecutionStepSchema).describe("An array of steps to be executed."),
});
export type EditPdfOutput = z.infer<typeof EditPdfOutputSchema>;


// Schemas for Generate Ad From Brochure
export const GenerateAdFromBrochureInputSchema = z.object({
  brochureDataUri: z
    .string()
    .optional()
    .describe(
      "A project brochure, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  projectName: z.string().optional().describe('The name of the project.'),
  additionalInformation: z
    .string()
    .optional()
    .describe('Additional key details about the project.'),
  focusArea: z
    .string()
    .describe('The specific part of the project to focus on in the ad.'),
  toneOfVoice: z.string().describe('The desired tone of voice for the ad.'),
});
export type GenerateAdFromBrochureInput = z.infer<typeof GenerateAdFromBrochureInputSchema>;

export const GenerateAdFromBrochureOutputSchema = z.object({
  adCopy: z.string().describe('The generated ad copy.'),
  adDesign: z.string().describe('The data URI of the generated ad design.'),
  landingPage: z
    .string()
    .describe('The data URI of the generated landing page.'),
});
export type GenerateAdFromBrochureOutput = z.infer<typeof GenerateAdFromBrochureOutputSchema>;

// Schemas for Generate Listing
export const GenerateListingInputSchema = z.object({
  platform: z.string().describe("The listing platform (e.g., 'Property Finder', 'Bayut')."),
  propertyAddress: z.string().describe('The full address of the property.'),
  keyDetails: z.string().describe('Basic stats like beds, baths, and square footage.'),
  uniqueFeatures: z.string().describe('What makes this property special. Separate features with a comma or newline.'),
  tone: z.enum(['Luxury', 'Family-Friendly', 'Modern', 'Cozy', 'Urgent']).describe('The desired tone for the listing description.'),
});
export type GenerateListingInput = z.infer<typeof GenerateListingInputSchema>;

export const GenerateListingOutputSchema = z.object({
  title: z.string().describe("A compelling, SEO-friendly title for the listing."),
  description: z.string().describe('The full, persuasive listing description.'),
  keywords: z.array(z.string()).describe("A list of suggested keywords for the listing platform."),
});
export type GenerateListingOutput = z.infer<typeof GenerateListingOutputSchema>;

// Schemas for Generate Market Report
export const GenerateMarketReportInputSchema = z.object({
  location: z.string().describe('The city or neighborhood for the report.'),
  propertyType: z.string().describe('The specific property type to focus on (e.g., "luxury condos").'),
  reportType: z.enum(['Investor', 'Home Buyer', 'Seller']).describe('The target audience for the report.'),
});
export type GenerateMarketReportInput = z.infer<typeof GenerateMarketReportInputSchema>;

export const GenerateMarketReportOutputSchema = z.object({
  reportTitle: z.string().describe('A compelling title for the report.'),
  executiveSummary: z.string().describe('A brief, high-level summary of the key findings.'),
  marketTrends: z.array(z.object({
    trend: z.string().describe('A specific market trend.'),
    analysis: z.string().describe('A brief analysis of the trend and its impact.'),
  })).describe('A list of current market trends and their analysis.'),
  pricingAnalysis: z.string().describe('An analysis of current pricing, including average prices and recent changes.'),
  futureOutlook: z.string().describe('A forward-looking statement on what to expect in the coming months.'),
});
export type GenerateMarketReportOutput = z.infer<typeof GenerateMarketReportOutputSchema>;

