import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getDatabase, ref, child, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const database = getDatabase();

export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChanged(callback) {
  onAuthStateChanged(auth, async (user) => {
    // if logged in, check if a user is an admin user
    // {...user, isAdmin: true/false}
    const updatedUserInfo =
      user && (await addAdminUserInfo(user))
        ? { ...user, isAdmin: true }
        : user;

    callback(updatedUserInfo);
  });
}

async function addAdminUserInfo(user) {
  return get(ref(database, 'admins'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        return admins.includes(user.uid);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
