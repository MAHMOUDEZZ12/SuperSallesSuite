
import {
  getApps,
  initializeApp,
  applicationDefault,
  App,
} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let app: App;

if (getApps().length === 0) {
  // This logic correctly handles both local development with a service account
  // and production environments relying on Application Default Credentials.
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    app = initializeApp({
      credential: applicationDefault(),
    });
    console.log('Firebase Admin SDK initialized with specified Service Account.');
  } else {
    // This will work in production (e.g., Google Cloud, Firebase) where
    // default credentials are automatically discovered.
    app = initializeApp();
    console.log('Firebase Admin SDK initialized with Application Default Credentials.');
  }
} else {
  app = getApps()[0];
}

const adminDb = getFirestore(app);

export { adminDb };
