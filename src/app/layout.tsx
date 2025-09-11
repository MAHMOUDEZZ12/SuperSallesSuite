
import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { Poppins, PT_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { CookieConsent } from '@/components/cookie-consent';

const fontSans = PT_Sans({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-sans',
});
const fontHeading = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://selltoday.ai'),
  title: 'selltoday.ai — AI tools for ads, creatives, and sales',
  description: 'Use AI tools for ads, rebranding, pages, posts, CRM, and reports—all in one sales suite.',
  openGraph: {
    // Replace with a URL to your actual OpenGraph image
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable,
        fontHeading.variable
      )}>
        {children}
        <Toaster />
        <CookieConsent />
      </body>
    </html>
  );
}
