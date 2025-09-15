

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
  developerLogoUrl?: string;
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

// Main Orchestrator Flow
export const MainOrchestratorInput = z.object({
  command: z.string(),
});
export type MainOrchestratorInput = z.infer<typeof MainOrchestratorInput>;

export const MainOrchestratorOutput = z.object({
  inferred_persona: z.string(),
  content_blocks: z.array(z.any()),
});
export type MainOrchestratorOutput = z.infer<typeof MainOrchestratorOutput>;


// Simplified Execution Step for Client-side
export interface ExecutionStep {
  description: string;
  tool: string;
  status: 'pending' | 'running' | 'complete' | 'error';
}

export interface RollflowPlan {
  title: string;
  steps: ExecutionStep[];
}


// Schemas for AI Brand Creator
export const AIBrandCreatorInputSchema = z.object({
  command: z.string().describe('The command from the user.'),
  documents: z
    .array(z.string())
    .describe(
      "An array of documents (e.g., PDFs, text files, images) as data URIs. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
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


// Schemas for Evaluate Lead as Buyer
export const EvaluateLeadAsBuyerInputSchema = z.object({
  lead: z.object({
    name: z.string(),
    location: z.string().optional(),
    summary: z.string().optional(),
    company: z.string().optional(),
    role: z.string().optional(),
  }).describe("The enriched lead data to evaluate."),
});
export type EvaluateLeadAsBuyerInput = z.infer<typeof EvaluateLeadAsBuyerInputSchema>;

export const EvaluateLeadAsBuyerOutputSchema = z.object({
  estimatedBudget: z.string().describe("The estimated budget range for a property purchase (e.g., '$500K - $750K')."),
  propertyPreferences: z.array(z.string()).describe("A list of 2-3 likely property types or styles the lead would be interested in."),
  primaryMotivation: z.string().describe("The most likely motivation for the purchase (e.g., 'Primary Residence', 'Investment')."),
  profileSummary: z.string().describe("A 1-2 sentence summary of the lead as a real estate client."),
});
export type EvaluateLeadAsBuyerOutput = z.infer<typeof EvaluateLeadAsBuyerOutputSchema>;


// Schemas for AI Video Presenter
export const GenerateVideoPresenterInputSchema = z.object({
  characterImageUri: z.string().optional().describe("A data URI of a pre-existing character image. If not provided, a new character will be generated based on the description."),
  characterDescription: z.string().optional().describe("A text description to generate a new character image if no image URI is provided."),
  script: z.string().describe("The script for the presenter to speak."),
});
export type GenerateVideoPresenterInput = z.infer<typeof GenerateVideoPresenterInputSchema>;


export const GenerateVideoPresenterOutputSchema = z.object({
  videoUrl: z.string().describe("A data URI of the generated presenter video, in mp4 format."),
  audioDataUri: z.string().describe("A data URI of the generated speech audio, in mp3 or wav format."),
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

// Schemas for Keyword Planner
export const GenerateKeywordPlanInputSchema = z.object({
  topic: z.string().describe('The central topic or product for the keyword plan (e.g., "luxury villas in Dubai Hills").'),
  targetLocation: z.string().describe('The geographical target for the ads (e.g., "Dubai, UAE").'),
});
export type GenerateKeywordPlanInput = z.infer<typeof GenerateKeywordPlanInputSchema>;


const KeywordSchema = z.object({
    keyword: z.string().describe('The specific keyword phrase.'),
    matchType: z.enum(['Broad', 'Phrase', 'Exact']).describe('The match type for the keyword.'),
    monthlySearches: z.number().describe('An estimated monthly search volume.'),
    competition: z.enum(['Low', 'Medium', 'High']).describe('The estimated competition level.'),
});

const AdGroupSchema = z.object({
    adGroupName: z.string().describe('The logical name for the ad group (e.g., "Branded Terms", "Location-Based Search").'),
    keywords: z.array(KeywordSchema).describe('A list of keywords belonging to this ad group.'),
});

export const GenerateKeywordPlanOutputSchema = z.object({
  planTitle: z.string().describe('A descriptive title for the overall keyword plan.'),
  adGroups: z.array(AdGroupSchema).describe('A list of logically grouped ad groups with their keywords.'),
  negativeKeywords: z.array(z.string()).describe('A list of recommended negative keywords to exclude.'),
});
export type GenerateKeywordPlanOutput = z.infer<typeof GenerateKeywordPlanOutputSchema>;

// Schemas for Landing Page Generator
export const GenerateLandingPageInputSchema = z.object({
  projectName: z.string().describe('The name of the project.'),
  projectDetails: z
    .string()
    .describe('Detailed information about the project.'),
  brandingStyle: z
    .string()
    .optional()
    .describe(
      'A comma-separated string of chosen visual styles for the landing page (e.g., "Modern & Minimalist, Luxury & Elegant").'
    ),
  numberOfSections: z.number().min(2).max(5).optional().describe('The number of content sections to generate (2-5).'),
  projectBrochureDataUri: z
    .string()
    .optional()
    .describe(
      "A project brochure, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  generateHeadlinesOnly: z.boolean().optional().describe('If true, only generate headline strategies.'),
  selectedHeadline: z.string().optional().describe('The headline from the user-selected strategy.'),
  selectedCta: z.string().optional().describe('The call-to-action from the user-selected strategy.'),
});
export type GenerateLandingPageInput = z.infer<
  typeof GenerateLandingPageInputSchema
>;

export const GenerateLandingPageOutputSchema = z.object({
  landingPageHtml: z
    .string()
    .optional()
    .describe('The generated HTML content for the landing page.'),
  headlineOptions: z.array(z.object({
      id: z.string(),
      strategy: z.string().describe('The name of the strategy (e.g., "Urgency Focused").'),
      headline: z.string().describe('The suggested headline.'),
      cta: z.string().describe('The suggested call to action text.'),
  })).optional(),
});
export type GenerateLandingPageOutput = z.infer<
  typeof GenerateLandingPageOutputSchema
>;

// Schemas for Multi-Offer Generator
export const GenerateMultiOfferInputSchema = z.object({
  properties: z.string().describe('A list of property addresses, one per line.'),
  clientInfo: z.string().describe('Basic information about the client (e.g., name, budget).'),
  terms: z.string().describe('Key offer terms to include for comparison.'),
});
export type GenerateMultiOfferInput = z.infer<typeof GenerateMultiOfferInputSchema>;

export const GenerateMultiOfferOutputSchema = z.object({
  offerPackageDataUri: z
    .string()
    .describe(
      "The generated offer comparison PDF, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateMultiOfferOutput = z.infer<typeof GenerateMultiOfferOutputSchema>;

// Schemas for Payment Plan Generator
export const GeneratePaymentPlanInputSchema = z.object({
  projectId: z
    .string()
    .describe('The ID of the project from the user\'s library.'),
  totalPrice: z.number().positive().describe('The total price of the property in AED.'),
  planType: z
    .string()
    .describe(
      'The desired structure of the payment plan (e.g., "Standard", "Post-Handover").'
    ),
});
export type GeneratePaymentPlanInput = z.infer<
  typeof GeneratePaymentPlanInputSchema
>;

const MilestoneSchema = z.object({
  milestone: z.string().describe('The name of the payment milestone (e.g., "Down Payment", "On Handover").'),
  date: z.string().describe('The estimated date for the payment (e.g., "On Booking", "Dec 2025").'),
  amount: z.number().describe('The amount due for this milestone in AED.'),
  percentage: z.string().describe('The percentage of the total price for this milestone (e.g., "10%").'),
});

export const GeneratePaymentPlanOutputSchema = z.object({
  planName: z.string().describe('A descriptive name for the generated plan.'),
  planDescription: z
    .string()
    .describe('A brief, client-friendly description of how the plan works.'),
  milestones: z
    .array(MilestoneSchema)
    .describe('A list of the payment milestones.'),
});
export type GeneratePaymentPlanOutput = z.infer<
  typeof GeneratePaymentPlanOutputSchema
>;


// Schemas for Reel Generator
export const GenerateReelInputSchema = z.object({
  projectId: z.string().describe('The ID of the project to use for assets.'),
  sellingPoints: z.string().describe('Key selling points for text overlays, separated by newlines.'),
  vibe: z.string().describe('The desired vibe for the reel, influencing music and editing style.'),
});
export type GenerateReelInput = z.infer<typeof GenerateReelInputSchema>;

export const GenerateReelOutputSchema = z.object({
  reelVideoDataUri: z
    .string()
    .describe(
      "The generated reel video, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateReelOutput = z.infer<typeof GenerateReelOutputSchema>;

// Schemas for Social Post Generator
export const GenerateSocialPostInputSchema = z.object({
  topic: z
    .string()
    .describe('A topic or theme to generate the social media posts from.'),
  platform: z
    .string()
    .describe(
      'The social media platform (e.g., Twitter, LinkedIn, Facebook).'
    ),
  tone: z.string().describe('The desired tone of voice for the post.'),
  dataStore: z.string().describe("The data store ID to use as a knowledge source."),
});
export type GenerateSocialPostInput = z.infer<
  typeof GenerateSocialPostInputSchema
>;

export const GenerateSocialPostOutputSchema = z.object({
  posts: z.array(z.object({
    day: z.string().describe("The day of the week for the post (e.g., 'Monday')."),
    theme: z.string().describe("The theme for the day's post (e.g., 'Market Insight')."),
    postContent: z.string().describe('The generated social media post content for that day.'),
    imageSuggestion: z.string().describe('A suggestion for an accompanying image for that day\'s post.'),
  })).describe("A list of posts for a 7-day week."),
  hashtagStrategy: z.object({
    primary: z.array(z.string()).describe("5-7 primary, high-volume hashtags."),
    secondary: z.array(z.string()).describe("5-7 secondary, niche-specific hashtags."),
    location: z.array(z.string()).describe("3-5 location-based hashtags."),
  }).describe("A comprehensive hashtag strategy."),
});
export type GenerateSocialPostOutput = z.infer<
  typeof GenerateSocialPostOutputSchema
>;

// Schemas for Story Generator
export const GenerateStoryInputSchema = z.object({
  projectId: z.string().describe('The ID of the project to use for photo assets.'),
  vibe: z.string().describe('The desired vibe for the story (e.g., "Modern", "Luxury").'),
  callToAction: z.string().describe('The call to action text for the end of the story.'),
});
export type GenerateStoryInput = z.infer<typeof GenerateStoryInputSchema>;

export const GenerateStoryOutputSchema = z.object({
  storyVideoDataUri: z
    .string()
    .describe(
      "The generated story video, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateStoryOutput = z.infer<typeof GenerateStoryOutputSchema>;

// Schemas for TikTok Video Generator
export const GenerateTikTokVideoInputSchema = z.object({
  projectId: z.string().describe('The ID of the project to use for visual assets.'),
  sound: z.string().describe('The trending sound or vibe to use for the video.'),
  textOverlays: z.string().describe('Engaging text to overlay on the video, separated by newlines.'),
});
export type GenerateTikTokVideoInput = z.infer<typeof GenerateTikTokVideoInputSchema>;

export const GenerateTikTokVideoOutputSchema = z.object({
  tiktokVideoDataUri: z
    .string()
    .describe(
      "The generated TikTok video, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateTikTokVideoOutput = z.infer<typeof GenerateTikTokVideoOutputSchema>;

// Schemas for CRM Memory Getter
export const GetCrmMemoryInputSchema = z.object({
  clientName: z.string().describe('The name of the client to query.'),
  query: z.string().describe('The specific question about the client.'),
});
export type GetCrmMemoryInput = z.infer<typeof GetCrmMemoryInputSchema>;

export const GetCrmMemoryOutputSchema = z.object({
  summary: z
    .string()
    .describe('A summary of the requested information about the client.'),
  confidenceScore: z
    .number()
    .describe(
      'A score from 0 to 1 indicating how confident the AI is in the answer based on the available (but unseen) data.'
    ),
});
export type GetCrmMemoryOutput = z.infer<typeof GetCrmMemoryOutputSchema>;

// Schemas for Market Trends Getter
export const GetMarketTrendsInputSchema = z.object({
  topic: z.string().describe('The real estate topic to analyze (e.g., "Dubai rental yields").'),
});
export type GetMarketTrendsInput = z.infer<typeof GetMarketTrendsInputSchema>;

export const GetMarketTrendsOutputSchema = z.object({
  overallSentiment: z.string().describe('A summary of the general market sentiment on the topic (e.g., "Optimistic," "Cautious").'),
  emergingTrends: z.array(z.object({
    trend: z.string().describe('A specific emerging trend.'),
    description: z.string().describe('A brief description of the trend and its potential impact.'),
  })).describe('A list of 2-4 key emerging trends identified from the sources.'),
  futureOutlook: z.string().describe('A forward-looking statement on what to expect in the coming months.'),
});
export type GetMarketTrendsOutput = z.infer<typeof GetMarketTrendsOutputSchema>;

// Schemas for Social Page Manager
export const ManageSocialPageInputSchema = z.object({
  task: z
    .string()
    .describe(
      'The management task to perform (e.g., "Draft 3 engaging replies to a comment asking about price", "Create a content schedule for next week").'
    ),
  context: z
    .string()
    .optional()
    .describe(
      'Any relevant context, such as the text of a comment or the topic for a content schedule.'
    ),
});
export type ManageSocialPageInput = z.infer<typeof ManageSocialPageInputSchema>;

export const ManageSocialPageOutputSchema = z.object({
  status: z.string().describe('A status update on the performed task.'),
  result: z
    .string()
    .describe(
      'The output of the task, such as drafted replies or a content schedule.'
    ),
});
export type ManageSocialPageOutput = z.infer<typeof ManageSocialPageOutputSchema>;

// Schemas for WhatsApp Campaign Manager
export const ManageWhatsAppCampaignInputSchema = z.object({
  contactsDataUri: z
    .string()
    .describe(
      "A CSV of contacts, as a data URI. It must include 'name' and 'phone' columns."
    ),
  campaignType: z
    .string()
    .describe(
      'The type of campaign (e.g., "New Listing Announcement", "Open House Follow-up").'
    ),
  context: z
    .string()
    .describe(
      'Provide the necessary context, like the property name or open house date.'
    ),
});
export type ManageWhatsAppCampaignInput = z.infer<
  typeof ManageWhatsAppCampaignInputSchema
>;

export const ManageWhatsAppCampaignOutputSchema = z.object({
  status: z
    .string()
    .describe(
      'A status update on the campaign (e.g., "Message template generated and ready to send").'
    ),
  messageTemplate: z
    .string()
    .describe(
      'The generated, personalized message template. Use [Name] to represent the contact\'s name.'
    ),
});
export type ManageWhatsAppCampaignOutput = z.infer<
  typeof ManageWhatsAppCampaignOutputSchema
>;

// Schemas for Investor Matcher
export const MatchInvestorsInputSchema = z.object({
  clientDatabase: z
    .string()
    .describe(
      "A client database, as a data URI (likely CSV) that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  propertyType: z
    .string()
    .describe('The type of property (e.g., Duplex, Commercial).'),
  location: z.string().describe('The location of the property.'),
  price: z.number().describe('The asking price of the property.'),
  capRate: z.number().describe('The capitalization rate of the property.'),
  investmentThesis: z
    .string()
    .describe(
      'The primary strategy for this investment (e.g., Value-Add, Turnkey Rental).'
    ),
  keyFeatures: z
    .string()
    .describe('Key features or selling points of the property for investors.'),
});
export type MatchInvestorsInput = z.infer<typeof MatchInvestorsInputSchema>;

export const MatchInvestorsOutputSchema = z.object({
  matches: z.array(
    z.object({
      name: z.string().describe('The name of the matched investor.'),
      email: z.string().email().describe('The email of the matched investor.'),
      matchScore: z
        .number()
        .describe(
          'A score from 0 to 100 indicating the strength of the match.'
        ),
      reasoning: z
        .string()
        .describe(
          'A brief explanation for why this investor is a good match.'
        ),
    })
  ),
});
export type MatchInvestorsOutput = z.infer<typeof MatchInvestorsOutputSchema>;

// Schemas for Brochure Translator
export const TranslateBrochureInputSchema = z.object({
  brochureDataUri: z
    .string()
    .describe(
      "The source brochure document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  targetLanguage: z
    .string()
    .describe('The language to translate the brochure into (e.g., "Arabic", "Chinese").'),
});
export type TranslateBrochureInput = z.infer<typeof TranslateBrochureInputSchema>;

export const TranslateBrochureOutputSchema = z.object({
  translatedBrochureDataUri: z
    .string()
    .describe(
      "The translated brochure document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type TranslateBrochureOutput = z.infer<typeof TranslateBrochureOutputSchema>;

// Schemas for Edit YouTube Video
export const EditYouTubeVideoInputSchema = z.object({
  sourceVideo: z
    .string()
    .describe(
      "The source video file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  editingInstructions: z
    .string()
    .describe('The general instructions for editing the video (e.g., style, music, goal).'),
  deepEditInstructions: z
    .string()
    .optional()
    .describe('Optional specific instructions for fine-tuning the video (e.g., timestamps, text overlays).'),
});
export type EditYouTubeVideoInput = z.infer<typeof EditYouTubeVideoInputSchema>;

export const EditYouTubeVideoOutputSchema = z.object({
  editedVideoDataUri: z
    .string()
    .describe(
      "The edited video file, as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type EditYouTubeVideoOutput = z.infer<typeof EditYouTubeVideoOutputSchema>;

// Schemas for VM Creator
export const CreateVmInputSchema = z.object({
  instanceName: z.string().describe('The name for the new VM instance.'),
  zone: z.string().describe('The GCP zone to create the instance in, e.g., "us-central1-c".'),
  machineType: z.string().describe('The machine type, e.g., "e2-medium".'),
  sourceImageFamily: z.string().describe('The source image family, e.g., "debian-12".'),
  diskSizeGb: z.number().describe('The size of the boot disk in GB.'),
});
export type CreateVmInput = z.infer<typeof CreateVmInputSchema>;

export const CreateVmOutputSchema = z.object({
  success: z.boolean().describe("Whether the VM creation was successful."),
  message: z.string().describe("A summary message of the result."),
  instanceName: z.string().optional().describe("The name of the created instance."),
  selfLink: z.string().url().optional().describe("The self-link of the created instance."),
});
export type CreateVmOutput = z.infer<typeof CreateVmOutputSchema>;

// Schemas for UGC Script Writer
export const GenerateUgcScriptInputSchema = z.object({
  productDescription: z.string().describe('A detailed description of the product to create a script for.'),
});
export type GenerateUgcScriptInput = z.infer<typeof GenerateUgcScriptInputSchema>;

const UgcSceneSchema = z.object({
  "Scene-Name": z.string(),
  "Original-Script": z.string(),
  "New-Script": z.string(),
});

export const GenerateUgcScriptOutputSchema = z.object({
  "Concept-Name": z.string(),
  "Script": z.array(UgcSceneSchema),
});
export type GenerateUgcScriptOutput = z.infer<typeof GenerateUgcScriptOutputSchema>;

// Schemas for Price Estimator
export const EstimatePriceInputSchema = z.object({
    location: z.string().min(1, { message: 'Location is required.' }).describe("The neighborhood or area of the property."),
    propertyType: z.string({ required_error: 'Property type is required.' }).min(1, { message: 'Property type is required.' }).describe("The type of property (e.g., 'Apartment', 'Villa')."),
    bedrooms: z.number().int().min(0, { message: 'Bedrooms must be 0 or more.' }).describe("The number of bedrooms."),
    bathrooms: z.number().int().min(1, { message: 'Bathrooms must be 1 or more.' }).describe("The number of bathrooms."),
    squareFootage: z.number().positive({ message: 'Square footage must be a positive number.' }).describe("The total area in square feet."),
    age: z.number().int().min(0, { message: 'Age must be 0 or more.' }).describe("The age of the property in years."),
    condition: z.string({ required_error: 'Condition is required.' }).min(1, { message: 'Condition is required.' }).describe("The condition of the property (e.g., 'New', 'Upgraded', 'Standard')."),
});
export type EstimatePriceInput = z.infer<typeof EstimatePriceInputSchema>;

export const EstimatePriceOutputSchema = z.object({
    estimatedPrice: z.number().describe("The AI-estimated market value of the property in AED."),
    confidenceRange: z.object({
        lowerBound: z.number(),
        upperBound: z.number(),
    }).describe("The likely price range for the property."),
    comparableSales: z.array(z.string()).describe("A list of 2-3 fictional but realistic comparable sales used for the estimation."),
});
export type EstimatePriceOutput = z.infer<typeof EstimatePriceOutputSchema>;

// Schemas for generate-keyword-plan
export const GenerateKeywordPlanOutput = z.object({
  planTitle: z.string(),
  adGroups: z.array(
    z.object({
      adGroupName: z.string(),
      keywords: z.array(
        z.object({
          keyword: z.string(),
          matchType: z.string(),
          monthlySearches: z.number(),
          competition: z.string(),
        })
      ),
    })
  ),
  negativeKeywords: z.array(z.string()),
});
export type GenerateKeywordPlanOutput = z.infer<
  typeof GenerateKeywordPlanOutput
>;


// Schemas for Analyze Content Quality
export const AnalyzeContentQualityInputSchema = z.object({
  sourceUrl: z.string().url().describe("The original URL the content was scraped from."),
  content: z.string().describe("The text content of the webpage."),
});
export type AnalyzeContentQualityInput = z.infer<typeof AnalyzeContentQualityInputSchema>;

export const AnalyzeContentQualityOutputSchema = z.object({
  isHighQuality: z.boolean().describe("A simple boolean indicating if the content is high-quality."),
  contentType: z.enum(['Article', 'Blog Post', 'Forum', 'Listing', 'Company Page', 'Other']).describe("The detected type of content."),
  relevanceScore: z.number().min(0).max(1).describe("A score from 0-1 indicating relevance to the real estate domain."),
  trustworthinessScore: z.number().min(0).max(1).describe("A score from 0-1 indicating the trustworthiness of the content."),
  reasoning: z.string().describe("A brief explanation for the scores and quality assessment."),
});
export type AnalyzeContentQualityOutput = z.infer<typeof AnalyzeContentQualityOutputSchema>;

// Schemas for Lease Reviewer
export const ReviewLeaseAgreementInputSchema = z.object({
  leaseDocumentUri: z.string().describe("The lease document as a data URI."),
  userConcerns: z.array(z.string()).describe("A list of specific user concerns to check for in the lease."),
});
export type ReviewLeaseAgreementInput = z.infer<typeof ReviewLeaseAgreementInputSchema>;

export const ReviewLeaseAgreementOutputSchema = z.object({
  summary: z.string().describe("A high-level summary of the lease agreement's key terms."),
  findings: z.array(
    z.object({
      concern: z.string().describe("The user's original concern."),
      clause: z.string().describe("The exact clause from the lease that addresses the concern."),
      explanation: z.string().describe("A plain-English explanation of what the clause means."),
      riskLevel: z.enum(['Low', 'Medium', 'High', 'Informational']).describe("The assessed risk level associated with this clause."),
    })
  ).describe("A list of findings related to the user's concerns."),
});
export type ReviewLeaseAgreementOutput = z.infer<typeof ReviewLeaseAgreementOutputSchema>;
