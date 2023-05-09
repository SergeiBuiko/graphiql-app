import { collection } from 'firebase/firestore';

import { db } from './clientApp';

export const usersCollection = collection(db, 'users');
