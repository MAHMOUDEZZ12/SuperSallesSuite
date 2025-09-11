
import {
  getApps,
  initializeApp,
  cert,
  applicationDefault,
  App,
} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { firebaseConfig } from './firebase-config';

let app: App;

if (getApps().length === 0) {
    app = initializeApp({
        credential: applicationDefault(),
        projectId: firebaseConfig.projectId,
    });
    console.log('Firebase Admin SDK initialized with Application Default Credentials for project:', firebaseConfig.projectId);
} else {
  app = getApps()[0];
}

const adminDb = getFirestore(app);

export { adminDb };
