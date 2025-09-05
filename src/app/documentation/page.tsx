
import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, GitBranch, Cpu, Component, Wind, BrainCircuit } from 'lucide-react';

const technologies = [
  {
    name: 'Next.js',
    description: 'The application is built using the Next.js App Router for optimal performance, server-side rendering, and a modern React framework.',
    icon: <Component className="h-8 w-8" />,
  },
  {
    name: 'Tailwind CSS & ShadCN UI',
    description: 'Styling is handled by Tailwind CSS for utility-first design, with a component library built on top of ShadCN UI for a consistent and professional look and feel.',
    icon: <Wind className="h-8 w-8" />,
  },
  {
    name: 'Genkit & Google AI',
    description: 'All AI capabilities are powered by Genkit, an open-source framework from Google that simplifies building production-ready AI flows, integrated with Gemini models.',
    icon: <BrainCircuit className="h-8 w_8" />,
  },
];

const aiFlows = [
  {
    name: 'generateAdFromBrochure',
    description: 'This flow generates compelling ad copy and a visually appealing ad design based on a project brochure and branding guidelines.',
    inputSchema: `
const GenerateAdFromBrochureInputSchema = z.object({
  brochureDataUri: z.string().describe("..."),
  additionalInformation: z.string().optional().describe("..."),
  focusArea: z.string().describe("..."),
  toneOfVoice: z.string().describe("The desired tone of voice..."),
});
    `,
    outputSchema: `
const GenerateAdFromBrochureOutputSchema = z.object({
  adCopy: z.string().describe("The generated ad copy."),
  adDesign: z.string().describe("The data URI of the generated ad design."),
  landingPage: z.string().describe("The data URI of the generated landing page."),
});
    `,
  },
  {
    name: 'generateLandingPage',
    description: 'AI flow to generate a landing page for a specific project based on project details and user branding.',
    inputSchema: `
const GenerateLandingPageInputSchema = z.object({
  projectName: z.string().describe("The name of the project."),
  projectDetails: z.string().describe("Detailed information..."),
  brandingStyle: z.string().describe("The chosen visual style..."),
  projectBrochureDataUri: z.string().optional().describe("..."),
  inspirationImageDataUri: z.string().optional().describe("..."),
});
    `,
    outputSchema: `
const GenerateLandingPageOutputSchema = z.object({
  landingPageHtml: z.string().describe("The generated HTML..."),
});
    `,
  },
  {
    name: 'generateSocialPost',
    description: 'AI flow to generate social media posts from a given topic or URL, including hashtags and image suggestions.',
    inputSchema: `
const GenerateSocialPostInputSchema = z.object({
  source: z.string().describe("A URL or topic..."),
  platform: z.string().describe("The social media platform..."),
  tone: z.string().describe("The desired tone of voice..."),
});
    `,
    outputSchema: `
const GenerateSocialPostOutputSchema = z.object({
  postContent: z.string().describe("The generated post content."),
  hashtags: z.array(z.string()).describe("Relevant hashtags."),
  imageSuggestion: z.string().describe("Suggestion for an image."),
});
    `,
  },
  {
    name: 'rebrandBrochure',
    description: 'This flow takes an existing brochure and applies a new brand identity to it, including contact details, a company logo (generating one if not provided), and brand-specific tone and colors.',
    inputSchema: `
const RebrandBrochureInputSchema = z.object({
  brochureDataUri: z.string().describe("..."),
  contactDetails: z.string().describe("The contact details..."),
  companyName: z.string().describe("The name of the company."),
  companyLogoDataUri: z.string().optional().describe("..."),
  toneOfVoice: z.string().describe("The desired tone of voice..."),
  colors: z.string().describe("The desired colors..."),
});
    `,
    outputSchema: `
const RebrandBrochureOutputSchema = z.object({
  rebrandedBrochureDataUri: z.string().describe("..."),
  logoDataUri: z.string().optional().describe("..."),
});
    `,
  },
  {
    name: 'suggestTargetingOptions',
    description: 'This flow provides a detailed list of targeting options, including demographics, interests, behaviors, and keywords, to help optimize ad campaigns for real estate projects.',
    inputSchema: `
const SuggestTargetingOptionsInputSchema = z.object({
  location: z.string().describe("The target city..."),
  propertyType: z.string().describe("The type of property..."),
  priceRange: z.object({ min: z.number(), max: z.number() }).describe("..."),
  amenities: z.array(z.string()).describe("A list of key property amenities."),
  ageRange: z.object({ min: z.number(), max: z.number() }).describe("..."),
  incomeLevel: z.string().describe("The income level..."),
  interests: z.array(z.string()).describe("A list of interests..."),
});
    `,
    outputSchema: `
const SuggestTargetingOptionsOutputSchema = z.object({
  suggestedTargetingOptions: z.string().describe("..."),
});
    `,
  },
    {
    name: 'editPdf',
    description: 'This flow takes a source PDF, a set of instructions, and optional new images, and returns a new, edited PDF.',
    inputSchema: `
const EditPdfInputSchema = z.object({
  sourcePdf: z.string().describe("The source PDF document..."),
  editInstructions: z.string().describe("The instructions for editing..."),
  newImages: z.array(z.string()).optional().describe("Optional new images..."),
});
    `,
    outputSchema: `
const EditPdfOutputSchema = z.object({
  editedPdfDataUri: z.string().describe("The edited PDF document..."),
});
    `,
  },
  {
    name: 'matchInvestors',
    description: 'An AI flow to match investment properties with suitable clients from a database, providing a ranked list with justifications.',
    inputSchema: `
const MatchInvestorsInputSchema = z.object({
  clientDatabase: z.string().describe("..."),
  propertyType: z.string().describe("e.g., Duplex, Commercial"),
  location: z.string().describe("The location of the property."),
  price: z.number().describe("The asking price."),
  capRate: z.number().describe("The capitalization rate."),
  investmentThesis: z.string().describe("..."),
  keyFeatures: z.string().describe("Key selling points..."),
});
    `,
    outputSchema: `
const MatchInvestorsOutputSchema = z.object({
  matches: z.array(
    z.object({
      name: z.string().describe("..."),
      email: z.string().email().describe("..."),
      matchScore: z.number().describe("Score from 0 to 100."),
      reasoning: z.string().describe("Explanation for the match."),
    })
  ),
});
    `,
  },
];


const CodeBlock = ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-gray-800/50 text-white p-4 rounded-lg text-sm overflow-x-auto">
      <code>{children}</code>
    </pre>
);


export default function DocumentationPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
            Suite Documentation
          </h1>
          <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto">
            A technical overview of the technologies and AI flows that power the Super Seller Suite.
          </p>
        </div>

        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {technologies.map((tech) => (
              <Card key={tech.name} className="bg-card/50 backdrop-blur-lg border-primary/10">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-lg">{tech.icon}</div>
                  <CardTitle className="text-2xl">{tech.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">{tech.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">AI Flows</h2>
          <div className="space-y-12">
            {aiFlows.map((flow) => (
              <Card key={flow.name} className="bg-card/50 backdrop-blur-lg border-primary/10 overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                    <GitBranch />
                    {flow.name}
                  </CardTitle>
                  <p className="text-foreground/70 pt-2">{flow.description}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground/90">Input Schema</h3>
                    <CodeBlock>{flow.inputSchema.trim()}</CodeBlock>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground/90">Output Schema</h3>
                    <CodeBlock>{flow.outputSchema.trim()}</CodeBlock>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
