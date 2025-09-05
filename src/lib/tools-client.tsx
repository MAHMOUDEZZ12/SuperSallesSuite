
import React from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Bot,
  FileUp,
  LayoutTemplate,
  Palette,
  Target,
  Share2,
  Sparkles,
  Clock,
  Briefcase,
  PenTool,
  MessageCircle,
  Mail,
  Wallet,
  MapPin,
  ClipboardList,
  FilePlus,
  Network,
  Building,
  Video,
  FileText,
  Search,
  Contact,
  UserPlus,
  Film,
  UserCog,
  Database,
  Clapperboard,
  Link as LinkIcon,
  Users2,
  Clock2,
  BadgeCheck,
  Phone,
  Upload,
  Copy,
  Download,
  Binoculars,
  LineChart,
  BrainCircuit,
  Upload as UploadIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const fileToDataUri = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const filesToDataUris = (files: FileList | null): Promise<string[]> => {
    if (!files) return Promise.resolve([]);
    return Promise.all(Array.from(files).map(fileToDataUri));
};

const copyToClipboard = (text: string, toast: any) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: "The text has been copied successfully.",
    });
};

export type Field = {
  id: string;
  name: string;
  type: 'text' | 'file' | 'textarea' | 'select' | 'button' | 'number' | 'group-header';
  placeholder?: string;
  description: string;
  options?: string[];
  multiple?: boolean;
  cta?: string;
};

export type FilterCategory = 'All' | 'Lead Gen' | 'Creative' | 'Sales Tools' | 'Social & Comms' | 'Web' | 'Editing' | 'Ads' | 'Marketing' | 'Reports';

export type Feature = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactElement;
  color: string;
  cta: string;
  categories: FilterCategory[];
  mindMapCategory: 'Marketing' | 'Creative Suite' | 'Sales Enablement' | 'Core Intelligence';
  badge?: 'NEW' | 'BETA';
  details: {
    faqs: { question: string; answer: string }[];
    synergy: { tool: string; benefit: string }[];
  };
  creationFields: Field[];
  flowRunner?: (data: any) => Promise<any>;
  renderResult?: (result: any, toast: any) => React.ReactNode;
};

const mockProjects = [
    'Azure Lofts Campaign',
    'Maple Creek Development',
    'Oceanview Villas',
    'Add New Project...',
];

