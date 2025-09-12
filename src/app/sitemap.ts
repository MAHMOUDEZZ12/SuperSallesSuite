
import { MetadataRoute } from 'next';

// To prevent server/client import conflicts during build,
// we define the necessary data directly in this file.

const toolIds = [
    'ai-video-presenter',
    'chatbot-creator',
    'keyword-planner',
    'tiktok-editor',
    'meta-auto-pilot',
    'meta-ads-copilot',
    'audience-creator',
    'insta-ads-designer',
    'reel-ads-ai',
    'instagram-admin-ai',
    'story-planner-ai',
    'instagram-content-creator',
    'email-creator',
    'youtube-video-editor',
    'landing-pages',
    'rebranding',
    'pdf-editor',
    'brochure-translator',
    'listing-manager',
    'listing-performance',
    'listing-generator',
    'commission-calculator',
    'payment-planner',
    'investor-matching',
    'offer-generator',
    'whatsapp-campaigns',
    'lead-investigator',
    'market-reports',
    'market-trends',
    'projects-finder',
    'ai-brand-creator',
    'crm-assistant',
    'ai-assistant',
    'property-finder-sync',
    'bayut-sync',
    'creative-execution-terminal',
    'lease-reviewer',
    'price-estimator',
    'aerial-view-generator',
    'lead-to-deal-pipeline',
    'ugc-script-writer',
];

const blogSlugs = [
    'ai-video-presenter',
    'ai-brand-creator',
    'insta-ads-designer',
    'audience-creator',
    'rebranding',
    'story-planner-ai',
    'instagram-admin-ai',
    'email-creator',
    'instagram-content-creator',
    'market-reports',
    'pdf-editor',
    'landing-page-lead-gen',
    'landing-page-campaign',
    'landing-pages',
    'investor-matching',
    'bayut-listing-ai',
    'meta-ads-copilot',
    'meta-auto-pilot',
    'payment-planner',
    'brochure-translator',
    'youtube-video-editor',
];


export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://whatsmap.ai';

  const staticRoutes = [
    '/',
    '/dashboard',
    '/pricing',
    '/login',
    '/signup',
    '/privacy',
    '/terms',
    '/status',
    '/about',
    '/ecosystem',
    '/cookies',
    '/superfreetime',
    '/blog',
    '/ai-presenter',
    '/solutions/agent',
    '/solutions/investor',
    '/solutions/developer',
    '/community',
    '/community/roadmap',
    '/community/careers',
    '/community/events',
    '/community/responsibility',
    '/documentation',
    '/dashboard/flows',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1.0 : 0.8,
  }));

  const toolRoutes = toolIds.map((toolId) => ({
    url: `${siteUrl}/dashboard/tool/${toolId}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  
  const blogRoutes = blogSlugs.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));


  return [...staticRoutes, ...toolRoutes, ...blogRoutes];
}
