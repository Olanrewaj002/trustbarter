// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyD4EvDKSSjxjDTr3hGy_oUGxK4Vej2V1mA",
  authDomain: "trustbarter-7f8b0.firebaseapp.com",
  projectId: "trustbarter-7f8b0",
  storageBucket: "trustbarter-7f8b0.appspot.com",
  messagingSenderId: "550123374269",
  appId: "1:550123374269:web:bc84078db0c3b23f7ad9d4",
  measurementId: "G-XSD1K5KZJ3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, collection, addDoc, ref, uploadBytes, getDownloadURL, serverTimestamp };



