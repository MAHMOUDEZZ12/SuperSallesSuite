
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { PageHeader } from '@/components/ui/page-header';
import { Cookie } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function CookiesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
         <PageHeader 
            icon={<Cookie className="h-8 w-8" />}
            title="Cookie Policy"
            description="Last updated: July 26, 2024"
        />
        <Card className="mt-8 bg-card/50">
            <CardContent className="p-8 prose prose-lg dark:prose-invert max-w-none">
              <p>
                This Cookie Policy explains how selltoday.ai ("we", "us", and "our") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
              </p>

              <h2>What are cookies?</h2>
              <p>
                A cookie is a small data file that is placed on your device. We use cookies to operate and personalize your experience, to analyze our site traffic, and for security purposes.
              </p>

              <h2>Why do we use cookies?</h2>
              <p>
                We use first-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. For example, we use cookies to remember your cookie consent preferences.
              </p>
              
               <h2>How can I control cookies?</h2>
              <p>
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent banner. You can also set or amend your web browser controls to accept or refuse cookies.
              </p>

              <h2>Contact Us</h2>
              <p>If you have questions or comments about this Cookie Policy, please contact us at:</p>
              <p>
                selltoday.ai<br />
                123 AI Lane<br />
                Innovation City, 12345<br />
                <a href="mailto:privacy@selltoday.ai">privacy@selltoday.ai</a>
              </p>
            </CardContent>
        </Card>
      </main>
      <LandingFooter />
    </div>
  );
}
