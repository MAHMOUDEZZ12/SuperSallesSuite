
import {
  getApps,
  initializeApp,
  applicationDefault,
  App,
} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { firebaseConfig } from './firebase-config';

let app: App;

if (getApps().length === 0) {
    // Check for local development environment and service account key
    if (process.env.NODE_ENV === 'development' && process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        app = initializeApp({
            credential: applicationDefault(),
        });
        console.log('Firebase Admin SDK initialized using Service Account for local development.');
    } else {
        // Use Application Default Credentials in production
        app = initializeApp();
        console.log('Firebase Admin SDK initialized with Application Default Credentials for production.');
    }
} else {
  app = getApps()[0];
}

const adminDb = getFirestore(app);

export { adminDb };
