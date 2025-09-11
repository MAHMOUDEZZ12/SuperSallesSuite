
// This file is now a pure data file with no React/JSX dependencies.
// It can be safely imported by both server and client components.

import type { ReactNode } from 'react';

export type Field = {
  id: string;
  name: string;
  type: 'text' | 'file' | 'textarea' | 'select' | 'button' | 'number' | 'group-header';
  placeholder?: string;
  description: string;
  options?: string[];
  multiple?: boolean;
  cta?: string;
  value?: string;
  hidden?: boolean;
};

export type FilterCategory = 'All' | 'Lead Gen' | 'Creative' | 'Sales Tools' | 'Social & Comms' | 'Web' | 'Editing' | 'Ads' | 'Marketing' | 'Market Library' | 'Utilities' | 'Listing Intelligence AI' | 'TikTok AI Suite' | 'Google AI Suite' | 'Video';

export type Feature = {
  id: string;
  title: string;
  dashboardTitle?: string;
  description: string;
  icon: string; // Changed from React.ElementType to string
  color: string;
  cta: string;
  categories: FilterCategory[];
  mindMapCategory: 'Marketing' | 'Creative Suite' | 'Sales Enablement' | 'Core Intelligence' | 'Internal' | 'Meta Ads AI Suite' | 'Utilities' | 'Listing Intelligence AI' | 'TikTok AI Suite' | 'Google AI Suite' | 'Video';
  badge?: 'NEW' | 'BETA' | 'SOON' | 'Pilot*';
  isPage?: boolean;
  href: string;
  guideHref?: string;
  details: {
    steps: { text: string; icon: string }[]; // Changed icon to string
    aiVsManual: {
      metric: string;
      manual: string;
      ai: string;
      icon: string; // Changed icon to string
    }[];
    synergy: { tool: string; benefit: string }[];
    faqs: { question: string; answer: string }[];
  };
  creationFields: Field[];
  renderResult?: (result: any, toast: any) => ReactNode;
};

