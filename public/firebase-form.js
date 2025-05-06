import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBrJzSs1f97vBVTvZj8qMP8VHNsXqCOQg0",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "trustbarter-4763c",
  // optional: storageBucket, messagingSenderId, appId
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const phone = form.querySelector('input[type="tel"]').value.trim();
    const city = form.querySelectorAll('select')[0].value;
    const action = form.querySelectorAll('select')[1].value;

    if (!name || !email || !phone || !city || !action) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "formSubmissions"), {
        name,
        email,
        phone,
        city,
        action,
        submittedAt: new Date()
      });
      alert("Form submitted successfully!");
      form.reset();
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit form. Please try again.");
    }
  });
});