export const tools: Feature[] = [
  {
    id: 'ad-creation',
    title: 'AI Ad Creator',
    description: 'Turn any brochure into scroll-stopping ads.',
    icon: <Target />,
    color: '#ec4899', // pink-500
    cta: 'Ad',
    categories: ['Marketing', 'Ads'],
    mindMapCategory: 'Marketing',
    badge: 'NEW',
    renderResult: (result, toast) => (
       <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">Ad Copy</h3>
            <div className="p-4 bg-muted rounded-md relative group">
              <p className="whitespace-pre-wrap">{result.adCopy}</p>
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100" onClick={() => copyToClipboard(result.adCopy, toast)}><Copy className="h-4 w-4" /></Button>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Ad Design</h3>
            <Image src={result.adDesign} alt="Generated ad design" width={500} height={500} className="rounded-lg border" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Landing Page Preview</h3>
            <Image src={result.landingPage} alt="Generated landing page" width={500} height={500} className="rounded-lg border" />
          </div>
        </div>
    ),
    details: {
       synergy: [
        { tool: "Precision Targeting", benefit: "Ensure your perfect ads are seen by people ready to buy." },
        { tool: "AI Page Admin", benefit: "Deploy your new ad across social channels to maximize reach." }
      ],
       faqs: [
        { question: "What formats are supported?", answer: "You can upload standard PDF brochures. The AI works best with text-based PDFs." },
        { question: "Where are files saved?", answer: "All generated ads and source files are saved to your private Storage, under the selected Project." },
        { question: "What are the limits?", answer: "Your plan includes a specific number of AI generation credits per month. Each ad counts as one generation." },
      ],
    },
    creationFields: [
      { id: 'brochureDataUri', name: 'Developer Brochure', type: 'file', description: 'Upload the original PDF.' },
      { id: 'focusArea', name: 'Ad Focus', type: 'select', options: ['Luxury & Prestige', 'Family-Friendly', 'Investment Opportunity', 'Modern & Urban', 'First-Time Buyer'], placeholder: 'Select the ad\'s main angle', description: 'What key aspect should the ad highlight?' },
      { id: 'toneOfVoice', name: 'Tone of Voice', type: 'select', options: ['Professional', 'Exciting', 'Welcoming', 'Urgent', 'Sophisticated'], placeholder: 'Select a tone', description: 'Set the tone for the ad copy.' },
      { id: 'additionalInformation', name: 'Additional Information', type: 'textarea', placeholder: 'e.g., "Limited time offer: 2 years of condo fees waived."', description: 'Add any other key details or offers. (Optional)' },
    ],
  },
  {
    id: 'targeting',
    title: 'AI Precision Targeting',
    description: 'Find high-intent buyers before they search.',
    icon: <Binoculars />,
    color: '#3b82f6', // blue-600
    cta: 'Targeting Profile',
    categories: ['Marketing', 'Lead Gen', 'Ads'],
    mindMapCategory: 'Marketing',
    renderResult: (result, toast) => (
      <div>
        <h3 className="font-semibold text-lg mb-2">Suggested Targeting Options</h3>
          <div className="p-4 bg-muted rounded-md relative group">
            <p className="whitespace-pre-wrap">{result.suggestedTargetingOptions}</p>
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100" onClick={() => copyToClipboard(result.suggestedTargetingOptions, toast)}><Copy className="h-4 w-4" /></Button>
        </div>
      </div>
    ),
    details: {
      synergy: [
        { tool: "AI Ad Creator", benefit: "Design the perfect ad for the high-intent audience you've just identified." },
        { tool: "AI Social Writer", benefit: "Create organic posts that speak directly to the interests of your target persona." }
      ],
       faqs: [
        { question: "What platforms can I use these audiences on?", answer: "Our targeting suggestions are optimized for major platforms like Facebook, Instagram, and Google Ads. We provide you with the exact interests, demographics, and keywords to input." },
        { question: "How does the AI know who is a 'high-intent' buyer?", answer: "The AI analyzes anonymous data signals such as recent searches for mortgage calculators, activity in moving-related forums, and engagement with real estate content to identify users who are actively in the market." },
        { question: "Is this compliant with privacy regulations?", answer: "Yes. The system uses anonymized, aggregated data and adheres to all privacy regulations. It identifies audience *patterns* and *segments*, not individuals." }
      ],
    },
    creationFields: [
      { id: 'group-property', name: 'Property Details', type: 'group-header', description: 'Describe the property to be advertised.' },
      { id: 'location', name: 'Location', type: 'text', placeholder: 'e.g., "Downtown, Chicago"', description: 'Target city or neighborhood.' },
      { id: 'propertyType', name: 'Property Type', type: 'text', placeholder: 'e.g., "High-rise Condo"', description: 'Type of property being sold.' },
      { id: 'minPrice', name: 'Min Price', type: 'number', placeholder: 'e.g., 500000', description: 'Minimum property price.' },
      { id: 'maxPrice', name: 'Max Price', type: 'number', placeholder: 'e.g., 850000', description: 'Maximum property price.' },
      { id: 'amenities', name: 'Key Amenities', type: 'text', placeholder: 'e.g., Rooftop pool, Gym, Pet-friendly', description: 'List amenities, comma-separated.' },
      { id: 'group-audience', name: 'Audience Persona', type: 'group-header', description: 'Describe your ideal buyer.' },
      { id: 'minAge', name: 'Min Age', type: 'number', placeholder: 'e.g., 30', description: 'Minimum target age.' },
      { id: 'maxAge', name: 'Max Age', type: 'number', placeholder: 'e.g., 55', description: 'Maximum target age.' },
      { id: 'incomeLevel', name: 'Income Level', type: 'select', options: ["Starter", "Mid-Range", "High Earner", "Affluent", "Ultra-High-Net-Worth"], placeholder: 'Select income level', description: 'Financial status of the audience.' },
      { id: 'interests', name: 'Audience Interests', type: 'text', placeholder: 'e.g., Golf, Luxury Cars, Tech Startups', description: 'List interests, comma-separated.' },
    ],
  },
  {
    id: 'rebranding',
    title: 'One-Tap Rebrand',
    description: 'Swap logos, colors, contacts in one click.',
    icon: <Palette />,
    color: '#f97316', // orange-600
    cta: 'Rebranded Brochure',
    categories: ['Creative', 'Editing'],
    mindMapCategory: 'Creative Suite',
    renderResult: (result, toast) => (
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-2">Rebranded Brochure</h3>
          <a href={result.rebrandedBrochureDataUri} download="rebranded-brochure.pdf">
              <Button><Download className="mr-2 h-4 w-4"/>Download PDF</Button>
          </a>
        </div>
        {result.logoDataUri && (
           <div>
              <h3 className="font-semibold text-lg mb-2">Generated Logo</h3>
              <Image src={result.logoDataUri} alt="Generated logo" width={200} height={200} className="rounded-lg border bg-white p-2" />
           </div>
        )}
      </div>
    ),
    details: {
       synergy: [
        { tool: "AI Ad Creator", benefit: "Use your newly rebranded brochure to power an ad campaign." },
        { tool: "Landing Page Builder", benefit: "Generate a branded landing page that perfectly matches your rebranded brochure." }
      ],
       faqs: [
        { question: "What if I don't have a logo?", answer: "No problem. The tool can generate a professional logo for you based on your company name and brand colors, or simply add your name and contact information in a clean format." },
        { question: "Can it change the text to match my 'brand voice'?", answer: "Yes. You can specify a tone (e.g., 'professional,' 'friendly,' 'luxurious'), and the AI can subtly adjust headings and key phrases to align with your brand's voice." },
        { question: "Where are my brand assets saved?", answer: "Your logos, colors, and contact info are saved in your Brand & Assets kit, making them available for one-click use across all tools." },
      ],
    },
    creationFields: [
      { id: 'brochureDataUri', name: 'Developer Brochure', type: 'file', description: 'Upload the original PDF.' },
      { id: 'companyLogoDataUri', name: 'Your Logo', type: 'file', description: 'Upload your personal or company logo (PNG, JPG). Optional.' },
      { id: 'companyName', name: 'Company Name', type: 'text', placeholder: 'Your company name', description: 'Used for branding and generating a logo if needed.' },
      { id: 'contactDetails', name: 'Contact Details', type: 'textarea', placeholder: 'Your Name\nYour Phone\nYour Email', description: 'The contact info to place in the brochure.' },
      { id: 'toneOfVoice', name: 'Tone of Voice', type: 'select', options: ['Professional', 'Friendly', 'Luxury', 'Modern'], placeholder: 'Select a tone', description: 'The tone to use for any generated text.' },
      { id: 'colors', name: 'Colors', type: 'text', placeholder: 'e.g., "Blue and Gold"', description: 'The color scheme to use for rebranding.' },
    ],
  },
   {
    id: 'pdf-editor',
    title: 'Smart PDF Editor',
    description: 'Edit text, images, and layout with prompts.',
    icon: <PenTool />,
    color: '#eab308', // yellow-500
    cta: 'Edited PDF',
    categories: ['Creative', 'Editing'],
    mindMapCategory: 'Creative Suite',
    renderResult: (result, toast) => (
      <div className="space-y-6">
        <div>
            <h3 className="font-semibold text-lg mb-2">Edited PDF</h3>
            <a href={result.editedPdfDataUri} download="edited.pdf">
                <Button><Download className="mr-2 h-4 w-4"/>Download Edited PDF</Button>
            </a>
        </div>
    </div>
    ),
    details: {
      synergy: [
        { tool: "AI Rebranding", benefit: "After rebranding a brochure, use the editor to make final tweaks to pricing or contact info." },
        { tool: "Listing Generator", benefit: "Generate a new listing description and then use the editor to paste it into your existing brochure." }
      ],
       faqs: [
        { question: "Can it change complex layouts?", answer: "For best results, focus on targeted edits like text, images, and colors. While the AI can make layout adjustments, complex redesigns are better suited for the Landing Page Generator." },
        { question: "What if the PDF is just an image?", answer: "The AI's OCR (Optical Character Recognition) capabilities can often identify and replace text even in image-based PDFs, but results are best with text-based documents." },
        { question: "Where are files saved?", answer: "All generated PDFs and source files are saved to your private Storage, under the selected Project." },
      ],
    },
    creationFields: [
      { id: 'sourcePdf', name: 'Source PDF', type: 'file', description: 'Upload the PDF you want to edit.' },
      { id: 'editInstructions', name: 'Editing Instructions', type: 'textarea', placeholder: '- Change the main contact name to "Jane Smith".\n- Replace the hero image with the one I uploaded.\n- Update the completion date to "Fall 2025".', description: 'Be specific. The more detailed your command, the better the result.' },
      { id: 'newImages', name: 'New Images (Optional)', type: 'file', multiple: true, description: 'Only upload images if your instructions refer to them.' },
    ],
  },
  {
    id: 'landing-pages',
    title: 'Instant Landing Page',
    description: 'Launch a high-converting page in minutes.',
    icon: <LayoutTemplate />,
    color: '#22c55e', // green-500
    cta: 'Landing Page',
    categories: ['Marketing', 'Web'],
    mindMapCategory: 'Marketing',
    renderResult: (result, toast) => (
      <div>
          <h3 className="font-semibold text-lg mb-2">Landing Page HTML</h3>
          <div className="p-4 bg-muted rounded-md relative group">
            <pre className="whitespace-pre-wrap text-sm">{result.landingPageHtml}</pre>
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100" onClick={() => copyToClipboard(result.landingPageHtml, toast)}><Copy className="h-4 w-4" /></Button>
          </div>
      </div>
    ),
    details: {
      synergy: [
        { tool: "AI Social Writer", benefit: "Generate promotional posts to drive traffic to your new landing page." },
        { tool: "AI Ad Creator", benefit: "Run a targeted ad campaign that clicks through to your beautiful new page." }
      ],
       faqs: [
        { question: "Can I use my own domain name?", answer: "Yes, you can connect your own custom domain name to the landing pages you create, ensuring a fully branded experience for your visitors." },
        { question: "Are the landing pages mobile-friendly?", answer: "Absolutely. Every landing page generated is fully responsive and looks great on all devices, from desktops to smartphones." },
        { question: "Where are pages saved?", answer: "The generated HTML is saved to your Storage. You can then download it or deploy it to your hosting provider." }
      ],
    },
    creationFields: [
      { id: 'projectName', name: 'Project Name', type: 'text', placeholder: 'e.g., "Azure Lofts"', description: 'The name of the project or listing.' },
      { id: 'projectDetails', name: 'Project Details', type: 'textarea', placeholder: 'e.g., "Luxury condos in downtown Miami..."', description: 'A detailed description of the property.' },
      { id: 'brandingStyle', name: 'Branding Style', type: 'select', options: ["Modern & Minimalist", "Luxury & Elegant", "Cozy & Welcoming", "Bold & Colorful"], placeholder: 'Select a branding style', description: 'Describe the desired look and feel.' },
      { id: 'projectBrochureDataUri', name: 'Project Brochure (Optional)', type: 'file', description: 'Upload a brochure to provide more context.' },
      { id: 'inspirationImageDataUri', name: 'Inspiration Image (Optional)', type: 'file', description: 'Upload a screenshot of a website you like to guide the style.' },
    ],
  },
  {
    id: 'social-posts',
    title: 'Social Posts Week',
    description: "A week of posts from one link.",
    icon: <Share2 />,
    color: '#e11d48', // rose-600
    cta: 'Social Post',
    categories: ['Marketing', 'Social & Comms', 'Ads'],
    mindMapCategory: 'Marketing',
    badge: 'BETA',
    renderResult: (result, toast) => (
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-2">Post Content</h3>
           <div className="p-4 bg-muted rounded-md relative group">
              <p className="whitespace-pre-wrap">{result.postContent}</p>
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100" onClick={() => copyToClipboard(result.postContent, toast)}><Copy className="h-4 w-4" /></Button>
           </div>
        </div>
         <div>
          <h3 className="font-semibold text-lg mb-2">Hashtags</h3>
           <div className="p-4 bg-muted rounded-md relative group">
              <p>{result.hashtags.join(' ')}</p>
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100" onClick={() => copyToClipboard(result.hashtags.join(' '), toast)}><Copy className="h-4 w-4" /></Button>
           </div>
        </div>
         <div>
          <h3 className="font-semibold text-lg mb-2">Image Suggestion</h3>
          <p className="p-4 bg-muted rounded-md">{result.imageSuggestion}</p>
        </div>
      </div>
    ),
    details: {
      synergy: [
        { tool: "AI Page Admin", benefit: "Automatically schedule your newly generated posts for maximum engagement." },
        { tool: "Landing Page Builder", benefit: "Create a page for a new listing and then use this tool to generate promotional posts for it." }
      ],
       faqs: [
        { question: "What kind of topics work best?", answer: "You can use local market news, articles about home improvement, community events, or even just a property address. The more specific the source, the more tailored the content." },
        { question: "Can it generate an email newsletter?", answer: "Yes! You can specify 'Email Newsletter' as a platform, and the AI will generate subject lines, engaging body copy, and clear calls-to-action suitable for an email campaign." },
        { question: "Where are posts saved?", answer: "Generated content is saved in your Storage and can be exported to your social media scheduler." },
      ],
    },
    creationFields: [
      { id: 'source', name: 'Content Source', type: 'text', placeholder: 'Paste a URL or type a topic, e.g., "Market update for downtown"', description: 'The AI will use this as inspiration.' },
      { id: 'platform', name: 'Platform', type: 'select', options: ['Facebook', 'Instagram', 'LinkedIn', 'X (Twitter)', 'Email Newsletter'], placeholder: 'Select a platform', description: 'Tailor the posts for specific platforms.' },
      { id: 'tone', name: 'Tone of Voice', type: 'select', options: ['Professional', 'Friendly', 'Urgent', 'Humorous', 'Informative'], placeholder: 'Select a tone', description: 'Set the mood for your posts.' },
    ],
  },
  {
    id: 'story-designer',
    title: 'AI Story Designer',
    description: 'Animated stories, auto-branded.',
    icon: <Film />,
    color: '#a855f7', // fuchsia-500
    cta: 'Story',
    categories: ['Creative', 'Social & Comms'],
    mindMapCategory: 'Creative Suite',
    details: {
      synergy: [
        { tool: "AI Social Writer", benefit: "Get caption ideas for your story to make it even more engaging." },
        { tool: "AI Page Admin", benefit: "Schedule your new story to post at the perfect time for maximum views." }
      ],
       faqs: [
        { question: "Can I add music?", answer: "Yes. The AI suggests royalty-free music that matches the 'vibe' you select. You can also upload your own audio tracks." },
        { question: "Is my branding automatically added?", answer: "Yes, once you set up your brand kit with your logo and colors, the AI automatically incorporates them into every story design." },
        { question: "Where are stories saved?", answer: "Generated videos are saved to your Storage and can be downloaded as MP4 files." },
      ],
    },
    creationFields: [
      { id: 'project', name: 'Select Project', type: 'select', options: mockProjects, placeholder: 'Choose a project', description: 'The AI will use the photos from this project.' },
      { id: 'vibe', name: 'Story Vibe', type: 'select', options: ['Upbeat & Modern', 'Elegant & Luxurious', 'Cozy & Warm', 'Dramatic & Cinematic'], placeholder: 'Select a vibe', description: 'This influences music, text, and effects.' },
      { id: 'callToAction', name: 'Call to Action', type: 'select', options: ["Swipe Up for Tour", "DM for Info", "See Link in Bio", "New Listing Alert!", "Save This Post"], placeholder: 'Select a call to action', description: 'The final text prompt for viewers.' },
    ],
  },
  {
    id: 'reel-designer',
    title: 'AI Reel Designer',
    description: 'Reels from photos + auto-captions.',
    icon: <Clapperboard />,
    color: '#8b5cf6', // violet-500
    cta: 'Reel',
    categories: ['Creative', 'Social & Comms', 'Editing'],
    mindMapCategory: 'Creative Suite',
    details: {
      synergy: [
        { tool: "AI Ad Creator", benefit: "Promote your final reel with a targeted ad campaign to reach thousands." },
        { tool: "AI Page Admin", benefit: "Share your reel with the Page Admin for automatic posting at peak times." }
      ],
       faqs: [
        { question: "Does the AI choose the music?", answer: "Yes, the AI analyzes your footage and selects from a library of trending, commercially-licensed audio tracks that match the 'vibe' you select." },
        { question: "What if I only have a few photos?", answer: "That's fine! The AI is skilled at creating dynamic videos even with a small number of assets by using effects like zooms and pans to make static images feel alive." },
        { question: "Can it add captions automatically?", answer: "Yes. The AI can automatically generate and sync captions (subtitles) for any voiceover or spoken audio in your video, making it more accessible and engaging." }
      ],
    },
    creationFields: [
      { id: 'project', name: 'Select Project', type: 'select', options: mockProjects, placeholder: 'Choose a project', description: 'The AI will use the photos and video clips from this project.' },
      { id: 'sellingPoints', name: 'Key Selling Points', type: 'textarea', placeholder: '- Breathtaking ocean views\n- Newly renovated kitchen\n- 5 minutes from the beach', description: 'Use bullet points for text overlays in the video.' },
      { id: 'vibe', name: 'Reel Vibe', type: 'select', options: ['High-Energy & Fast', 'Cinematic & Slow', 'Relaxing & Calm', 'Modern & Edgy'], placeholder: 'Select a vibe', description: 'This influences the music and editing style.' },
    ],
  },
    {
    id: 'tiktok-editor',
    title: 'TikTok Editor',
    description: 'On-trend clips ready to post.',
    icon: <Video />,
    color: '#dc2626', // red-600
    cta: 'TikTok',
    categories: ['Creative', 'Social & Comms', 'Editing'],
    mindMapCategory: 'Creative Suite',
    details: {
      synergy: [
        { tool: "AI Social Leads", benefit: "Use your viral TikTok to drive traffic and capture leads directly from the platform." },
        { tool: "AI Page Admin", benefit: "Schedule your new TikTok to post at the optimal time for maximum visibility and engagement." }
      ],
       faqs: [
        { question: "Does the AI suggest what's currently trending on TikTok?", answer: "Yes, our AI constantly analyzes TikTok trends and can suggest popular sounds, effects, and video formats to increase your chances of going viral." },
        { question: "Can I add my own branding?", answer: "Absolutely. You can add your logo as a watermark and ensure the video aligns with your brand's color scheme." },
        { question: "Is the generated video ready to post?", answer: "Yes, the video is generated in the correct vertical aspect ratio (9:16) and is optimized for the TikTok platform. You can download and upload it directly." }
      ],
    },
    creationFields: [
      { id: 'project', name: 'Select Project', type: 'select', options: mockProjects, placeholder: 'Choose a project', description: 'The AI will use the visual assets from this project.' },
      { id: 'sound', name: 'Sound or Vibe', type: 'select', options: ['Upbeat Dance Transition', 'Cinematic Reveal Audio', 'Funny Voiceover Meme', 'Trending Pop Song'], placeholder: 'Select a sound style', description: 'The AI will find or match the audio.' },
      { id: 'textOverlays', name: 'Text Overlays', type: 'textarea', placeholder: '- POV: You found your dream home\n- Wait for the kitchen reveal!', description: 'Add engaging text to your video.' },
    ],
  },
  {
    id: 'page-admin',
    title: 'AI Page Admin',
    description: 'Schedules posts and handles replies.',
    icon: <UserCog />,
    color: '#0891b2', // cyan-600
    cta: 'Page Admin',
    categories: ['Sales Tools', 'Social & Comms'],
    mindMapCategory: 'Sales Enablement',
    badge: 'NEW',
    details: {
      synergy: [
        { tool: "AI Social Writer", benefit: "Create a fully automated content pipeline from idea to publication." },
        { tool: "CRM Memory", benefit: "When the AI flags a high-intent lead, automatically add them to your CRM with all known details." }
      ],
       faqs: [
        { question: "Can the AI answer complex questions?", answer: "The AI is trained to handle common, factual questions (price, square footage, open house times). For complex or nuanced inquiries, it will intelligently flag the conversation and notify you for personal review." },
        { question: "Can it handle post scheduling?", answer: "Yes, you can approve generated content and the AI will schedule it for optimal posting times based on your audience's activity." },
        { question: "Will it post without my approval?", answer: "You have full control. You can set the AI to be fully autonomous, or have it queue up all posts in a 'drafts' folder for you to approve with one click." }
      ],
    },
    creationFields: [
      { id: 'connect', name: 'Connect Accounts', type: 'button', cta: 'Connect Facebook & Instagram', description: 'Authorize the AI to manage your pages.' },
    ],
  },
  {
    id: 'crm-assistant',
    title: 'CRM Memory',
    description: 'Remembers every client detail.',
    icon: <Database />,
    color: '#0d9488', // teal-600
    cta: 'Client Record',
    categories: ['Sales Tools', 'Lead Gen'],
    mindMapCategory: 'Sales Enablement',
    details: {
      synergy: [
        { tool: "AI Sales Dialer", benefit: "Get a full client brief from the assistant moments before the AI places the call." },
        { tool: "Investor Matching", benefit: "The assistant can proactively suggest which clients are a perfect match for a new investment property." }
      ],
       faqs: [
        { question: "Where does the AI get its information?", answer: "The assistant securely integrates with your approved sources, like your Google/Outlook calendar, email, and call logs. All data is kept private and is not used for training other models." },
        { question: "Can it summarize an entire call?", answer: "Yes. After you finish a phone call, the assistant can provide a concise summary, pull out action items, and update the client's record automatically." },
        { question: "Is my client data secure?", answer: "Absolutely. Security is our top priority. All data is encrypted and stored in isolation. Your data is your own and is never shared or viewed." }
      ],
    },
    creationFields: [
      { id: 'clientName', name: 'Client Name', type: 'text', placeholder: 'e.g., "Jane Doe" or "the buyer for 123 Main St"', description: 'Ask about a specific client.' },
      { id: 'query', name: 'Your Question', type: 'textarea', placeholder: 'e.g., "Summarize my last call with her" or "Does she have kids?"', description: 'What do you need to know?' },
    ],
  },
  {
    id: 'lead-generation',
    title: 'AI Social Leads',
    description: 'Find buyers before they search.',
    icon: <UserPlus />,
    color: '#0284c7', // sky-600
    cta: 'Lead List',
    categories: ['Lead Gen', 'Social & Comms'],
    mindMapCategory: 'Core Intelligence',
    details: {
      synergy: [
        { tool: "CRM Memory", benefit: "Once a lead is identified, create a new profile for them in the CRM instantly." },
        { tool: "AI Social Writer", benefit: "Create content that directly targets the interests and pain points of the leads you've discovered." }
      ],
       faqs: [
        { question: "How does the AI find these leads?", answer: "The AI looks for public posts and comments that indicate an intent to move, such as people asking for realtor recommendations, discussing mortgage rates, or talking about wanting more space." },
        { question: "Is this compliant with platform terms of service?", answer: "Yes, the tool only analyzes publicly available data and does not engage in spamming or unauthorized messaging. It provides you with insights to conduct manual, personalized outreach." },
        { question: "Does it give me contact information?", answer: "No, it does not provide private contact information. It identifies public social media profiles of individuals showing intent, and suggests strategies for you to engage with them authentically on the platform." }
      ],
    },
    creationFields: [
      { id: 'area', name: 'Target Area', type: 'text', placeholder: 'e.g., "Downtown Toronto" or "Williamsburg, Brooklyn"', description: 'The geographic area to monitor.' },
      { id: 'propertyType', name: 'Property Type', type: 'text', placeholder: 'e.g., "Luxury condos", "Family homes"', description: 'The type of property your leads would be interested in.' },
      { id: 'platforms', name: 'Social Platforms', type: 'select', options: ["Facebook Groups", "Instagram Hashtags", "Local Reddit Communities", "LinkedIn"], placeholder: 'e.g., "Facebook groups", "Instagram hashtags"', description: 'Where should the AI look for leads?' },
    ],
  },
  {
    id: 'market-reports',
    title: 'AI Market Reports',
    description: 'Hyper-local trends and insights.',
    icon: <LineChart />,
    color: '#f59e0b', // amber-500
    cta: 'Market Report',
    categories: ['Reports'],
    mindMapCategory: 'Core Intelligence',
    details: {
      synergy: [
        { tool: "Landing Page Builder", benefit: "Create a landing page with a lead form to download your hyper-local market report." },
        { tool: "AI Social Writer", benefit: "Generate a week's worth of posts summarizing the key findings from your new report." }
      ],
       faqs: [
        { question: "Where does the market data come from?", answer: "Our AI synthesizes data from multiple trusted sources, including public records, MLS data feeds, and local economic indicators to provide a comprehensive and up-to-date market snapshot." },
        { question: "Can I customize the reports?", answer: "Yes, you can add your own commentary, select which sections to include, and ensure your branding is prominently displayed before finalizing the report." },
        { question: "How are these different from standard MLS reports?", answer: "While they use MLS data as a foundation, our AI reports add another layer of insight, analyzing trends, predicting future movements, and presenting the information in a client-friendly, easy-to-understand format." }
      ],
    },
    creationFields: [
      { id: 'location', name: 'Location', type: 'text', placeholder: 'e.g., "Beverly Hills, CA"', description: 'The neighborhood or city for the report.' },
      { id: 'reportFocus', name: 'Report Focus', type: 'text', placeholder: 'e.g., "2-bedroom condos" or "New construction"', description: 'Specify a property type or focus for the report.' },
      { id: 'specificProperty', name: 'Specific Property Address (Optional)', type: 'text', placeholder: 'e.g., 123 Main St, Beverly Hills, CA', description: 'Generate a detailed report for a single listing.' },
    ],
  },
  {
    id: 'investor-matching',
    title: 'Investor Fit',
    description: 'Pair budgets with the right projects.',
    icon: <Users2 />,
    color: '#6366f1', // indigo-500
    cta: 'Investor Match',
    categories: ['Sales Tools', 'Lead Gen'],
    mindMapCategory: 'Sales Enablement',
    renderResult: (result, toast) => (
       <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-2">Top Investor Matches</h3>
            <ul className="space-y-3">
            {result.matches.map((match: any, index: number) => (
                <li key={index} className="p-4 bg-muted rounded-md border">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold text-primary">{match.name}</p>
                            <p className="text-sm text-muted-foreground">Match Score: {match.matchScore}/100</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => copyToClipboard(match.email, toast)}>Copy Email</Button>
                    </div>
                    <p className="text-sm mt-2">{match.reasoning}</p>
                </li>
            ))}
            </ul>
      </div>
    ),
    details: {
      synergy: [
        { tool: "CRM Memory", benefit: "The investor matcher uses the deep client knowledge from the CRM assistant to find non-obvious matches based on past conversations." },
        { tool: "AI Rebranding", benefit: "Instantly create a personalized, rebranded brochure of the property for each of the top investor matches." }
      ],
       faqs: [
        { question: "How does the AI know what my investors want?", answer: "The AI learns from your CRM data—past purchases, stated investment goals, budget ranges, and even notes from conversations. The more data you provide, the smarter the matching becomes." },
        { question: "Can I use this for off-market deals?", answer: "Absolutely. This tool is perfect for quickly and discreetly finding the right buyer for an off-market or pocket listing from within your existing network." },
        { question: "Does this replace my own judgment?", answer: "Not at all. It's a powerful assistant that ensures you never miss an opportunity. It presents you with a data-backed shortlist, but you always have the final say on who to contact." }
      ],
    },
    creationFields: [
      { id: 'clientDatabase', name: 'Your Client List', type: 'file', description: 'Upload a CSV of your investor contacts for the AI to analyze.' },
      { id: 'propertyType', name: 'Property Type', type: 'select', options: ["Duplex", "Triplex", "Fourplex", "Multi-Family (5+ units)", "Commercial Retail", "Office Space"], placeholder: 'Select property type', description: 'Type of investment property.' },
      { id: 'location', name: 'Location', type: 'text', placeholder: 'e.g., Austin, TX', description: 'City and state of the property.'},
      { id: 'price', name: 'Price', type: 'number', placeholder: 'e.g., 750000', description: 'Asking price of the property.'},
      { id: 'capRate', name: 'Cap Rate (%)', type: 'number', placeholder: 'e.g., 6.5', description: 'The capitalization rate of the property.'},
      { id: 'investmentThesis', name: 'Investment Thesis', type: 'select', options: ["Value-Add / Renovation", "Turnkey Rental", "Long-Term Appreciation", "Development Opportunity", "1031 Exchange"], placeholder: 'Select investment strategy', description: 'Primary strategy for this investment.'},
      { id: 'keyFeatures', name: 'Key Features', type: 'textarea', placeholder: 'e.g., Long-term tenants in place, zoned for mixed-use, located in an opportunity zone.', description: 'Additional selling points for an investor.' },
    ],
  },
  {
    id: 'listing-generator',
    title: 'Listing Generator',
    description: 'SEO-ready descriptions from a few details.',
    icon: <FileText />,
    color: '#64748b', // slate-500
    cta: 'Listing',
    categories: ['Sales Tools', 'Editing', 'Web'],
    mindMapCategory: 'Sales Enablement',
    details: {
      synergy: [
        { tool: "AI Ad Creator", benefit: "Use your new listing description as the source material for a targeted ad campaign." },
        { tool: "Landing Page Builder", benefit: "Instantly create a beautiful single-property website using your new listing details." }
      ],
       faqs: [
        { question: "Can I choose the tone of the listing?", answer: "Yes, you can specify a tone such as 'Luxurious,' 'Family-Friendly,' or 'Great for First-Time Buyers,' and the AI will adjust its language and emphasis accordingly." },
        { question: "Is the output ready to copy and paste into the MLS?", answer: "Absolutely. The generated text is formatted to be easily copied and pasted into MLS systems and other listing sites like Zillow or Redfin." },
        { question: "How does it know what keywords to use for SEO?", answer: "The AI analyzes the property's location and features to include relevant local keywords (like neighborhood names, school districts, or nearby landmarks) that a potential buyer is likely to search for." }
      ],
    },
    creationFields: [
      { id: 'propertyAddress', name: 'Property Address', type: 'text', placeholder: 'e.g., 123 Main St, Anytown, USA', description: 'The address of the property.' },
      { id: 'keyDetails', name: 'Key Details', type: 'text', placeholder: 'e.g., 4 beds, 3 baths, 2,500 sqft', description: 'Provide the basic stats.' },
      { id: 'uniqueFeatures', name: 'Unique Features', type: 'textarea', placeholder: 'e.g., Renovated kitchen with quartz countertops, backyard oasis with a pool', description: 'What makes this property special?' },
    ],
  },
  {
    id: 'offer-generator',
    title: 'Multi-Offer Builder',
    description: 'Compare options side-by-side.',
    icon: <Briefcase />,
    color: '#78716c', // stone-500
    cta: 'Offer Package',
    categories: ['Sales Tools', 'Editing'],
    mindMapCategory: 'Sales Enablement',
    details: {
      synergy: [
        { tool: "Investor Matching", benefit: "After finding the top properties for an investor, use this tool to present them in a professional package." },
        { tool: "CRM Memory", benefit: "Pull the client's specific requirements directly from the CRM to pre-fill the offer terms." }
      ],
       faqs: [
        { question: "Can I add my own branding to the offer document?", answer: "Yes, you can upload your logo and brand colors, and the AI will automatically apply them to the generated PDF for a professional, personalized touch." },
        { question: "Does this actually submit the offers?", answer: "No, this tool generates a client-facing document that clearly outlines and compares the offers for their review and approval. It does not submit legally binding offers on your behalf." },
        { question: "Can it handle different offer amounts for each property?", answer: "Absolutely. You can specify different offer prices and terms for each property, and the tool will present them in a clear, side-by-side comparison format." }
      ],
    },
    creationFields: [
      { id: 'properties', name: 'Properties', type: 'textarea', placeholder: 'List property addresses, one per line', description: 'The properties to include in the offer package.' },
      { id: 'clientInfo', name: 'Client Info', type: 'text', placeholder: 'e.g., John Smith, Budget: $1.5M', description: 'Basic information about the client.' },
      { id: 'terms', name: 'Offer Terms', type: 'textarea', placeholder: 'e.g., 20% down, 30-day closing, inspection contingency', description: 'Key terms to include in the offers.' },
    ],
  },
  {
    id: 'email-creator',
    title: 'AI Email Campaigns',
    description: 'Design, write, and schedule.',
    icon: <Mail />,
    color: '#0ea5e9', // sky-500
    cta: 'Email Campaign',
    categories: ['Marketing', 'Social & Comms', 'Sales Tools'],
    mindMapCategory: 'Marketing',
    details: {
      synergy: [
        { tool: "AI Market Reports", benefit: "Generate a local report, then use this tool to create an email campaign to share it with your list." },
        { tool: "CRM Memory", benefit: "Personalize your email campaigns at scale using deep client insights from the assistant." }
      ],
       faqs: [
        { question: "Can I connect this to my email provider?", answer: "The AI generates the raw content (subject lines) and HTML for the email bodies. You can then easily copy and paste this into any major email marketing platform like Mailchimp, Constant Contact, or others." },
        { question: "Does it write a single email or a sequence?", answer: "It can do both! You can ask for a single promotional email or specify a multi-part sequence, such as a 3-day follow-up campaign for new leads." },
        { question: "Are the emails personalized?", answer: "Yes, the AI can insert placeholders like `[First Name]` that your email marketing tool will automatically populate, making your campaigns feel personal to each recipient." }
      ],
    },
    creationFields: [
      { id: 'goal', name: 'Campaign Goal', type: 'select', options: ["New Listing Announcement", "Open House Invitation", "Monthly Newsletter", "Cold Lead Nurturing Sequence", "Post-Viewing Follow-up"], placeholder: 'Select a campaign type', description: 'What is the purpose of this email campaign?' },
      { id: 'source', name: 'Content Source', type: 'text', placeholder: 'Paste a URL or type a topic', description: 'The AI will use this as the basis for the content.' },
      { id: 'tone', name: 'Tone of Voice', type: 'select', options: ['Professional', 'Friendly', 'Urgent', 'Humorous', 'Informative'], placeholder: 'Select a tone', description: 'Set the mood for your emails.' },
    ],
  },
  {
    id: 'instagram-bot',
    title: 'Instagram Chat Bot',
    description: 'DMs handled 24/7.',
    icon: <Bot />,
    color: '#f43f5e', // rose-500
    cta: 'Chat Bot',
    categories: ['Sales Tools', 'Social & Comms', 'Lead Gen'],
    mindMapCategory: 'Sales Enablement',
    details: {
      synergy: [
        { tool: "AI Story Designer", benefit: "Run a story with a 'DM for info' poll, and let the chatbot handle all the incoming inquiries automatically." },
        { tool: "CRM Memory", benefit: "When the chatbot identifies a hot lead, it can automatically create a new contact in your CRM with the conversation summary." }
      ],
       faqs: [
        { question: "Is this against Instagram's terms of service?", answer: "No, this tool uses the official Instagram Messaging API. It operates within their guidelines and is completely safe for your account." },
        { question: "Can the bot understand typos and slang?", answer: "Yes, the AI is designed to understand the nuances of human conversation, including common typos and informal language, ensuring a smooth experience for your clients." },
        { question: "When does it hand over a conversation to me?", answer: "You can set custom rules. The bot can hand over the conversation if it doesn't know the answer, if the user asks to speak to a human, or if it detects high-intent language like 'I want to make an offer.'" }
      ],
    },
    creationFields: [
      { id: 'connect', name: 'Connect Instagram', type: 'button', cta: 'Connect Instagram Account', description: 'Authorize the AI to manage your DMs.' },
    ],
  },
  {
    id: 'whatsapp-campaigns',
    title: 'WhatsApp Manager',
    description: 'Personalized broadcasts + drips.',
    icon: <Phone />,
    color: '#16a34a', // green-600
    cta: 'WhatsApp Campaign',
    categories: ['Sales Tools', 'Social & Comms', 'Lead Gen'],
    mindMapCategory: 'Sales Enablement',
    details: {
      synergy: [
        { tool: "AI Social Leads", benefit: "Directly import new leads and add them to an automated welcome message sequence on WhatsApp." },
        { tool: "CRM Memory", benefit: "Use insights from the CRM to send highly targeted messages, like wishing a client a happy birthday or reminding them of an anniversary." }
      ],
       faqs: [
        { question: "Is this compliant with WhatsApp's policies?", answer: "Yes, this tool is designed to work within WhatsApp's Business Platform policies. It's intended for sending transactional messages and engaging with clients who have opted in to communication, not for spam." },
        { question: "Can it handle replies?", answer: "The tool is primarily for outbound campaigns. For managing two-way conversations, it works best when integrated with our AI Page Admin or Instagram Chat Bot." },
        { question: "What does 'personalization' mean?", answer: "If you upload a contact list with columns like 'Name' or 'Property of Interest', you can use placeholders like [Name] in your message. The tool will automatically replace the placeholder with the correct data for each contact, making your messages feel personal." }
      ],
    },
    creationFields: [
      { id: 'contacts', name: 'Contact List', type: 'file', description: 'Upload a CSV with names and numbers.' },
      { id: 'campaignType', name: 'Campaign Type', type: 'select', options: ["New Listing Announcement", "Open House Invitation", "Price Reduction Alert", "Post-Viewing Follow-up"], placeholder: 'Select a message template', description: 'Choose the goal of your campaign.' },
      { id: 'sendTime', name: 'Schedule', type: 'select', options: ['Send Immediately', 'Schedule for 1 hour from now', 'Schedule for tomorrow at 9 AM'], placeholder: 'Select send time', description: 'When should the campaign be sent?' },
    ],
  },
  {
    id: 'ai-assistant',
    title: 'Your AI Assistant',
    description: 'Your personal, trainable AI partner.',
    icon: <BrainCircuit />,
    color: '#84cc16', // lime-500
    cta: 'Assistant',
    categories: ['Sales Tools'],
    mindMapCategory: 'Core Intelligence',
    badge: 'BETA',
    details: {
      synergy: [
        { tool: "CRM Memory", benefit: "The Assistant is the user-facing interface for the powerful memory stored in the CRM." },
        { tool: "All Tools", benefit: "The Assistant has access to all uploaded documents, making every tool more context-aware and powerful." }
      ],
       faqs: [
        { question: "What's the difference between this and ChatGPT?", answer: "While both are powered by advanced AI, the Super Seller Suite Assistant is specifically designed for real estate and is integrated with your private data. You can upload brochures, reports, and client lists, and the assistant will use that private knowledge to give you hyper-relevant, contextual answers that a public tool like ChatGPT could never provide." },
        { question: "Is my data used to train Google's models?", answer: "No. Absolutely not. The knowledge base you provide for your assistant is kept completely private and secure. It is only used to inform the responses for your account and is never used for training the underlying AI models." },
        { question: "What kind of documents can I upload?", answer: "You can upload PDFs, text files, and CSVs. This is perfect for market reports, property brochures, client databases, legal documents, and more. The more knowledge you give your assistant, the more powerful it becomes." }
      ],
    },
    creationFields: [
       { id: 'assistant-redirect', name: 'Train Your Assistant', type: 'button', cta: 'Go to Assistant Training', description: 'Personalize your AI by giving it instructions and knowledge.' },
    ],
  },
];
