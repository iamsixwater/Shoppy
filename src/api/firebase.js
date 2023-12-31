import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getDatabase, ref, get, set, remove } from 'firebase/database';
import { v4 as uuid } from 'uuid';

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

export async function addProduct(product, imageURL) {
  const id = uuid();
  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    image: imageURL,
    price: parseInt(product.price),
    options: product.options.split(','),
  });
}

export async function removeProduct(product) {
  return remove(ref(database, `products/${product.id}`));
}

export async function getProducts() {
  return get(ref(database, 'products')) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      }
      return [];
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getCart(userId) {
  return get(ref(database, `carts/${userId}`)) //
    .then(async (snapshot) => {
      const items = snapshot.val() || {};

      const activeItems = await getProducts().then((products) =>
        products.map((product) => product.id)
      );

      const filteredItems = Object.keys(items)
        .filter((key) => activeItems.includes(key))
        .reduce((cur, key) => {
          return Object.assign(cur, { [key]: items[key] });
        }, {});

      return Object.values(filteredItems);
    });
}

// add & update
export async function updateCart(userId, product) {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
}

export async function removeFromCart(userId, productId) {
  return remove(ref(database, `carts/${userId}/${productId}`));
}
