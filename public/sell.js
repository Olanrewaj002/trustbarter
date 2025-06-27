document.addEventListener("DOMContentLoaded", () => {
    const firebaseConfig = {
      apiKey: "AIzaSyD4EvDKSSjxjDTr3hGy_oUGxK4Vej2V1mA",
      authDomain: "trustbarter-7f8b0.firebaseapp.com",
      projectId: "trustbarter-7f8b0",
      storageBucket: "trustbarter-7f8b0.appspot.com",
      messagingSenderId: "550123374269",
      appId: "1:550123374269:web:bc84078db0c3b23f7ad9d4",
      measurementId: "G-XSD1K5KZJ3"
    };
  
    // ✅ Firebase global object must be defined BEFORE this line
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    const storage = firebase.storage();
  
    const form = document.getElementById("sellForm");
  
    if (!form) return;
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const imageUrls = [];
  
      for (let i = 1; i <= 4; i++) {
        const input = document.getElementById(`image${i}`);
        if (input?.files[0]) {
          const file = input.files[0];
          const refPath = `sellImages/${Date.now()}_${file.name}`;
          const fileRef = storage.ref().child(refPath);
          await fileRef.put(file);
          const url = await fileRef.getDownloadURL();
          imageUrls.push(url);
        }
      }
  
      const data = {
        location: formData.get("location"),
        category: formData.get("category"),
        itemName: formData.get("itemName"),
        condition: formData.get("condition"),
        description: formData.get("description"),
        price: parseInt(formData.get("price")),
        yourName: formData.get("yourName"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        images: imageUrls,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      };
  
      try {
        await db.collection("sellListings").add(data);
        alert("Item submitted!");
        form.reset();
      } catch (err) {
        console.error("Error submitting item:", err);
        alert("Submission failed. Try again.");
      }
    });
  });
  