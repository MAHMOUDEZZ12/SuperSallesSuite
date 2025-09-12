import React from 'react';
import { headers } from 'next/headers';
import { HomePageClient } from './home-page-client';

// THIS IS THE MAIN GATE FOR THE `selltoday.ai` domain.
// It serves the "mind map" of supertools.
// The main `whatsmap.ai` landing page can be built as a separate component/page
// and conditionally rendered here or handled via middleware in a real app.

export default function HomePage() {
  const host = headers().get('host') || 'whatsmap.ai';

  return <HomePageClient host={host} />;
}
