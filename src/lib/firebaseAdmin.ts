import {
  getApps,
  initializeApp,
  applicationDefault,
  App,
  cert,
} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';
import path from 'path';

let app: App;

if (getApps().length === 0) {
  // Check if service account file is specified in environment variables
  const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  
  if (serviceAccountPath && fs.existsSync(serviceAccountPath)) {
    // We are in a local environment with a service account file
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    app = initializeApp({
      credential: cert(serviceAccount),
    });
    console.log('Firebase Admin SDK initialized with local service account.');
  } else {
    // We are in a production environment (e.g., Google Cloud, Firebase Hosting)
    // where credentials are automatically discovered.
    app = initializeApp({
      credential: applicationDefault(),
    });
    console.log('Firebase Admin SDK initialized with Application Default Credentials.');
  }
} else {
  app = getApps()[0];
}

const adminDb = getFirestore(app);

export { adminDb };