export const tools: Omit<Feature, 'renderResult'>[] = [
    {
    id: 'ai-video-presenter',
    title: 'AI Video Presenter',
    dashboardTitle: 'AI Video Presenter',
    description: 'Create a lifelike AI presenter to deliver your project pitch.',
    icon: 'UserCheck',
    color: '#f43f5e', // rose-500
    cta: 'Generate Video',
    categories: ['Creative', 'Video', 'Marketing', 'Ads'],
    mindMapCategory: 'Creative Suite',
    badge: 'NEW',
    isPage: true,
    href: '/dashboard/tool/ai-video-presenter',
    guideHref: '/blog/ai-video-presenter',
    details: {
      steps: [
        { text: 'Select or create a character', icon: 'User' },
        { text: 'Provide a script for them to speak', icon: 'PenTool' },
        { text: 'Generate a high-quality video of the presenter', icon: 'Video' },
      ],
      aiVsManual: [
        { metric: 'Production Time', manual: 'Days of filming and editing', ai: 'Minutes to generate', icon: 'Clock2' },
        { metric: 'Cost', manual: 'Thousands of dollars for actors and crew', ai: 'Included in your subscription', icon: 'Wallet' },
        { metric: 'Revisions', manual: 'Expensive and time-consuming reshoots', ai: 'Simply edit the script and regenerate', icon: 'Sparkles' },
      ],
      synergy: [
        { tool: 'Landing Page Builder', benefit: 'Embed your video presenter directly into your AI-generated landing pages for a highly engaging experience.' },
        { tool: 'Listing Generator', benefit: 'Use the generated property description as the script for your AI video presenter.' },
      ],
      faqs: [
        { question: 'How realistic is the video?', answer: 'We use state-of-the-art video generation models (Veo) to create presenters with natural expressions and movements. The quality is designed to be highly professional.' },
        { question: 'Can I use my own face?', answer: 'For privacy and security reasons, the current version does not support uploading personal faces. You can use our pre-rendered samples or generate a new, unique AI character from a description.' },
        { question: 'Are the videos commercially licensed?', answer: 'Yes, all generated video presenters are fully licensed for you to use in your commercial marketing materials.' },
      ],
    },
    creationFields: [],
  },
  {
    id: 'chatbot-creator',
    title: 'Embeddable Site Assistant',
    dashboardTitle: 'Embeddable Assistant',
    description: 'Add a market-aware AI chatbot to any website.',
    icon: 'Bot',
    color: '#6366f1',
    cta: 'Get Embed Code',
    categories: ['Web', 'Lead Gen', 'Sales Tools', 'Utilities'],
    mindMapCategory: 'Utilities',
    badge: 'NEW',
    isPage: true,
    href: '/dashboard/tool/chatbot-creator',
    details: {
        steps: [
            { text: 'The AI is pre-trained on real estate market data', icon: 'Database' },
            { text: 'Copy the provided JavaScript snippet', icon: 'Copy' },
            { text: 'Paste it into your website\'s HTML (e.g., WordPress)', icon: 'Share2' },
        ],
        aiVsManual: [
            { metric: 'Availability', manual: 'You, during business hours', ai: '24/7 instant answers for your visitors', icon: 'Clock2' },
            { metric: 'Lead Capture', manual: 'Hoping visitors use a contact form', ai: 'Engages users and can prompt for contact info', icon: 'UserPlus' },
            { metric: 'Knowledge', manual: 'Your personal expertise', ai: 'Broad market data combined with your specific info', icon: 'BrainCircuit' },
        ],
        synergy: [
            { tool: "Landing Page Builder", benefit: "Embed the chatbot onto your AI-generated landing pages to answer visitor questions instantly." },
            { tool: "Knowledge Base", benefit: "Upload your own brochures and price lists to the Brand & Assets page to give the chatbot even deeper knowledge about your specific projects." },
        ],
        faqs: [
            { question: "How do I add this to my WordPress site?", answer: "It's easy! Most WordPress page builders like Elementor or the standard block editor have a 'Custom HTML' widget. Just drag that onto your page and paste the code snippet." },
            { question: "Can I customize the chatbot's appearance?", answer: "The initial version has a clean, standard design. We are working on features to allow you to customize the colors and logo to match your brand perfectly." },
            { question: "Where does the 'market knowledge' come from?", answer: "The AI is prompted to act as a real estate market expert for the UAE region, using its vast training data. For even better results, upload your own project documents to the 'Brand & Assets' page, and the chatbot can reference that specific knowledge as well." }
        ],
    },
    creationFields: [],
  },
  {
    id: 'keyword-planner',
    title: 'AI Keyword Planner',
    dashboardTitle: 'AI Keyword Planner',
    description: 'Generate a strategic keyword plan for Google Ads.',
    icon: 'Search',
    color: '#34A853',
    cta: 'Generate Keyword Plan',
    categories: ['Google AI Suite', 'Ads', 'Marketing'],
    mindMapCategory: 'Google AI Suite',
    badge: 'NEW',
    isPage: true,
    href: '/dashboard/tool/keyword-planner',
    details: {
      steps: [
        { text: 'Provide a topic and target location', icon: 'PenTool' },
        { text: 'AI generates ad groups and keywords', icon: 'Sparkles' },
        { text: 'Get a full plan with match types and negative keywords', icon: 'ClipboardList' },
      ],
      aiVsManual: [
        { metric: 'Research Time', manual: 'Hours in Google Keyword Planner', ai: 'Seconds to generate a full strategy', icon: 'Clock2' },
        { metric: 'Strategy', manual: 'A flat list of keywords', ai: 'Logically structured ad groups and match types', icon: 'BrainCircuit' },
        { metric: 'Completeness', manual: 'Often overlooks negative keywords', ai: 'Includes a list of negative keywords to save budget', icon: 'BadgeCheck' },
      ],
      synergy: [
        { tool: "Google Search Ads Tool", benefit: "Use the generated plan as the direct input to create a new search campaign instantly." },
        { tool: "AI SEO Planner", benefit: "Adapt the keyword strategy for on-page SEO to improve organic rankings." },
      ],
      faqs: [
        { question: "How accurate are the search volume estimates?", answer: "The search volumes are AI-driven estimates designed to show relative popularity. They provide a strong directional guide but are not a substitute for live Google Ads data." },
        { question: "What are negative keywords?", answer: "Negative keywords are terms you tell Google *not* to show your ads for. For example, if you sell luxury properties, you would add 'cheap' and 'rent' as negative keywords to avoid wasting money on irrelevant clicks." },
        { question: "Can I use this for any industry?", answer: "Yes, while the suite is real estate-focused, this tool is versatile. Just provide any topic (e.g., 'handmade leather bags') and it will generate a relevant keyword plan." }
      ],
    },
    creationFields: [],
  },
   {
    id: 'ugc-script-writer',
    title: 'UGC Script Writer',
    dashboardTitle: 'UGC Script Writer',
    description: 'Generate authentic, user-generated content style video ad scripts.',
    icon: 'PenSquare',
    color: '#8b5cf6',
    cta: 'Generate Script',
    categories: ['Creative', 'Ads', 'Social & Comms'],
    mindMapCategory: 'Creative Suite',
    badge: 'NEW',
    isPage: false,
    href: '/dashboard/tool/ugc-script-writer',
    details: {
      steps: [
        { text: 'Provide a description of your product or service', icon: 'PenTool' },
        { text: 'AI analyzes a proven script framework', icon: 'BrainCircuit' },
        { text: 'A new, structured script is generated for your product', icon: 'Sparkles' },
      ],
      aiVsManual: [
        { metric: 'Scriptwriting Time', manual: 'Hours of creative effort and rewrites', ai: 'Minutes to generate a structured draft', icon: 'Clock2' },
        { metric: 'Framework', manual: 'Guesswork on what makes a script effective', ai: 'Based on a proven, successful UGC ad structure', icon: 'BadgeCheck' },
        { metric: 'Authenticity', manual: 'Can sound overly polished or like an ad', ai: 'Generates language that mimics genuine user content', icon: 'Sparkles' },
      ],
      synergy: [
        { tool: 'AI Video Presenter', benefit: 'Use the generated script with the AI Video Presenter to create the final video ad instantly.' },
        { tool: 'Reel Ads', benefit: 'Use the script as a shot-by-shot guide for creating a compelling Instagram Reel ad.' },
      ],
      faqs: [
        { question: 'What is "UGC" style?', answer: 'UGC stands for User-Generated Content. It refers to a style of video that looks and feels like it was made by a real customer, not a professional production company. This style is often seen as more authentic and trustworthy by viewers.' },
        { question: 'Can I change the original script framework?', answer: 'The current tool uses a fixed, proven framework for consistency and quality. The ability to provide your own template scripts is on our roadmap for a future update.' },
        { question: 'Is the output a video or just text?', answer: 'This tool generates the text script in a structured JSON format. You can then use this script as a blueprint for filming your own video or by using it with other tools in the suite like the AI Video Presenter.' },
      ],
    },
    creationFields: [
        { id: 'productDescription', name: 'New Product Description', type: 'textarea', placeholder: 'Provide all the key details, features, and benefits of the product you want to advertise...', description: 'A detailed description of the product for the new script.' },
    ],
  },
  {
    id: 'tiktok-editor',
    title: 'AI TikTok Video Editor',
    dashboardTitle: 'TikTok Video Editor',
    description: 'Create on-trend, engaging videos for TikTok.',
    icon: 'Video',
    color: '#000000',
    cta: 'Generate TikTok',
    categories: ['TikTok AI Suite', 'Ads', 'Creative', 'Social & Comms'],
    mindMapCategory: 'TikTok AI Suite',
    badge: 'NEW',
    href: '/dashboard/tool/tiktok-editor',
    guideHref: '/blog/tiktok-editor',
    details: {
      steps: [
        { text: 'Provide your project assets (images, videos)', icon: 'Upload' },
        { text: 'AI suggests trending sounds and text styles', icon: 'Sparkles' },
        { text: 'Generate a ready-to-post TikTok video', icon: 'CheckCircle' },
      ],
      aiVsManual: [
        { metric: 'Time to Create', manual: 'Hours editing in CapCut', ai: 'Seconds to generate a draft', icon: 'Clock2' },
        { metric: 'Trend Analysis', manual: 'Manually scrolling the For You Page', ai: 'Data-driven insights on what\'s currently working', icon: 'TrendingUp' },
        { metric: 'Engagement', manual: 'Hit-or-miss engagement', ai: 'Optimized for the TikTok algorithm', icon: 'LineChart' },
      ],
      synergy: [
        { tool: "Reel Ads", benefit: "Easily reformat your best-performing Instagram Reels for a native TikTok experience." },
        { tool: "Audience Creator", benefit: "Use the insights from TikTok to refine your target audience on other social platforms." },
      ],
      faqs: [
        { question: "Can I use my own sounds?", answer: "While the AI suggests commercially licensed trending audio, you can upload your own audio files to be used in the video." },
        { question: "Does it add those TikTok text-to-speech voices?", answer: "Yes, you can choose from a variety of popular text-to-speech voices to narrate your video for a native TikTok feel." },
        { question: "How does it know what's 'trending'?", answer: "Our AI analyzes data from the TikTok Commercial Content API to identify sounds, visual styles, and topics that are currently performing well in your market." }
      ],
    },
    creationFields: [
      { id: 'projectId', name: 'Project', type: 'select', options: ['Emaar Beachfront', 'Damac Hills 2', 'Sobha Hartland', 'Add New Project...'], placeholder: 'Select a project', description: 'Choose the project to source visual assets from.' },
      { id: 'sound', name: 'Sound or Vibe', type: 'text', placeholder: 'e.g., "upbeat corporate" or paste a TikTok sound link', description: 'Describe the audio vibe or provide a link to a specific sound.' },
      { id: 'textOverlays', name: 'Text Overlays', type: 'textarea', placeholder: 'e.g., "You won\'t believe this view...\\nWait for the end!"', description: 'Key text to display on screen. One idea per line.' },
    ],
  },
   {
    id: 'meta-auto-pilot',
    title: 'Meta Auto Pilot',
    dashboardTitle: 'Meta Auto Pilot',
    description: 'The single-click manager for your entire Meta suite.',
    icon: 'Star',
    color: '#fbbf24', 
    cta: 'Run Workflow',
    categories: ['Marketing', 'Ads', 'Lead Gen'],
    mindMapCategory: 'Meta Ads AI Suite',
    badge: 'Pilot*',
    isPage: true,
    href: '/dashboard/tool/meta-auto-pilot',
    guideHref: '/blog/meta-auto-pilot',
    details: {
      steps: [
          { text: 'Connect all your Meta ad tools', icon: 'Link' },
          { text: 'Define a high-level goal and budget', icon: 'Target' },
          { text: 'The Pilot runs and optimizes the entire workflow', icon: 'Sparkles' },
      ],
      aiVsManual: [
        { metric: 'Time Investment', manual: '10+ hours per week managing ads', ai: 'Set a goal, let the Pilot work', icon: 'Clock2' },
        { metric: 'Strategy', manual: 'Reacts slowly to performance data', ai: 'Proactively shifts budget and creative', icon: 'LineChart' },
        { metric: 'Complexity', manual: 'Juggling multiple tools and platforms', ai: 'One command controls everything', icon: 'Bot' },
      ],
      synergy: [
        { tool: "All Meta Tools", benefit: "The Pilot is the orchestrator, using all other tools in the suite to execute a complete strategy." },
        { tool: "CRM Memory", benefit: "Feed campaign performance and lead data directly back into your CRM automatically." }
      ],
       faqs: [
        { question: "Is this safe for my ad account?", answer: "Yes, the Pilot operates within all platform guidelines and you set the budget caps. It automates the workflow, but you retain full control." },
        { question: "Can I intervene during a campaign?", answer: "Absolutely. You can pause the pilot, manually adjust campaigns, or provide new instructions at any time. It's your co-pilot, not an autopilot." },
      ],
    },
    creationFields: [],
  },
  {
    id: 'meta-ads-copilot',
    title: 'Campaign Builder',
    dashboardTitle: 'Campaign Builder',
    description: 'Your dedicated agent for Facebook & Instagram advertising.',
    icon: 'Facebook',
    color: '#1d4ed8', 
    cta: 'Create Campaign',
    categories: ['Marketing', 'Ads', 'Lead Gen'],
    mindMapCategory: 'Meta Ads AI Suite',
    badge: 'NEW',
    isPage: true,
    href: '/dashboard/tool/meta-ads-copilot',
    guideHref: '/blog/meta-ads-copilot',
    details: {
      steps: [
          { text: 'Connect your Meta Business account', icon: 'Link' },
          { text: 'Define your campaign goal and budget', icon: 'Target' },
          { text: 'The agent creates, manages, and optimizes the campaign', icon: 'Sparkles' },
      ],
      aiVsManual: [
        { metric: 'Time Investment', manual: '10+ hours per week managing ads', ai: 'Set your goal and let the agent work', icon: 'Clock2' },
        { metric: 'Cost & Resources', manual: 'Requires a dedicated ad manager', ai: 'Included in your subscription', icon: 'Wallet' },
        { metric: 'Optimization', manual: 'Reacts slowly to performance data', ai: 'Optimizes bids and creative in real-time', icon: 'LineChart' },
      ],
      synergy: [
        { tool: "Audience Creator", benefit: "Use the high-intent audience you identified as the target for your new campaign." },
        { tool: "CRM Memory", benefit: "Feed campaign performance and lead data directly back into your CRM." }
      ],
       faqs: [
        { question: "Is this safe for my ad account?", answer: "Yes, this tool will use the official Meta Business API and operate within all platform guidelines." },
        { question: "How much control do I have?", answer: "You will have full control. You can set budget caps, approve creative, and pause the campaign at any time. The agent acts as your co-pilot, not an autopilot." },
        { question: "When will this be available?", answer: "This feature is currently under active development and is on our short-term roadmap. Stay tuned for updates!" }
      ],
    },
    creationFields: [],
  },
  {
    id: 'audience-creator',
    title: 'Audience Creator',
    dashboardTitle: 'Audience Creator',
    description: 'Find high-intent buyers before they search.',
    icon: 'Binoculars',
    color: '#3b82f6', 
    cta: 'Generate Strategies',
    categories: ['Marketing', 'Lead Gen', 'Ads'],
    mindMapCategory: 'Meta Ads AI Suite',
    badge: 'NEW',
    isPage: true,
    href: '/dashboard/tool/audience-creator',
    guideHref: '/blog/audience-creator',
    details: {
      steps: [
        { text: 'Select a project from your library', icon: 'Briefcase' },
        { text: 'The AI analyzes project data and market signals', icon: 'BrainCircuit' },
        { text: 'Get multiple targeting strategies to choose from', icon: 'ClipboardList' },
      ],
      aiVsManual: [
        { metric: 'Audience Discovery', manual: 'Broad guessing (e.g., "Age 30-50")', ai: 'Niche, high-intent segments based on real data', icon: 'Users2' },
        { metric: 'Time to Research', manual: 'Hours of market research', ai: 'Instantaneous generation', icon: 'Clock2' },
        { metric: 'Budget Efficiency', manual: 'High waste on wrong audiences', ai: 'Optimized ad spend, higher ROI', icon: 'Wallet' },
      ],
      synergy: [
        { tool: "Campaign Builder", benefit: "Design the perfect ad for the high-intent audience you've just identified." },
        { tool: "Instagram Content Creator", benefit: "Create organic posts that speak directly to the interests of your target persona." }
      ],
       faqs: [
        { question: "What platforms can I use these audiences on?", answer: "Our targeting suggestions are optimized for major platforms like Facebook, Instagram, and Google Ads. We provide you with the exact interests, demographics, and keywords to input." },
        { question: "How does the AI know who is a 'high-intent' buyer?", answer: "The AI analyzes anonymous data signals such as recent searches for mortgage calculators, activity in moving-related forums, and engagement with real estate content to identify users who are actively in the market." },
        { question: "Is this compliant with privacy regulations?", answer: "Yes. The system uses anonymized, aggregated data and adheres to all privacy regulations. It identifies audience *patterns* and *segments*, not individuals." }
      ],
    },
    creationFields: [
       { id: 'projectId', name: 'Project', type: 'select', options: ['Emaar Beachfront', 'Damac Hills 2', 'Sobha Hartland', 'Add New Project...'], placeholder: 'Select a project', description: 'Choose the project you want to create an audience for.' },
    ],
  },
  {
    id: 'insta-ads-designer',
    title: 'Insta Ads Designer',
    dashboardTitle: 'Insta Ads Designer',
    description: 'Create perfect ads for Instagram Stories &amp; Feed.',
    icon: 'Instagram',
    color: '#ec4899', 
    cta: 'Generate Ad',
    categories: ['Ads', 'Creative', 'Social & Comms'],
    mindMapCategory: 'Meta Ads AI Suite',
    isPage: false,
    href: '/dashboard/tool/insta-ads-designer',
    guideHref: '/blog/insta-ads-designer',
    details: {
      steps: [
          { text: 'Upload a project brochure', icon: 'Upload' },
          { text: 'Select a focus (e.g., "luxury", "family")', icon: 'Target' },
          { text: 'Generate multiple ad variants instantly', icon: 'Sparkles' },
      ],
      aiVsManual: [
        { metric: 'Time Investment', manual: '5-10 hours per campaign', ai: 'Fast by default', icon: 'Clock2' },
        { metric: 'Cost &amp; Resources', manual: 'Requires copywriter &amp; designer', ai: 'Included in your subscription', icon: 'Wallet' },
        { metric: 'Quality &amp; Testing', manual: 'Relies on guesswork, 1-2 variations', ai: 'Data-driven, 5+ variations to test', icon: 'BadgeCheck' },
      ],
      synergy: [
        { tool: "Audience Creator", benefit: "Ensure your perfect ads are seen by people ready to buy." },
        { tool: "Instagram Admin", benefit: "Deploy your new ad across social channels to maximize reach." }
      ],
       faqs: [
        { question: "What kind of brochures can I use?", answer: "You can upload almost any standard PDF brochure from a developer or your own marketing materials. The AI is designed to extract key information like floor plans, features, and location." },
        { question: "Can I edit the ads after they are generated?", answer: "Absolutely. The AI-generated content serves as a powerful starting point. You can then tweak the copy, headlines, and calls-to-action to perfectly match your voice and campaign goals." },
        { question: "How are the ad visuals created?", answer: "The AI uses a combination of stock imagery, design templates, and an understanding of your brand's color palette to create visually appealing and effective ad graphics. You can also provide your own images for the AI to incorporate." }
      ],
    },
    creationFields: [
      { id: 'projectId', name: 'Project', type: 'select', options: ['Emaar Beachfront', 'Damac Hills 2', 'Sobha Hartland', 'Add New Project...'], placeholder: 'Select a project', description: 'Choose from your saved projects.' },
      { id: 'brochureDataUri', name: 'Or Upload Developer Brochure', type: 'file', description: 'Upload the original PDF for more detailed ad generation.' },
      { id: 'focusArea', name: 'Ad Focus', type: 'select', options: ['Luxury & Prestige', 'Family-Friendly', 'Investment Opportunity', 'Modern & Urban', 'First-Time Buyer'], placeholder: 'Select the ad\'s main angle', description: 'What key aspect should the ad highlight?' },
      { id: 'toneOfVoice', name: 'Tone of Voice', type: 'select', options: ['Professional', 'Exciting', 'Welcoming', 'Urgent', 'Sophisticated'], placeholder: 'Select a tone', description: 'Set the tone for the ad copy.' },
      { id: 'additionalInformation', name: 'Additional Information', type: 'textarea', placeholder: 'e.g., "Limited time offer: 2 years of service charges waived."', description: 'Add any other key details or offers. (Optional)' },
    ],
  },
  {
    id: 'reel-ads-ai',
    title: 'Reel Ads',
    dashboardTitle: 'Reel Ads',
    description: 'Generate engaging video ads for Instagram Reels.',
    icon: 'Clapperboard',
    color: '#7c3aed',
    cta: 'Generate Reel Ad',
    categories: ['Ads', 'Creative', 'Social & Comms'],
    mindMapCategory: 'Meta Ads AI Suite',
    badge: 'SOON',
    href: '/dashboard/tool/reel-ads-ai',
    guideHref: '/blog/instagram-content-creator', 
    details: {
      steps: [
        { text: 'Select a project to source images/videos', icon: 'Briefcase' },
        { text: 'Provide key selling points for captions', icon: 'PenTool' },
        { text: 'AI generates a video with captions & music', icon: 'Sparkles' },
      ],
      aiVsManual: [
        { metric: 'Video Editing Time', manual: '2-5 hours per reel', ai: 'Seconds to generate', icon: 'Clock2' },
        { metric: 'Software Cost', manual: 'Requires Adobe Premiere/CapCut Pro', ai: 'Included in your subscription', icon: 'Wallet' },
        { metric: 'Trendiness', manual: 'Hard to keep up with trending audio/styles', ai: 'AI suggests current, popular formats', icon: 'TrendingUp' },
      ],
      synergy: [
        { tool: "Insta Ads Designer", benefit: "Use the text and themes from your best-performing static ads as input for a new video reel." },
        { tool: "Audience Creator", benefit: "Target your reel ad to the high-intent audience you identified to maximize engagement." },
      ],
      faqs: [
        { question: "Can I upload my own video clips?", answer: "Yes, you can provide your own video clips and photos. The AI will analyze them, select the best segments, and edit them together into a compelling reel." },
        { question: "Does the AI choose the music?", answer: "The AI can suggest trending audio styles and royalty-free music that matches the 'vibe' you select for your reel, ensuring it feels current and engaging." },
        { question: "Can I edit the generated captions?", answer: "Absolutely. The AI generates dynamic, animated captions as a starting point, but you have full control to edit the text and timing before finalizing the video." }
      ],
    },
    creationFields: [
      { id: 'projectId', name: 'Project', type: 'select', options: ['Emaar Beachfront', 'Damac Hills 2', 'Sobha Hartland', 'Add New Project...'], placeholder: 'Select a project', description: 'Choose the project to source visual assets from.' },
      { id: 'sellingPoints', name: 'Selling Points', type: 'textarea', placeholder: 'e.g., Stunning ocean views\\nFloor-to-ceiling windows\\n5-star amenities', description: 'One key point per line for captions.' },
      { id: 'vibe', name: 'Vibe', type: 'select', options: ['Modern & Fast-Paced', 'Luxurious & Cinematic', 'Upbeat & Fun', 'Calm & Relaxing'], placeholder: 'Select a vibe', description: 'This influences the music and editing style.' },
    ]
  },
  {
    id: 'instagram-admin-ai',
    title: 'Instagram Admin',
    dashboardTitle: 'Instagram Admin',
    description: 'Schedules posts and handles replies on Instagram.',
    icon: 'UserCog',
    color: '#c026d3',
    cta: 'Run Admin Task',
    categories: ['Sales Tools', 'Social & Comms'],
    mindMapCategory: 'Meta Ads AI Suite',
    badge: 'NEW',
    href: '/dashboard/tool/instagram-admin-ai',
    guideHref: '/blog/instagram-admin-ai',
    details: {
      steps: [
        { text: 'Connect your Instagram account securely', icon: 'Network' },
        { text: 'Provide a task (e.g., "Draft replies to this comment")', icon: 'PenTool' },
        { text: 'AI executes the task and waits for your approval', icon: 'CheckCircle' },
      ],
      aiVsManual: [
        { metric: 'Response Time', manual: 'Hours or days', ai: 'Instant, 24/7 monitoring', icon: 'Clock2' },
        { metric: 'Content Scheduling', manual: 'Requires manual posting or third-party tools', ai: 'Integrated, intelligent scheduling', icon: 'Briefcase' },
        { metric: 'Lead Capture', manual: 'Manually identifying promising comments', ai: 'Flags high-intent comments for follow-up', icon: 'Sparkles' },
      ],
      synergy: [
        { tool: "Instagram Content Creator", benefit: "Automatically schedule the 7-day content plan generated by the creator tool." },
        { tool: "WhatsApp Manager", benefit: "When a high-intent comment is flagged, automatically send a personalized follow-up message on WhatsApp." }
      ],
      faqs: [
        { question: "Will the AI post on my behalf automatically?", answer: "You have full control. You can set it to draft posts for your approval, or you can enable fully automated posting for certain types of content." },
        { question: "How does it know how to reply to comments?", answer: "It uses your private knowledge base (brochures, price lists) to answer common questions accurately. For complex or sensitive queries, it will flag the comment for your personal attention." },
        { question: "Can it handle direct messages (DMs)?", answer: "Yes, the tool can be configured to manage your Instagram DMs, answering common questions and filtering high-priority conversations for you to handle personally." }
      ],
    },
    creationFields: [
       { id: 'task', name: 'Task', type: 'text', placeholder: 'e.g., "Draft 3 replies to a comment asking about price"', description: 'What do you want the AI admin to do?' },
       { id: 'context', name: 'Context (Optional)', type: 'textarea', placeholder: 'e.g., Paste the comment text here, or provide a topic for a content schedule.', description: 'Provide any relevant text or information for the task.' },
    ],
  },
  {
    id: 'story-planner-ai',
    title: 'Story Planner',
    dashboardTitle: 'Story Planner',
    description: 'Plan and design animated Instagram stories.',
    icon: 'Film',
    color: '#a855f7',
    cta: 'Generate Story',
    categories: ['Creative', 'Social & Comms'],
    mindMapCategory: 'Meta Ads AI Suite',
    badge: 'SOON',
    href: '/dashboard/tool/story-planner-ai',
    guideHref: '/blog/story-planner-ai',
    details: {
      steps: [
        { text: 'Select a project to source photos', icon: 'Briefcase' },
        { text: 'Choose a vibe and a call to action', icon: 'Palette' },
        { text: 'AI generates an animated, multi-slide story', icon: 'Sparkles' },
      ],
      aiVsManual: [
        { metric: 'Design Time', manual: '30-60 minutes in Canva/etc.', ai: 'Seconds to generate', icon: 'Clock2' },
        { metric: 'Storyboarding', manual: 'Requires creative planning', ai: 'Generates a coherent narrative sequence', icon: 'BrainCircuit' },
        { metric: 'Consistency', manual: 'Different apps for each part', ai: 'One unified, professionally designed output', icon: 'BadgeCheck' },
      ],
      synergy: [
        { tool: "Reel Ads", benefit: "Repurpose the best clips from your reel into an interactive story with polls and Q&As." },
        { tool: "Landing Page Builder", benefit: "End your story with a 'Swipe Up' link that goes directly to your newly generated landing page." },
      ],
      faqs: [
        { question: "Can I add polls or quizzes to the story?", answer: "Yes, you can instruct the AI to include interactive elements like polls, quizzes, and question stickers to boost engagement." },
        { question: "Does it use my brand fonts and colors?", answer: "Yes, the Story Planner will use the logo, colors, and fonts defined in your Brand Kit to ensure every story is perfectly on-brand." },
        { question: "What if my project has no photos?", answer: "If no photos are available, the AI can generate high-quality, relevant stock images or use animated text and graphics to create a compelling visual story." }
      ],
    },
    creationFields: [
       { id: 'projectId', name: 'Project', type: 'select', options: ['Emaar Beachfront', 'Damac Hills 2', 'Sobha Hartland', 'Add New Project...'], placeholder: 'Select a project', description: 'Choose the project to source photos from.' },
       { id: 'vibe', name: 'Vibe', type: 'select', options: ['Modern & Edgy', 'Elegant & Luxurious', 'Informative & Clean', 'Playful & Bright'], placeholder: 'Select a vibe', description: 'The desired visual style for the story.' },
       { id: 'callToAction', name: 'Call to Action', type: 'text', placeholder: 'e.g., "Swipe up to book a viewing!"', description: 'The final message for your story.' },
    ],
  },
  {
    id: 'instagram-content-creator',
    title: 'Social Content Creator',
    dashboardTitle: 'Social Content Creator',
    description: 'Generate a 7-day social content plan from a single topic, powered by your data.',
    icon: 'Share2',
    color: '#ea580c',
    cta: 'Generate Content Strategy',
    categories: ['Marketing', 'Creative', 'Social & Comms'],
    mindMapCategory: 'Marketing',
    isPage: false,
    href: '/dashboard/tool/instagram-content-creator',
    guideHref: '/blog/instagram-content-creator',
    details: {
        steps: [
            { text: 'Choose a knowledge base (data store)', icon: 'Database' },
            { text: 'Enter your content topic or theme', icon: 'PenTool' },
            { text: 'Get a full 7-day plan with posts and hashtags', icon: 'ClipboardList' },
        ],
        aiVsManual: [
            { metric: 'Planning Time', manual: '2-3 hours per week', ai: 'Fast by default', icon: 'Clock2' },
            { metric: 'Content Variety', manual: 'Tends to be repetitive', ai: 'Generates diverse daily themes and angles', icon: 'Sparkles' },
            { metric: 'Hashtag Research', manual: 'Time-consuming and often ineffective', ai: 'Creates a tiered, data-driven strategy', icon: 'LineChart' },
        ],
        synergy: [
            { tool: "Landing Page Builder", benefit: "Create posts that drive traffic directly to your newly generated landing page." },
            { tool: "Instagram Admin", benefit: "Automatically schedule your entire 7-day content plan for hands-free social media management." }
        ],
        faqs: [
            { question: "Can I edit the generated posts?", answer: "Yes, the generated content is a starting point. You can edit, remove, or add posts to the plan before you schedule them." },
            { question: "What is a 'Data Store'?", answer: "It's a knowledge base you can create in Vertex AI. You can upload your own documents, websites, and data to it. When you select a data store, the AI will use that information as the primary source for generating content, making it highly relevant to your business." },
            { question: "How does it decide on the daily themes?", answer: "The AI uses a proven content marketing framework, mixing promotional content with educational, engaging, and behind-the-scenes posts to keep your audience interested and build community." }
        ]
    },
    creationFields: [
        { id: 'dataStore', name: 'Data Store', type: 'select', options: ['None (General Knowledge)', 'MarketMedia-Lib', 'SuperSeller', 'Watcher'], placeholder: 'Select a data store', description: 'The knowledge base the AI will use to write content.' },
        { id: 'topic', name: 'Topic or Theme', type: 'text', placeholder: 'e.g., "The benefits of living in Dubai Marina"', description: 'The core idea for your content plan.' },
        { id: 'platform', name: 'Platform', type: 'select', options: ['Instagram', 'Facebook', 'LinkedIn', 'Twitter'], placeholder: 'Select a platform', description: 'The platform you are creating content for.' },
        { id: 'tone', name: 'Tone of Voice', type: 'select', options: ['Professional', 'Friendly', 'Humorous', 'Authoritative'], placeholder: 'Select a tone', description: 'Set the tone for the generated posts.' },
    ],
},
  {
    id: 'email-creator',
    title: 'Email Campaigns',
    dashboardTitle: 'Email Campaigns',
    description: 'Design, write, and schedule.',
    icon: 'Mail',
    color: '#0ea5e9', 
    cta: 'Send Email Campaign',
    categories: ['Marketing', 'Social & Comms', 'Sales Tools'],
    mindMapCategory: 'Marketing',
    badge: 'SOON',
    href: '/dashboard/tool/email-creator',
    guideHref: '/blog/email-creator',
    details: {
      steps: [
        { text: 'Define your campaign goal (e.g., New Listing)', icon: 'Target' },
        { text: 'Provide a link or topic for content', icon: 'PenTool' },
        { text: 'Generate a sequence of emails instantly', icon: 'Mail' },
      ],
      aiVsManual: [
        { metric: 'Writing Time', manual: '2-4 hours for a 3-part sequence', ai: 'Fast by default', icon: 'Clock2' },
        { metric: 'Design & Layout', manual: 'Requires knowledge of email builders', ai: 'Generates clean, mobile-friendly HTML', icon: 'Sparkles' },
        { metric: 'Subject Lines', manual: 'Guesswork, low open rates', ai: 'A/B tested variations for high engagement', icon: 'BadgeCheck' },
      ],
      synergy: [
        { tool: "Market Reports", benefit: "Generate a local report, then use this tool to create an email campaign to share it with your list." },
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
    id: 'youtube-video-editor',
    title: 'AI YouTube Video Editor',
    dashboardTitle: 'YouTube Video Editor',
    description: 'Edit any video to be YouTube-ready.',
    icon: 'Youtube',
    color: '#ef4444', 
    cta: 'Edit YouTube Video',
    categories: ['Creative', 'Editing', 'Social & Comms'],
    mindMapCategory: 'Creative Suite',
    badge: 'NEW',
    isPage: true,
    href: '/dashboard/tool/youtube-video-editor',
    guideHref: '/blog/youtube-video-editor',
    details: {
      steps: [
        { text: 'Upload your source video file', icon: 'Upload' },
        { text: 'Provide instructions for editing', icon: 'PenTool' },
        { text: 'AI generates a new, edited video file', icon: 'Sparkles' },
      ],
      aiVsManual: [
        { metric: 'Editing Time', manual: 'Hours in complex software like Final Cut', ai: 'Minutes, based on your instructions', icon: 'Clock2' },
        { metric: 'Software Cost', manual: 'Expensive video editing software', ai: 'Included in your subscription', icon: 'Wallet' },
        { metric: 'Ease of Use', manual: 'Steep learning curve', ai: 'As simple as writing an email', icon: 'Sparkles' },
      ],
      synergy: [
        { tool: "Reel Ads", benefit: "Combine your best-performing short-form reels into a longer YouTube video tour." },
        { tool: "Landing Page Builder", benefit: "Embed your newly edited YouTube video directly into a project landing page." }
      ],
      faqs: [
        { question: "What kind of edits can I request?", answer: "You can ask for a wide range of edits, such as trimming the video, adding text overlays and titles, applying color correction, adding background music, or creating a highlight reel." },
        { question: "Can it generate a video from just photos?", answer: "This specific tool is for editing existing video files. To create a video from photos, please use the 'Reel Ads' or 'Story Planner' tools." },
        { question: "What is the maximum video length I can upload?", answer: "The maximum upload size and length depend on your subscription plan, but the tool is optimized for typical real estate video lengths (up to 10-15 minutes)." }
      ],
    },
    creationFields: [],
  },
  {
    id: 'landing-pages',
    title: 'Landing Page Builder',
    dashboardTitle: 'Landing Pages',
    description: 'Launch a high-converting page in minutes.',
    icon: 'LayoutTemplate',
    color: '#22c55e', 
    cta: 'Create Landing Page',
    categories: ['Creative', 'Web'],
    mindMapCategory: 'Creative Suite',
    isPage: true,
    href: '/dashboard/tool/landing-pages',
    guideHref: '/blog/landing-pages',
    details: {
      steps: [
        { text: 'Provide project details', icon: 'PenTool' },
        { text: 'Choose a style or provide inspiration', icon: 'Palette' },
        { text: 'Generate a complete landing page with a lead form', icon: 'LayoutTemplate' },
      ],
      aiVsManual: [
         { metric: 'Time to Build', manual: '1-2 days using a website builder', ai: 'Fast by default', icon: 'Clock2' },
         { metric: 'Technical Skill', manual: 'Requires web design &amp; dev knowledge', ai: 'None. Just provide the source.', icon: 'Sparkles' },
         { metric: 'Features', manual: 'Lead forms, galleries added manually', ai: 'All features included automatically', icon: 'BadgeCheck' },
      ],
      synergy: [
        { tool: "Social Writer", benefit: "Generate promotional posts to drive traffic to your new landing page." },
        { tool: "Ad Creator", benefit: "Run a targeted ad campaign that clicks through to your beautiful new page." }
      ],
       faqs: [
        { question: "Can I use my own domain name?", answer: "Yes, you can connect your own custom domain name to the landing pages you create, ensuring a fully branded experience for your visitors." },
        { question: "Are the landing pages mobile-friendly?", answer: "Absolutely. Every landing page generated is fully responsive and looks great on all devices, from desktops to smartphones." },
        { question: "Is it optimized for SEO?", answer: "Yes. The AI automatically generates SEO-friendly titles, meta descriptions, and image alt-tags to help your page rank better on search engines." }
      ],
    },
    creationFields: [],
  },
  {
    id: 'rebranding',
    title: 'Automated Rebranding',
    dashboardTitle: 'Rebranding',
    description: 'Upload any brochure and apply your brand identity with text-based commands in the Creative Canvas.',
    icon: 'Palette',
    color: '#f97316', 
    cta: 'Rebrand a Document',
    categories: ['Creative', 'Editing'],
    mindMapCategory: 'Creative Suite',
    badge: 'NEW',
    isPage: true,
    href: '/dashboard/tool/rebranding',
    guideHref: '/blog/rebranding',
    details: {
      steps: [
        { text: 'Upload any developer\'s brochure (PDF)', icon: 'Upload' },
        { text: 'The AI applies your saved brand settings', icon: 'UserCog' },
        { text: 'Download the rebranded brochure instantly', icon: 'FileText' },
      ],
      aiVsManual: [
         { metric: 'Time to Rebrand', manual: '2-4 hours in design software', ai: 'Fast by default', icon: 'Clock2' },
         { metric: 'Required Skill', manual: 'Proficiency in Adobe InDesign/Canva', ai: 'Ability to upload a file', icon: 'Sparkles' },
         { metric: 'Consistency', manual: 'Prone to human error and typos', ai: 'Perfectly consistent every time', icon: 'BadgeCheck' },
      ],
      synergy: [
        { tool: "Ad Creator", benefit: "Use your newly rebranded brochure to power an ad campaign." },
        { tool: "Landing Page Builder", benefit: "Generate a branded landing page that perfectly matches your rebranded brochure." }
      ],
       faqs: [
        { question: "Will this work with any PDF?", answer: "It works best with text-based PDFs, which are standard for most property brochures. It may be less effective on image-only PDFs or scans." },
        { question: "What if I don't have a logo?", answer: "No problem. The tool can generate a professional logo for you based on your company name and brand colors, or simply add your name and contact information in a clean format." },
        { question: "Can it change the text to match my 'brand voice'?", answer: "Yes, you can specify a tone (e.g., 'professional,' 'friendly,' 'luxurious'), and the AI can subtly adjust headings and key phrases to align with your brand's voice." }
      ],
    },
    creationFields: [],
  },
  {
    id: 'pdf-editor',
    title: 'Visual PDF Editor',
    dashboardTitle: 'PDF Editor',
    description: 'This tool is deprecated. Use the new Rebranding tool instead.',
    icon: 'Edit',
    color: '#eab308', 
    cta: 'Edit a PDF',
    categories: ['Creative', 'Editing'],
    mindMapCategory: 'Creative Suite',
    badge: 'NEW',
    isPage: true,
    href: '/dashboard/tool/pdf-editor',
    guideHref: '/blog/pdf-editor',
    details: {
      steps: [
        { text: 'Upload your PDF document', icon: 'Upload' },
        { text: 'Pages are displayed as interactive cards', icon: 'LayoutTemplate' },
        { text: 'Click a page to edit it in the Creative Canvas', icon: 'Sparkles' },
      ],
      aiVsManual: [
         { metric: 'Time to Edit', manual: 'Hours finding source files or using clunky editors', ai: 'Fast, intuitive, and visual', icon: 'Clock2' },
         { metric: 'Software Cost', manual: 'Requires expensive Acrobat Pro subscription', ai: 'Included in your suite', icon: 'Wallet' },
         { metric: 'Ease of Use', manual: 'Complex tools and formatting issues', ai: 'As easy as clicking on a page', icon: 'Sparkles' },
      ],
      synergy: [
        { tool: "Rebranding", benefit: "After rebranding a brochure, use the editor to make final visual tweaks to pricing or contact info." },
        { tool: "Listing Generator", benefit: "Generate a new listing description and then use the editor to visually place it into your existing brochure." }
      ],
       faqs: [
        { question: "Can it change complex layouts?", answer: "For best results, focus on targeted edits like text and images. The AI can make layout adjustments within the canvas, but complex redesigns are better suited for the Landing Page Generator." },
        { question: "What happens when I save?", answer: "When you save the final PDF, the AI compiles all your changes—reordered pages, deleted pages, and edits made in the canvas—into a new, final PDF document." },
        { question: "What is the 'Creative Canvas'?", answer: "It's a slide-out panel that provides a focused workspace for editing a specific asset, like a single page of a PDF, without leaving your main workflow." }
      ],
    },
    creationFields: [], 
  },
  {
    id: 'brochure-translator',
    title: 'Brochure Translator',
    dashboardTitle: 'Brochure Translator',
    description: 'Translate any brochure to multiple languages in seconds.',
    icon: 'Languages',
    color: '#8b5cf6', 
    cta: 'Translate Brochure',
    categories: ['Creative', 'Editing', 'Sales Tools'],
    mindMapCategory: 'Creative Suite',
    href: '/dashboard/tool/brochure-translator',
    guideHref: '/blog/brochure-translator',
    details: {
      steps: [
        { text: 'Upload your PDF brochure', icon: 'Upload' },
        { text: 'Select the target language', icon: 'Languages' },
        { text: 'AI generates a new, translated PDF', icon: 'FileText' },
      ],
      aiVsManual: [
        { metric: 'Time to Translate', manual: 'Days or weeks with translators & designers', ai: 'Minutes', icon: 'Clock2' },
        { metric: 'Cost', manual: 'Hundreds of dollars per document', ai: 'Included in your subscription', icon: 'Wallet' },
        { metric: 'Layout Preservation', manual: 'Designer must re-layout the entire document', ai: 'AI attempts to preserve the original design', icon: 'Sparkles' },
      ],
      synergy: [
        { tool: "Landing Page Builder", benefit: "Create a landing page in the same language as your translated brochure for a fully localized campaign." },
        { tool: "Audience Creator", benefit: "Target audiences based on language preference and serve them ads with your newly translated materials." },
      ],
      faqs: [
        { question: "How accurate is the translation?", answer: "Our AI uses advanced neural machine translation models to provide high-quality, fluent translations. While very accurate, for legally binding documents, we always recommend a final review by a native speaker." },
        { question: "Does it work with any language?", answer: "We are continuously adding support for more languages. The initial launch supports major global languages relevant to the international real estate market." },
        { question: "What happens to the design and images?", answer: "The AI is designed to be 'layout-aware'. It translates the text in-place, aiming to keep all your images, logos, and design elements exactly where they are." }
      ],
    },
    creationFields: [
      { id: 'brochureDataUri', name: 'Source Brochure', type: 'file', description: 'Upload the PDF brochure you want to translate.' },
      { id: 'targetLanguage', name: 'Target Language', type: 'select', options: ['Arabic', 'English', 'Chinese', 'Russian', 'French', 'Italian', 'Spanish', 'Japanese'], placeholder: 'Select a language', description: 'Choose the language to translate into.' },
    ],
  },
  {
    id: 'listing-manager',
    title: 'Listing Manager',
    dashboardTitle: 'Listing Manager',
    description: 'Your central hub to create, manage, and syndicate your property listings to all major portals.',
    icon: 'Building',
    color: '#0891b2',
    cta: 'Manage Listings',
    categories: ['Listing Intelligence AI', 'Sales Tools', 'Editing', 'Web'],
    mindMapCategory: 'Listing Intelligence AI',
    badge: 'NEW',
    isPage: true,
    href: '/dashboard/tool/listing-manager',
    guideHref: '/blog/listing-manager',
    details: {
      steps: [
        { text: 'Select a project from your library', icon: 'Briefcase' },
        { text: 'AI pre-fills all listing details', icon: 'Sparkles' },
        { text: 'Customize for each portal & generate a "Rollflow Plan"', icon: 'PenTool' },
      ],
      aiVsManual: [
        { metric: 'Listing Creation', manual: 'Manually entering data into multiple portals', ai: 'Create once, customize, then syndicate everywhere', icon: 'Clock2' },
        { metric: 'Consistency', manual: 'Risk of different data on different portals', ai: 'A single source of truth for each listing', icon: 'BadgeCheck' },
        { metric: 'Updating Listings', manual: 'Logging in to each portal to make one change', ai: 'Update in the manager, then re-sync to all portals', icon: 'Network' },
      ],
      synergy: [
        { tool: "Property Finder Sync & Bayut Sync", benefit: "The Listing Manager generates the plans that these 'Pilot' tools execute, creating a seamless workflow." },
        { tool: "Listing Generator", benefit: "Use the Generator to craft the perfect description, then use the Manager to place it in the right fields for each portal." },
      ],
      faqs: [
        { question: "Which portals will this support?", answer: "The initial version will generate plans for Property Finder and Bayut, with more portals being added based on user demand." },
        { question: "What is a 'Rollflow Plan'?", answer: "It's a machine-readable code (JSON) that contains all the finalized data for your listing. You copy this plan and paste it into the specific 'Sync' tool (e.g., Bayut Pilot) to execute the listing." },
        { question: "Why not just publish directly?", answer: "This 'Planner' -> 'Terminal' architecture is more powerful and secure. It allows us to have one smart app for content creation (the Manager) and separate, simple apps for the technical job of publishing, which is a more robust system." }
      ],
    },
    creationFields: [],
  },
  {
    id: 'listing-performance',
    title: 'Listing Performance',
    dashboardTitle: 'Listing Performance',
    description: 'Track listing views and performance.',
    icon: 'BarChart',
    color: '#ef4444',
    cta: 'View Performance',
    categories: ['Listing Intelligence AI', 'Sales Tools', 'Lead Gen', 'Ads'],
    mindMapCategory: 'Listing Intelligence AI',
    isPage: true,
    href: '/dashboard/tool/listing-performance',
    guideHref: '/blog/listing-performance',
    details: {
      steps: [
        { text: 'Connect your listings portals (e.g. Google Search Console)', icon: 'Link' },
        { text: 'The tool tracks views and visitor types', icon: 'Users2' },
        { text: 'Get reports to optimize your listings and ads', icon: 'LineChart' },
      ],
      aiVsManual: [
        { metric: 'Performance Insight', manual: 'Guessing which listings are popular', ai: 'Hard data on what buyers are looking at', icon: 'Sparkles' },
        { metric: 'Bot Filtering', manual: 'Unable to distinguish bot traffic', ai: 'Advanced filtering for true visitor counts', icon: 'BadgeCheck' },
        { metric: 'Ad Strategy', manual: 'Boosting listings based on intuition', ai: 'Promoting listings with proven organic interest', icon: 'BrainCircuit' },
      ],
      synergy: [
        { tool: "Campaign Builder", benefit: "Create ad campaigns that specifically boost your top-performing organic listings for maximum ROI." },
        { tool: "Listing Manager", benefit: "Use the performance data to refine and improve your underperforming listings." }
      ],
      faqs: [
        { question: "How does it track views?", answer: "The tool integrates with web analytics services like Google Search Console to track clicks and impressions on your listings across different portals." },
        { question: "What is 'bot traffic'?", answer: "A significant portion of web traffic comes from automated web crawlers (bots) from search engines and other services. Our tool filters this out to show you how many actual potential buyers are viewing your listings." },
        { question: "How does this help my ad strategy?", answer: "By identifying which of your listings get the most organic views, you know which properties have the highest natural interest. Creating ads for these properties is often more effective and cost-efficient than promoting less popular ones." }
      ],
    },
    creationFields: [],
  },
  {
    id: 'listing-generator',
    title: 'Listing Generator',
    dashboardTitle: 'Listing Generator',
    description: 'Craft perfect listings for portals like Property Finder, Bayut, and Dubizzle.',
    icon: 'Building',
    color: '#10b981',
    cta: 'Create Listing',
    categories: ['Listing Intelligence AI', 'Sales Tools', 'Editing', 'Web'],
    mindMapCategory: 'Listing Intelligence AI',
    badge: 'SOON',
    href: '/dashboard/tool/listing-generator',
    guideHref: '/blog/bayut-listing-ai',
    details: {
      steps: [
        { text: 'Enter key property details (address, beds, baths)', icon: 'PenTool' },
        { text: 'Mention 1-2 unique features', icon: 'Sparkles' },
        { text: 'Generate a full, persuasive listing description', icon: 'FileText' },
      ],
      aiVsManual: [
        { metric: 'Writing Time', manual: '30-60 minutes of creative writing', ai: 'Fast by default', icon: 'Clock2' },
        { metric: 'SEO &amp; Keywords', manual: 'Guesswork on what terms to use', ai: 'Automatically includes relevant local keywords', icon: 'Sparkles' },
        { metric: 'Completeness', manual: 'Often forgets key selling points', ai: 'Structured to include all critical information', icon: 'BadgeCheck' },
      ],
      synergy: [
        { tool: "Ad Creator", benefit: "Use your new listing description as the source material for a targeted ad campaign." },
        { tool: "Landing Page Builder", benefit: "Instantly create a beautiful single-property website using your new listing details." }
      ],
       faqs: [
        { question: "Can I choose the tone of the listing?", answer: "Yes, you can specify a tone such as 'Luxurious,' 'Family-Friendly,' or 'Modern,' and the AI will adjust its language and emphasis accordingly." },
        { question: "Is the output ready to copy and paste?", answer: "Absolutely. The generated text is formatted to be easily copied and pasted directly into any listing portal." },
        { question: "How does it know what keywords to use for SEO?", answer: "The AI analyzes the property's location and features to include relevant local keywords (like neighborhood names, school districts, or nearby landmarks) that a potential buyer is likely to search for." }
      ],
    },
    creationFields: [
      { id: 'platform', name: 'Platform', type: 'select', options: ['Property Finder', 'Bayut', 'Dubizzle', 'Generic'], placeholder: 'Select a listing platform', description: 'The listing portal you are writing for.' },
      { id: 'propertyAddress', name: 'Property Address', type: 'text', placeholder: 'e.g., Villa 1, The Lakes, Dubai', description: 'The address of the a property.' },
      { id: 'keyDetails', name: 'Key Details', type: 'text', placeholder: 'e.g., 5 beds, 6 baths, 4,500 sqft', description: 'Provide the basic stats.' },
      { id: 'uniqueFeatures', name: 'Unique Features', type: 'textarea', placeholder: 'e.g., Upgraded interior, private pool, lake view', description: 'What makes this property special?' },
      { id: 'tone', name: 'Tone', type: 'select', options: ['Luxury', 'Family-Friendly', 'Modern', 'Cozy', 'Urgent'], placeholder: 'Select a tone', description: 'The tone of voice for the listing.' },
    ],
  },
  {
    id: 'price-estimator',
    title: 'AI Price Estimator',
    dashboardTitle: 'AI Price Estimator',
    description: 'Get an AI-powered price estimate for any property.',
    icon: 'Wallet',
    color: '#16a34a',
    cta: 'Estimate Price',
    categories: ['Sales Tools', 'Utilities', 'Market Library'],
    mindMapCategory: 'Sales Enablement',
    badge: 'NEW',
    href: '/dashboard/tool/price-estimator',
    details: {
      steps: [
        { text: 'Enter property details like location, size, and beds/baths', icon: 'PenTool' },
        { text: 'AI compares it to thousands of recent sales using an ML model', icon: 'BrainCircuit' },
        { text: 'Receive an estimated price and a likely confidence range', icon: 'ClipboardList' },
      ],
      aiVsManual: [
        { metric: 'Time to Value', manual: 'Hours searching portals for comps', ai: 'Instantaneous estimation', icon: 'Clock2' },
        { metric: 'Accuracy', manual: 'Based on a few manually selected comps', ai: 'Analyzes a vast dataset of comparable sales', icon: 'BadgeCheck' },
        { metric: 'Client Trust', manual: 'Appears subjective', ai: 'A data-driven estimate builds client confidence', icon: 'Sparkles' },
      ],
      synergy: [
        { tool: 'Market Reports', benefit: 'Include the price estimation directly in your market reports to provide a complete picture.' },
        { tool: 'Offer Generator', benefit: 'Use the AI estimate to justify your offer price in the multi-offer comparison document.' },
      ],
      faqs: [
        { question: "Where does the data come from?", answer: "The AI model is trained on a massive dataset of historical property transactions from public records (like the DLD) and data from major listing portals." },
        { question: "How accurate is the estimate?", answer: "It's a highly educated estimate, not a formal appraisal. It's designed to give you a strong starting point for your own comparative market analysis (CMA) and to help manage client expectations." },
        { question: "Can I use this for any city?", answer: "The initial version of the model is fine-tuned for the Dubai real estate market. Support for other major international markets is on our roadmap." }
      ],
    },
    creationFields: [
      { id: 'location', name: 'Location', type: 'text', placeholder: 'e.g., Dubai Marina', description: 'The neighborhood or area of the property.' },
      { id: 'propertyType', name: 'Property Type', type: 'select', options: ['Apartment', 'Villa', 'Townhouse', 'Penthouse'], placeholder: 'Select property type', description: 'The type of property.' },
      { id: 'bedrooms', name: 'Bedrooms', type: 'number', placeholder: 'e.g., 2', description: 'Number of bedrooms (0 for studio).' },
      { id: 'bathrooms', name: 'Bathrooms', type: 'number', placeholder: 'e.g., 3', description: 'Number of bathrooms.' },
      { id: 'squareFootage', name: 'Square Footage', type: 'number', placeholder: 'e.g., 1500', description: 'Total area in sq. ft.' },
      { id: 'age', name: 'Property Age (years)', type: 'number', placeholder: 'e.g., 5', description: 'How old is the building?' },
      { id: 'condition', name: 'Condition', type: 'select', options: ['New', 'Upgraded', 'Standard'], placeholder: 'Select condition', description: 'The condition of the property\'s interior.' },
    ],
  },
  {
    id: 'commission-calculator',
    title: 'Commission Calculator',
    dashboardTitle: 'Commission Calculator',
    description: 'Instantly calculate your sales commission.',
    icon: 'Percent',
    color: '#16a34a',
    cta: 'Calculate Commission',
    categories: ['Sales Tools', 'Utilities'],
    mindMapCategory: 'Sales Enablement',
    badge: 'NEW',
    href: '/dashboard/tool/commission-calculator',
    details: {
      steps: [
        { text: 'Enter the final sale price of the property', icon: 'Wallet' },
        { text: 'The tool instantly calculates your gross commission', icon: 'Sparkles' },
        { text: 'View the breakdown for clarity', icon: 'ClipboardList' },
      ],
      aiVsManual: [
        { metric: 'Calculation Speed', manual: 'Seconds on a calculator app', ai: 'Instantaneous within your workflow', icon: 'Clock2' },
        { metric: 'Accuracy', manual: 'Potential for typos', ai: 'Always accurate', icon: 'BadgeCheck' },
        { metric: 'Integration', manual: 'Requires switching apps', ai: 'Integrated directly into your sales suite', icon: 'Network' },
      ],
      synergy: [
        { tool: "CRM Memory", benefit: "Log the final commission amount directly to the client's deal record in your CRM." },
        { tool: "Offer Generator", benefit: "Quickly calculate potential commission when preparing offers for clients." },
      ],
      faqs: [
        { question: "Is the commission rate adjustable?", answer: "The initial version can be adjusted. More advanced fee and split calculations are on our roadmap." },
        { question: "Can this calculate splits or brokerage fees?", answer: "Not at this time. This tool is designed for a quick, straightforward gross commission calculation. More advanced financial tools are planned for the future." },
      ],
    },
    creationFields: [
      { id: 'salePrice', name: 'Sale Price (AED)', type: 'number', placeholder: 'e.g., 2500000', description: 'The final sale price of the property.' },
    ],
  },
  {
    id: 'payment-planner',
    title: 'Payment Planner',
    dashboardTitle: 'Payment Planner',
    description: 'Generate tailored payment plans for off-plan properties.',
    icon: 'Calendar',
    color: '#0ea5e9',
    cta: 'Generate Plan',
    categories: ['Sales Tools', 'Utilities'],
    mindMapCategory: 'Sales Enablement',
    badge: 'NEW',
    href: '/dashboard/tool/payment-planner',
    guideHref: '/blog/payment-planner',
    details: {
      steps: [
        { text: 'Select a project from your library', icon: 'Briefcase' },
        { text: 'Enter the total property price', icon: 'Wallet' },
        { text: 'AI generates a clear, milestone-based payment plan', icon: 'Sparkles' },
      ],
      aiVsManual: [
        { metric: 'Plan Creation Time', manual: '30-60 minutes in a spreadsheet', ai: 'Seconds to generate', icon: 'Clock2' },
        { metric: 'Clarity', manual: 'Can be confusing for clients', ai: 'Generates a simple, easy-to-read schedule', icon: 'BadgeCheck' },
        { metric: 'Customization', manual: 'Rigid spreadsheet formulas', ai: 'Can create multiple flexible options', icon: 'Wrench' },
      ],
      synergy: [
        { tool: "Offer Generator", benefit: "Include the AI-generated payment plan directly in your offer package to the client." },
        { tool: "CRM Memory", benefit: "Save the final payment plan to the client's record for future reference and follow-ups." }
      ],
      faqs: [
        { question: "Can it handle different payment structures?", answer: "Yes, you can specify different structures, such as post-handover plans, 50/50, or construction-linked plans, and the AI will adapt." },
        { question: "Can I export the payment plan?", answer: "Yes, the generated plan can be exported as a formatted PDF to share directly with your client." },
      ],
    },
    creationFields: [
      { id: 'projectId', name: 'Project', type: 'select', options: ['Emaar Beachfront', 'Damac Hills 2', 'Sobha Hartland', 'Add New Project...'], placeholder: 'Select a project', description: 'The project the payment plan is for.' },
      { id: 'totalPrice', name: 'Total Property Price (AED)', type: 'number', placeholder: 'e.g., 3000000', description: 'The full price of the unit.' },
      { id: 'planType', name: 'Payment Plan Type', type: 'select', options: ['Standard (e.g., 20/80)', 'Post-Handover', 'Construction-Linked', 'Flexible (AI Suggestion)'], placeholder: 'Select a plan type', description: 'The structure of the payment plan.' },
    ],
  },
  {
    id: 'investor-matching',
    title: 'Investor Matching',
    dashboardTitle: 'Investor Matching',
    description: 'Pair budgets with the right projects.',
    icon: 'Users2',
    color: '#6366f1', 
    cta: 'Generate Investor Match',
    categories: ['Sales Tools', 'Lead Gen'],
    mindMapCategory: 'Sales Enablement',
    badge: 'SOON',
    href: '/dashboard/tool/investor-matching',
    guideHref: '/blog/investor-matching',
    details: {
      steps: [
        { text: 'Provide details on a new investment property', icon: 'Building' },
        { text: 'The AI scans your client database for matches', icon: 'Search' },
        { text: 'Get a ranked list of best-fit investors', icon: 'ClipboardList' },
      ],
      aiVsManual: [
        { metric: 'Time to Match', manual: 'Hours reviewing CRM and spreadsheets', ai: 'Fast by default', icon: 'Clock2' },
        { metric: 'Match Accuracy', manual: 'Relies on memory, may miss clients', ai: 'Data-driven, based on past deals &amp; stated goals', icon: 'Sparkles' },
        { metric: 'Personalization', manual: 'Generic email blast to all investors', ai: 'Generates personalized outreach for each match', icon: 'BadgeCheck' },
      ],
      synergy: [
        { tool: "CRM Memory", benefit: "The investor matcher uses the deep client knowledge from the CRM assistant to find non-obvious matches based on past conversations." },
        { tool: "Rebranding", benefit: "Instantly create a personalized, rebranded brochure of the property for each of the top investor matches." }
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
      { id: 'location', name: 'Location', type: 'text', placeholder: 'e.g., Dubai Marina, Dubai', description: 'City and state of the property.'},
      { id: 'price', name: 'Price', type: 'number', placeholder: 'e.g., 2500000', description: 'Asking price in the local currency.'},
      { id: 'capRate', name: 'Cap Rate (%)', type: 'number', placeholder: 'e.g., 6.5', description: 'The capitalization rate of the property.'},
      { id: 'investmentThesis', name: 'Investment Thesis', type: 'select', options: ["Value-Add / Renovation", "Turnkey Rental", "Long-Term Appreciation", "Development Opportunity", "1031 Exchange"], placeholder: 'Select investment strategy', description: 'Primary strategy for this investment.'},
      { id: 'keyFeatures', name: 'Key Features', type: 'textarea', placeholder: 'e.g., Long-term tenants in place, zoned for mixed-use, located in an opportunity zone.', description: 'Additional selling points for an investor.' },
    ],
  },
  {
    id: 'offer-generator',
    title: 'Multi-Offer Builder',
    dashboardTitle: 'Multi-Offer Builder',
    description: 'Compare options side-by-side.',
    icon: 'Briefcase',
    color: '#78716c', 
    cta: 'Create Offer Package',
    categories: ['Sales Tools', 'Editing'],
    mindMapCategory: 'Sales Enablement',
    badge: 'SOON',
    href: '/dashboard/tool/offer-generator',
    guideHref: '/blog/email-creator',
    details: {
      steps: [
        { text: 'Select multiple properties for the client', icon: 'Building' },
        { text: 'Input the client\'s budget and terms', icon: 'Wallet' },
        { text: 'Generate a professional offer comparison PDF', icon: 'FileText' },
      ],
      aiVsManual: [
        { metric: 'Document Creation Time', manual: '1-2 hours in Word or Excel', ai: 'Fast by default', icon: 'Clock2' },
        { metric: 'Accuracy', manual: 'Prone to copy-paste errors and typos', ai: 'Calculations and details are always accurate', icon: 'BadgeCheck' },
        { metric: 'Professionalism', manual: 'Inconsistent formatting', ai: 'Generates a clean, branded, client-ready document', icon: 'Sparkles' },
      ],
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
      { id: 'clientInfo', name: 'Client Info', type: 'text', placeholder: 'e.g., John Smith, Budget: AED 5.5M', description: 'Basic information about the client.' },
      { id: 'terms', name: 'Offer Terms', type: 'textarea', placeholder: 'e.g., 20% down, 30-day closing, inspection contingency', description: 'Key terms to include in the offers.' },
    ],
  },
  {
    id: 'whatsapp-campaigns',
    title: 'WhatsApp Manager',
    dashboardTitle: 'WhatsApp Manager',
    description: 'Personalized broadcasts + drips.',
    icon: 'Phone',
    color: '#16a34a', 
    cta: 'Send WhatsApp Campaign',
    categories: ['Sales Tools', 'Social & Comms', 'Lead Gen'],
    mindMapCategory: 'Sales Enablement',
    badge: 'SOON',
    href: '/dashboard/tool/whatsapp-campaigns',
    guideHref: '/blog/instagram-admin-ai',
    details: {
      steps: [
        { text: 'Upload your client contact list', icon: 'Upload' },
        { text: 'Draft your message or follow-up sequence', icon: 'PenTool' },
        { text: 'Send or schedule your campaign instantly', icon: 'Sparkles' },
      ],
      aiVsManual: [
        { metric: 'Time to Contact 100 Clients', manual: 'Hours of manual copy-pasting', ai: 'Fast by default', icon: 'Clock2' },
        { metric: 'Personalization', manual: 'Generic, prone to errors', ai: 'Personalized with [Name], [Property], etc.', icon: 'Sparkles' },
        { metric: 'Follow-up Consistency', manual: 'Easy to forget or miss someone', ai: 'Automated sequences ensure no lead is lost', icon: 'BadgeCheck' },
      ],
      synergy: [
        { tool: "Social Leads", benefit: "Directly import new leads and add them to an automated welcome message sequence on WhatsApp." },
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
    id: 'lead-investigator',
    title: 'Lead Investigator AI',
    dashboardTitle: 'Lead Investigator',
    description: 'Investigate any lead. Find their social profiles and professional history.',
    icon: 'Search',
    color: '#0284c7',
    cta: 'Investigate Lead',
    categories: ['Sales Tools', 'Lead Gen'],
    mindMapCategory: 'Sales Enablement',
    badge: 'NEW',
    isPage: true,
    href: '/dashboard/tool/lead-investigator',
    details: {
      steps: [
        { text: 'Provide a name, email, or company', icon: 'PenTool' },
        { text: 'AI scans public sources like LinkedIn, social media, etc.', icon: 'Network' },
        { text: 'Get a report with potential matches and profile links', icon: 'FileText' },
      ],
      aiVsManual: [
        { metric: 'Time to Research', manual: '15-30 minutes per lead', ai: 'Seconds', icon: 'Clock2' },
        { metric: 'Information Scope', manual: 'Limited to what you can find on Google', ai: 'Scans multiple platforms simultaneously', icon: 'Sparkles' },
        { metric: 'Accuracy', manual: 'Easy to find the wrong "John Smith"', ai: 'Uses multiple data points to increase match confidence', icon: 'BadgeCheck' },
      ],
      synergy: [
        { tool: "CRM Memory", benefit: "Enrich your CRM profiles with the data found by the investigator, giving your AI Assistant more context." },
        { tool: "Email Campaigns", benefit: "Tailor your email outreach based on the lead's professional background and interests discovered by the investigator." },
      ],
      faqs: [
        { question: "Is this legal and ethical?", answer: "Yes. The tool only searches publicly available information that anyone could find with manual searching. It simply automates the process to save you time. No private data is accessed." },
        { question: "What happens if there are multiple people with the same name?", answer: "The AI will return a list of the most likely matches and provide a confidence score for each, along with a summary (e.g., 'John Smith, CEO at Acme Corp' vs. 'John Smith, artist in New York'). You can then use this information to identify the correct person." },
        { question: "Can I use this to find contact information?", answer: "The tool is designed to find public profiles and professional information to help you understand your lead. While it may find publicly listed contact information, it is not primarily a contact-scraping tool." }
      ],
    },
    creationFields: [],
  },
    {
    id: 'market-reports',
    title: 'Market Reports',
    dashboardTitle: 'Market Reports',
    description: 'Generates PDF reports on market trends, pricing, and sentiment, turning raw data into client-ready insights.',
    icon: 'LineChart',
    color: '#f59e0b', 
    cta: 'Generate Market Report',
    categories: ['Market Library', 'Sales Tools', 'Editing'],
    mindMapCategory: 'Core Intelligence',
    badge: 'NEW',
    isPage: true,
    href: '/dashboard/tool/market-reports',
    guideHref: '/blog/market-reports',
    details: {
      steps: [
        { text: 'Enter a neighborhood or address', icon: 'MapPin' },
        { text: 'Select report type (e.g., buyer, seller, investor)', icon: 'Search' },
        { text: 'Generate a branded, data-rich PDF report', icon: 'FileText' },
      ],
      aiVsManual: [
        { metric: 'Time to Create', manual: 'Hours pulling MLS data and designing', ai: 'Fast by default', icon: 'Clock2' },
        { metric: 'Data Scope', manual: 'Limited to basic MLS stats', ai: 'Includes supply/demand, price trends, sentiment', icon: 'Sparkles' },
        { metric: 'Branding', manual: 'Requires manual design work', ai: 'Automatically branded with your logo &amp; colors', icon: 'BadgeCheck' },
      ],
      synergy: [
        { tool: "Landing Page Builder", benefit: "Create a landing page with a lead form to download your hyper-local market report." },
        { tool: "Social Writer", benefit: "Generate a week's worth of posts summarizing the key findings from your new report." }
      ],
       faqs: [
        { question: "Where does the market data come from?", answer: "Our AI synthesizes data from multiple trusted sources, including public records, MLS data feeds, and local economic indicators to provide a comprehensive and up-to-date market snapshot." },
        { question: "Can I customize the reports?", answer: "Yes, you can add your own commentary, select which sections to include, and ensure your branding is prominently displayed before finalizing the report." },
        { question: "How are these different from standard MLS reports?", answer: "While they use MLS data as a foundation, our AI reports add another layer of insight, analyzing trends, predicting future movements, and presenting the information in a client-friendly, easy-to-understand format." }
      ],
    },
    creationFields: [
      { id: 'location', name: 'Location', type: 'text', placeholder: 'e.g., "Dubai Marina, Dubai"', description: 'The neighborhood or city for the report.' },
      { id: 'propertyType', name: 'Property Type', type: 'text', placeholder: 'e.g., "2-bedroom apartments"', description: 'Specify a property type or focus for the report.' },
      { id: 'reportType', name: 'Report Type', type: 'select', options: ['Investor', 'Home Buyer', 'Seller'], placeholder: 'Select report audience', description: 'Tailor the report for a specific audience.' },
    ],
  },
  {
    id: 'market-trends',
    title: 'Market Trends Watcher',
    dashboardTitle: 'Market Trends Watcher',
    description: 'Synthesizes news and data to identify emerging market trends and sentiment before they become mainstream.',
    icon: 'TrendingUp',
    color: '#14b8a6', 
    cta: 'Analyze Trends',
    categories: ['Market Library', 'Sales Tools', 'Lead Gen'],
    mindMapCategory: 'Core Intelligence',
    badge: 'NEW',
    isPage: true,
    href: '/dashboard/tool/market-trends',
    guideHref: '/blog/market-reports',
    details: {
      steps: [
        { text: 'Define a location or market segment', icon: 'MapPin' },
        { text: 'AI analyzes news, social media, and data feeds', icon: 'BrainCircuit' },
        { text: 'Get a report on emerging trends and sentiment', icon: 'FileText' },
      ],
      aiVsManual: [
        { metric: 'Trend Spotting', manual: 'Reactive, based on news articles', ai: 'Proactive, identifies patterns before they are news', icon: 'Sparkles' },
        { metric: 'Time Investment', manual: 'Hours of reading and research', ai: 'Automated and continuous monitoring', icon: 'Clock2' },
        { metric: 'Competitive Edge', manual: 'Acting on old information', ai: 'First-mover advantage on new opportunities', icon: 'BadgeCheck' },
      ],
      synergy: [
        { tool: "Market Reports", benefit: "Incorporate the latest trends into your market reports to show you're on the cutting edge." },
        { tool: "Social Writer", benefit: "Generate content that discusses emerging trends, positioning you as a thought leader." }
      ],
      faqs: [
        { question: "How is this different from Market Reports?", answer: "Market Reports focuses on historical and current quantitative data (prices, sales volume). Market Trends is more qualitative, analyzing text and news to find emerging patterns and sentiment shifts that haven't shown up in the numbers yet." },
        { question: "Can I set up alerts for new trends?", answer: "Yes, you can create 'Watchers' for specific keywords or locations (e.g., 'new luxury development in Miami'), and the AI will alert you when it detects a significant new trend." },
        { question: "What kind of trends can it find?", answer: "It can identify things like rising interest in specific architectural styles, new zoning laws that could create opportunities, or shifts in buyer preferences towards certain amenities (like home offices or sustainable features)." }
      ],
    },
    creationFields: [],
  },
   {
    id: 'projects-finder',
    title: 'Market Library',
    dashboardTitle: 'Market Library',
    description: "Continuously scans public records and news to find off-market deals and development opportunities, feeding the central library.",
    icon: 'Search',
    color: '#fde047', 
    cta: 'Search Market Library',
    categories: ['Market Library', 'Sales Tools', 'Lead Gen'],
    mindMapCategory: 'Core Intelligence',
    badge: 'NEW',
    isPage: true,
    href: '/dashboard/tool/projects-finder',
    guideHref: '/blog/ai-brand-creator',
    details: {
      steps: [
        { text: 'Define your target area and criteria', icon: 'MapPin' },
        { text: 'AI scans public records and news for signals', icon: 'BrainCircuit' },
        { text: 'Get a report of potential off-market deals', icon: 'FileText' },
      ],
      aiVsManual: [
        { metric: 'Opportunity Sourcing', manual: 'Relies on word-of-mouth and existing network', ai: 'Scans thousands of data points continuously', icon: 'Network' },
        { metric: 'Time Investment', manual: 'Hours of manual research per week', ai: 'Automated, on-demand reports', icon: 'Clock2' },
        { metric: 'Deal Flow', manual: 'Limited and sporadic', ai: 'Consistent, proactive deal sourcing', icon: 'Sparkles' },
      ],
      synergy: [
        { tool: "Investor Matching", benefit: "Once a potential project is found, instantly match it with the right clients from your database." },
        { tool: "Market Reports", benefit: "Generate a detailed market analysis for a newly discovered project to validate its potential." }
      ],
      faqs: [
        { question: "What kind of projects can it find?", answer: "The AI can identify a range of opportunities, from single-lot development potential and fixer-uppers to larger plots suitable for multi-unit construction." },
        { question: "Where does the AI get its information?", answer: "The AI scans a wide array of public data sources, including permit applications, zoning changes, property records, and local news articles to find signals of potential development or sales." },
        { question: "Is this information verified?", answer: "The AI provides you with a list of potential leads and the source of the information. It is designed to be a powerful starting point for your own due diligence and outreach." }
      ],
    },
    creationFields: [
      { id: 'group-filters', name: 'Search Filters', type: 'group-header', description: 'Set your criteria to find relevant projects.'},
      { id: 'location', name: 'Location', type: 'text', placeholder: 'e.g., "Dubai Marina, Dubai" or "Zip code 12345"', description: 'The city, neighborhood, or zip code to search in.' },
      { id: 'status', name: 'Project Status', type: 'select', options: ["Ready to move", "Under Construction", "New Launch"], placeholder: 'Select a project status', description: 'Filter by the current stage of the project.' },
      { id: 'developer', name: 'Developer(s) (Optional)', type: 'text', placeholder: 'e.g., "Emaar", "Damac"', description: 'Focus on projects by specific developers.'},
      { id: 'minPrice', name: 'Min Price', type: 'number', placeholder: 'e.g., 500000', description: 'The minimum price for the project.' },
      { id: 'maxPrice', name: 'Max Price', type: 'number', placeholder: 'e.g., 2000000', description: 'The maximum price for the project.' },
      { id: 'setup', name: 'Configure Listing Websites', type: 'button', cta: 'Go to Settings to add Listing Sites', description: 'Add the primary listing websites for your market in the settings for better results.' },
    ],
  },
  {
    id: 'ai-brand-creator',
    title: 'Brand Creator',
    dashboardTitle: 'Brand Creator',
    description: "Configures your entire brand kit and project library by analyzing uploaded documents with a single command.",
    icon: 'Wrench',
    color: '#10b981', 
    cta: 'Create Brand Kit',
    categories: ['Sales Tools', 'Creative'],
    mindMapCategory: 'Core Intelligence',
    badge: 'NEW',
    href: '/dashboard/tool/ai-brand-creator',
    guideHref: '/blog/ai-brand-creator',
    details: {
      steps: [
        { text: 'Upload documents (brand guide, project lists)', icon: 'Upload' },
        { text: "Tell the assistant to set up your workspace", icon: 'Bot' },
        { text: 'The AI configures your brand, projects &amp; more', icon: 'Sparkles' },
      ],
      aiVsManual: [
        { metric: 'Setup Time', manual: '1-2 hours of manual data entry', ai: 'Under 5 minutes', icon: 'Clock2' },
        { metric: 'Accuracy', manual: 'Prone to typos and copy-paste errors', ai: 'Extracts data directly from source documents', icon: 'BadgeCheck' },
        { metric: 'Completeness', manual: 'Easy to forget details or projects', ai: 'Comprehensive setup from all provided files', icon: 'Sparkles' },
      ],
      synergy: [
        { tool: "AI Assistant", benefit: "This tool is a command for the AI assistant, showcasing its ability to perform administrative tasks." },
        { tool: "Brand Management", benefit: "The extracted brand information automatically populates your Brand Kit." }
      ],
      faqs: [
        { question: "What kind of documents work best?", answer: "Structured documents like brand guides (PDF), project lists (CSV or PDF), or even a simple Word document with your company details work great. The more structured the data, the better the extraction." },
        { question: "Will this overwrite my existing settings?", answer: "The AI will present you with the information it has extracted and ask for confirmation before applying any changes to your workspace." },
        { question: "Is this a one-time thing?", answer: "You can use this tool anytime you have new projects or updated brand information to quickly update your suite's configuration." }
      ],
    },
    creationFields: [
      { id: 'command', name: 'Command', type: 'text', placeholder: "e.g., Set up my brand and projects from these files.", description: "Tell the AI what you want to do." },
      { id: 'documents', name: 'Source Documents', type: 'file', multiple: true, description: 'Upload one or more files (PDF, CSV, TXT) for the AI to analyze.' },
    ],
  },
  {
    id: 'crm-assistant',
    title: 'CRM Memory',
    dashboardTitle: 'CRM Memory',
    description: 'The core data store of the "Brain". It remembers every client interaction, preference, and detail, making all other tools smarter.',
    icon: 'Database',
    color: '#0d9488', 
    cta: 'Get Client Record',
    categories: ['Sales Tools', 'Lead Gen'],
    mindMapCategory: 'Core Intelligence',
    badge: 'SOON',
    href: '/dashboard/tool/crm-assistant',
    guideHref: '/blog/ai-brand-creator',
    details: {
      steps: [
        { text: 'Connect your contacts or calendar', icon: 'Network' },
        { text: 'Ask about any client (e.g., "What did I promise Jane?")', icon: 'Search' },
        { text: 'Get instant summaries, reminders, and insights', icon: 'FileText' },
      ],
      aiVsManual: [
        { metric: 'Recall Speed', manual: 'Minutes searching notes/emails', ai: 'Instantaneous', icon: 'Clock2' },
        { metric: 'Data Points', manual: 'Relies on what you remember to write down', ai: 'Catches every detail from calls, emails, texts', icon: 'Sparkles' },
        { metric: 'Proactive Reminders', manual: 'You have to set them yourself', ai: 'Nudges you about birthdays, follow-ups', icon: 'BadgeCheck' },
      ],
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
    id: 'ai-assistant',
    title: 'Assistant',
    dashboardTitle: 'Assistant',
    description: 'Your personal, trainable AI partner.',
    icon: 'BrainCircuit',
    color: '#84cc16', 
    cta: 'Train Assistant',
    categories: ['Sales Tools'],
    mindMapCategory: 'Core Intelligence',
    badge: 'BETA',
    href: '/dashboard/assistant',
    guideHref: '/blog/ai-brand-creator',
    details: {
      steps: [
        { text: 'Give your assistant core instructions', icon: 'PenTool' },
        { text: 'Upload documents to its knowledge base', icon: 'Upload' },
        { text: 'Chat with it anywhere in the app', icon: 'MessageCircle' },
      ],
      aiVsManual: [
        { metric: 'Knowledge Recall', manual: 'Limited to your own memory and notes', ai: 'Instantly recalls every detail from every file', icon: 'Database' },
        { metric: 'Task Execution', manual: 'You have to do everything yourself', ai: 'Can summarize, draft, compare, and role-play', icon: 'Sparkles' },
        { metric: 'Availability', manual: 'You need sleep and breaks', ai: 'Always on, always ready to assist 24/7', icon: 'Clock2' },
      ],
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
  {
    id: 'vm-creator',
    title: 'VM Creator',
    dashboardTitle: 'VM Creator',
    description: 'Provision Google Cloud virtual machines with an AI command.',
    icon: 'Server',
    color: '#4f46e5',
    cta: 'Create VM',
    categories: ['Utilities'],
    mindMapCategory: 'Utilities',
    badge: 'NEW',
    isPage: false,
    href: '/dashboard/tool/vm-creator',
    details: {
      steps: [
        { text: 'Define instance parameters like name, zone, and machine type', icon: 'PenTool' },
        { text: 'AI constructs and sends the request to the Google Cloud API', icon: 'Send' },
        { text: 'Receive confirmation that your VM is running', icon: 'CheckCircle' },
      ],
      aiVsManual: [
        { metric: 'Time to Provision', manual: '5-10 minutes navigating the GCP Console', ai: 'Seconds via a simple form', icon: 'Clock2' },
        { metric: 'Complexity', manual: 'Requires knowledge of cloud infrastructure and console UI', ai: 'Abstracted into a few simple fields', icon: 'Sparkles' },
        { metric: 'Repeatability', manual: 'Prone to misconfiguration on each new instance', ai: 'Consistent and error-free provisioning', icon: 'BadgeCheck' },
      ],
      synergy: [
        { tool: "AI Assistant", benefit: "In the future, you could command the assistant: 'Create a new staging server for the Emaar project', and it would run this tool for you." },
      ],
      faqs: [
        { question: "Is this secure?", answer: "Yes, this tool uses the securely configured server-side authentication (Application Default Credentials) to interact with the Google Cloud APIs. No keys are exposed to the client." },
        { question: "What can I use this for?", answer: "This is a powerful utility for developers or technical users who need to quickly spin up cloud resources without leaving the application context, perfect for testing, staging, or running backend jobs." }
      ],
    },
    creationFields: [
      { id: 'instanceName', name: 'Instance Name', type: 'text', placeholder: 'e.g., my-test-instance', description: 'The name for your new virtual machine.' },
      { id: 'zone', name: 'Zone', type: 'select', options: ['us-central1-a', 'us-central1-b', 'us-central1-c'], placeholder: 'Select a zone', description: 'The Google Cloud zone to create the VM in.' },
      { id: 'machineType', name: 'Machine Type', type: 'select', options: ['e2-micro', 'e2-small', 'e2-medium', 'n1-standard-1'], placeholder: 'Select a machine type', description: 'The size and power of the VM.' },
      { id: 'sourceImageFamily', name: 'Operating System', type: 'select', options: ['debian-12', 'debian-11', 'ubuntu-2204-lts', 'ubuntu-2004-lts'], placeholder: 'Select an OS', description: 'The operating system for the VM.' },
      { id: 'diskSizeGb', name: 'Disk Size (GB)', type: 'number', placeholder: '10', description: 'The size of the boot disk in gigabytes.' },
    ],
  },
  {
    id: 'property-finder-sync',
    title: 'Property Finder Pilot',
    description: 'PULL data from Property Finder, or PUSH listing plans to it.',
    icon: 'Server',
    color: '#6b7280',
    cta: 'Go to Pilot',
    categories: ['Utilities', 'Web', 'Listing Intelligence AI'],
    mindMapCategory: 'Listing Intelligence AI',
    isPage: true,
    badge: 'Pilot*',
    href: '/dashboard/tool/property-finder-sync',
    details: {
      steps: [], aiVsManual: [], synergy: [], faqs: [],
    },
    creationFields: [],
  },
  {
    id: 'bayut-sync',
    title: 'Bayut Pilot',
    description: 'PULL data from Bayut, or PUSH listing plans to it.',
    icon: 'Server',
    color: '#6b7280',
    cta: 'Go to Pilot',
    categories: ['Utilities', 'Web', 'Listing Intelligence AI'],
    mindMapCategory: 'Listing Intelligence AI',
isPage: true,
    badge: 'Pilot*',
    href: '/dashboard/tool/bayut-sync',
    details: {
      steps: [], aiVsManual: [], synergy: [], faqs: [],
    },
    creationFields: [],
  },
  {
    id: 'creative-execution-terminal',
    title: 'Creative Execution Terminal',
    description: 'The execution engine for your creative tasks. Paste a plan and watch it run.',
    icon: 'Terminal',
    color: '#64748b', 
    cta: 'Go to Terminal',
    categories: ['Utilities'],
    mindMapCategory: 'Utilities',
    isPage: true,
    badge: 'Pilot*',
    href: '/dashboard/tool/creative-execution-terminal',
    details: {
      steps: [
          { text: 'Generate a plan from a creator tool (e.g., PDF Editor)', icon: 'FileText' },
          { text: 'Paste the machine-readable plan into the terminal', icon: 'ClipboardList' },
          { text: 'Watch as the AI executes each step of your plan', icon: 'Sparkles' },
      ],
      aiVsManual: [
        { metric: 'Workflow', manual: 'Each tool works in isolation', ai: 'A unified workflow of planning and execution', icon: 'Network' },
        { metric: 'Transparency', manual: 'The AI\'s process is a "black box"', ai: 'Every step of the execution is visible and logged', icon: 'CheckCircle' },
        { metric: 'Control', manual: 'You can only approve the final output', ai: 'You approve the plan *before* the AI does the heavy lifting', icon: 'UserCog' },
      ],
      synergy: [
        { tool: "PDF Editor", benefit: "The PDF Editor generates a plan that this terminal can execute." },
        { tool: "Rebranding", benefit: "The Rebranding tool will also be converted to generate plans for this terminal, allowing complex rebranding jobs to be executed." }
      ],
      faqs: [
        { question: "Why is this a separate tool?", answer: "Separating planning from execution is a powerful architectural choice. It allows many simple 'planner' tools to use one powerful, centralized 'execution' engine. This makes the system more robust, secure, and scalable." },
        { question: "What happens if a step fails?", answer: "The terminal will halt execution at the step that failed, report the error to you, and allow you to adjust the plan and re-run it. This gives you granular control over the entire process." },
        { question: "What kind of plans can it run?", answer: "Initially, it will support plans from the PDF Editor. In the future, it will be the execution engine for all creative tasks, including video editing, rebranding, and more." }
      ],
    },
    creationFields: [],
  },
  {
    id: 'superfreetime',
    title: 'SuperFreeTime Game',
    description: 'A hidden mini-game to find a secret key and win a prize.',
    icon: 'Key',
    color: '#a1a1aa',
    cta: 'Play Game',
    categories: ['All'],
    mindMapCategory: 'Internal',
    href: '/superfreetime',
    guideHref: '/superfreetime',
    details: {
      steps: [{ text: 'It is a secret.', icon: 'Sparkles' }],
      aiVsManual: [{ metric: 'Fun', manual: 'Work, work, work.', ai: 'A delightful surprise.', icon: 'Sparkles' }],
      synergy: [{ tool: 'AI Assistant', benefit: 'Winning the game gives you a secret code to unlock a reward from the Assistant.' }],
      faqs: [{ question: "What is this?", answer: "It's a secret game for you to enjoy. Have fun!" }],
    },
    creationFields: [],
  },
];
