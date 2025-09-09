import { MetadataRoute } from 'next';
import { tools } from '@/lib/features';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://supersellersuite.ai'; // Replace with your actual domain

  const staticRoutes = [
    '/',
    '/dashboard',
    '/pricing',
    '/sx3-mindmap',
    '/login',
    '/signup',
    '/privacy',
    '/terms',
    '/status',
    '/about',
    '/documentation',
    '/cookies',
    '/superfreetime',
    '/blog'
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1.0 : 0.8,
  }));

  const toolRoutes = tools.map((tool) => ({
    url: `${siteUrl}/dashboard/tool/${tool.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  
  const blogRoutes = tools.map((tool) => ({
    url: `${siteUrl}/blog/${tool.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));


  return [...staticRoutes, ...toolRoutes, ...blogRoutes];
}
