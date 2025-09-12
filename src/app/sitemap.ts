
import { MetadataRoute } from 'next';
import { blogContent } from '@/lib/blog-content';
import { tools } from '@/lib/features';

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
    '/solutions',
    '/solutions/agent',
    '/solutions/developer',
    '/solutions/investor',
    '/community',
    '/community/roadmap',
    '/community/careers',
    '/community/events',
    '/community/responsibility',
    '/documentation',
    '/dashboard/flows',
    '/dashboard/marketing',
    '/dashboard/assistant',
    '/dashboard/performance'
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1.0 : 0.8,
  }));

  const toolRoutes = tools.filter(tool => tool.isPage).map((tool) => ({
    url: `${siteUrl}/dashboard/tool/${tool.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  
  const blogRoutes = Object.keys(blogContent).map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));


  return [...staticRoutes, ...toolRoutes, ...blogRoutes];
}
