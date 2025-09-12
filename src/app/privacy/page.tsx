
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { PageHeader } from '@/components/ui/page-header';
import { Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <PageHeader 
            icon={<Shield className="h-8 w-8" />}
            title="Privacy Policy"
            description="Last updated: July 26, 2024"
        />
        <Card className="mt-8 bg-card/50">
            <CardContent className="p-8 prose prose-lg dark:prose-invert max-w-none">
              <p>
                Welcome to WhatsMAP ("we," "us," or "our"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.
              </p>

              <h2>Information We Collect</h2>
              <p>
                We may collect information about you in a variety of ways. The information we may collect via the Application includes:
              </p>
              <ul>
                <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and telephone number, that you voluntarily give to us when you register with the Application.</li>
                <li><strong>User-Generated Content:</strong> We collect materials you upload for processing by our AI tools, such as PDF brochures, client lists (CSV), images, and textual instructions. This data is used solely to provide you with the service requested and is not used to train our models for other users.</li>
                <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Application, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Application.</li>
                <li><strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you subscribe to our services. We store very little, if any, financial information. Instead, all financial information is stored by our payment processor.</li>
              </ul>

              <h2>Use of Your Information</h2>
              <p>
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Application to:
              </p>
              <ul>
                <li>Create and manage your account.</li>
                <li>Process your requests and deliver the AI-powered services you use.</li>
                <li>Email you regarding your account or orders.</li>
                <li>Fulfill and manage purchases, subscriptions, payments, and other transactions.</li>
                <li>Generate a personal profile about you to make future visits to the Application more personalized.</li>
                <li>Monitor and analyze usage and trends to improve your experience with the Application.</li>
                <li>Notify you of updates to the Application.</li>
              </ul>

              <h2>Disclosure of Your Information</h2>
              <p>
                We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
              </p>
               <ul>
                <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
                <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, and customer service.</li>
                <li><strong>Third-Party AI Models:</strong> To provide our services, we send your uploaded content and instructions to third-party AI service providers (like Google AI). This data is processed by them to generate the output you request. These providers are bound by their own privacy policies.</li>
              </ul>


              <h2>Security of Your Information</h2>
              <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

               <h2>Cookies and Web Beacons</h2>
              <p>We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Application to help customize the Application and improve your experience. For more information on how we use cookies, please refer to our <Link href="/cookies">Cookie Policy</Link>.</p>


              <h2>Contact Us</h2>
              <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
              <p>
                WhatsMAP<br />
                123 AI Lane<br />
                Innovation City, 12345<br />
                <a href="mailto:privacy@whatsmap.ai">privacy@whatsmap.ai</a>
              </p>
            </CardContent>
        </Card>
      </main>
      <LandingFooter />
    </div>
  );
}
