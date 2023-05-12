import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC8NkexvoboK5aTt8gN12xArhwi9tlZHx0',
  authDomain: 'final-task-graphiql.firebaseapp.com',
  projectId: 'final-task-graphiql',
  storageBucket: 'final-task-graphiql.appspot.com',
  messagingSenderId: '376201631765',
  appId: '1:376201631765:web:f0019e271f4621357d561c',
  measurementId: 'G-PHJN7JWWT9',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
