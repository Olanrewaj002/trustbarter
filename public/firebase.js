// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBrJzSs1f97vBVTvZj8qMP8VHNsXqCOQg0",
  authDomain: "trustbarter-4763c.firebaseapp.com",
  databaseURL: "https://trustbarter-4763c-default-rtdb.firebaseio.com",
  projectId: "trustbarter-4763c",
  storageBucket: "trustbarter-4763c.firebasestorage.app",
  messagingSenderId: "579854252705",
  appId: "1:579854252705:web:21ff1d31de4d55846d0ee0",
  measurementId: "G-WYZG014G44"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, collection, addDoc, ref, uploadBytes, getDownloadURL };
