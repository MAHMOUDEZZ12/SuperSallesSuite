
import {
  getApps,
  initializeApp,
  cert,
  applicationDefault,
  App,
} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let app: App;

if (getApps().length === 0) {
  try {
    const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (serviceAccountString) {
      const serviceAccount = JSON.parse(serviceAccountString);
      app = initializeApp({
        credential: cert(serviceAccount),
      });
      console.log('Firebase Admin SDK initialized successfully with service account credentials.');
    } else {
      // Fallback if service account string is not available
      console.log('Service account string not found, falling back to application default credentials.');
      app = initializeApp({
        credential: applicationDefault(),
      });
    }
  } catch (error: any) {
    console.warn(`Firebase Admin SDK initialization with service account failed: ${error.message}. Falling back to application default credentials. This is expected in a managed cloud environment.`);
    app = initializeApp({
      credential: applicationDefault(),
    });
  }
} else {
  app = getApps()[0];
}

const adminDb = getFirestore(app);

export { adminDb };
