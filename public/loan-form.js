// Firebase SDK Imports
import {
    initializeApp
  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  
  import {
    getFirestore, collection, addDoc, serverTimestamp
  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
  
  import {
    getStorage, ref, uploadBytes, getDownloadURL
  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
  
  // Firebase Config
  const firebaseConfig = {
    apiKey: "AIzaSyBrJzSs1f97vBVTvZj8qMP8VHNsXqCOQg0",
    authDomain: "trustbarter-4763c.firebaseapp.com",
    projectId: "trustbarter-4763c",
    storageBucket: "trustbarter-4763c.appspot.com",
    messagingSenderId: "579854252705",
    appId: "1:579854252705:web:21ff1d31de4d55846d0ee0"
  };
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);
  
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  
  function validateFile(file, type = 'image') {
    if (!file) return false;
  
    const imageTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const docTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    const validTypes = type === 'image' ? imageTypes : docTypes;
  
    if (!validTypes.includes(file.type)) {
      alert(`❌ Invalid file type: ${file.name}`);
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert(`❌ ${file.name} is too large. Max 5MB.`);
      return false;
    }
    return true;
  }
  
  async function uploadFile(file, pathPrefix) {
    if (!file) return "";
  
    const fileRef = ref(storage, `${pathPrefix}/${Date.now()}-${file.name}`);
    const snapshot = await uploadBytes(fileRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  }
  
  
  // DOM Ready
  window.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loan-form");
  
    if (!form) return;
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const formData = new FormData(form);
      const userType = formData.get("userType");
  
      const payload = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        state: formData.get("state"),
        lga: formData.get("lga"),
        userType,
        createdAt: serverTimestamp(),
        timestamp: new Date().toLocaleString()
      };
  
      try {
        if (userType === "business") {
          payload.monthlyTurnover = formData.get("monthlyTurnover");
          payload.cacDocumentUrl = await uploadFile(formData.get("cacDocument"), "loanUploads/CAC");
          payload.bankStatementUrl = await uploadFile(formData.get("businessBankStatement"), "loanUploads/BankStatements");
        } else if (userType === "salary") {
          payload.monthlyIncome = formData.get("monthlyIncome");
          payload.workIdUrl = await uploadFile(formData.get("workId"), "loanUploads/WorkIDs");
          payload.bankStatementUrl = await uploadFile(formData.get("salaryBankStatement"), "loanUploads/BankStatements");
        }
  
        const photo = formData.get("userPhoto");
        if (photo && photo.size > 0) {
          payload.userPhotoUrl = await uploadFile(photo, "loanUploads/UserPhotos", 'image');
        }
  
        await addDoc(collection(db, "trustbarter-loan-applications"), payload);
        alert("✅ Loan application submitted successfully.");
        form.reset();
      } catch (err) {
        console.error("❌ Error submitting loan form:", err);
        alert("❌ Something went wrong. Please try again.");
      }
    });
  });
  