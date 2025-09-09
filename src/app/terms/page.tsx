
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { PageHeader } from '@/components/ui/page-header';
import { FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';


export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
         <PageHeader 
            icon={<FileText className="h-8 w-8" />}
            title="Terms of Service"
            description="Last updated: July 26, 2024"
        />
        <Card className="mt-8 bg-card/50">
            <CardContent className="p-8 prose prose-lg dark:prose-invert max-w-none">
              <section>
                <h2>1. Agreement to Terms</h2>
                <p>By using our services, you agree to be bound by these Terms. If you don’t agree to be bound by these Terms, do not use the services.</p>
              </section>

              <section>
                <h2>2. Privacy Policy</h2>
                <p>Please refer to our <Link href="/privacy">Privacy Policy</Link> for information on how we collect, use and disclose information from our users.</p>
              </section>

              <section>
                <h2>3. Changes to Terms or Services</h2>
                <p>We may update the Terms at any time, in our sole discretion. If we do so, we’ll let you know either by posting the updated Terms on the Site or through other communications. It’s important that you review the Terms whenever we update them or you use the Services.</p>
              </section>

              <section>
                <h2>4. Who May Use the Services?</h2>
                <p>You may use the Services only if you are 18 years or older and capable of forming a binding contract with selltoday.ai, and not otherwise barred from using the Services under applicable law.</p>
              </section>

              <section>
                <h2>5. Refund Policy</h2>
                <p>Our refund policy is non-negotiable. In the event of an application or service failure, refunds will not be issued. We commit to making all reasonable efforts to restore service in a timely manner. Your subscription fee compensates for the ongoing availability and development of the suite, not for uninterrupted uptime.</p>
              </section>
              
              <section>
                <h2>6. Contact Information</h2>
                <p>If you have any questions about these Terms, please contact us at <a href="mailto:support@selltoday.ai">support@selltoday.ai</a>.</p>
              </section>
            </CardContent>
        </Card>
      </main>
      <LandingFooter />
    </div>
  );
}
