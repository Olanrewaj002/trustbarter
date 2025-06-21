import {
  db, storage, addDoc, ref, uploadBytes, getDownloadURL
} from './firebase.js';
import { collection } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


document.getElementById('sellForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const uploadStatus = document.getElementById('uploadStatus');
  if (uploadStatus) uploadStatus.style.display = "block";

  const formData = {
    location: form.location.value,
    category: form.category.value,
    itemName: form.itemName.value,
    condition: form.condition.value,
    description: form.description.value,
    price: form.price.value,
    yourName: form.yourName.value,
    phone: form.phone.value,
    email: form.email.value,
  };

  const imageFiles = [
    document.getElementById('image1').files[0],
    document.getElementById('image2').files[0],
    document.getElementById('image3').files[0],
    document.getElementById('image4').files[0],
  ];

  const imageUrls = [];

  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    if (!file) continue;

    const fileRef = ref(storage, `trustbarter/${Date.now()}_${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    imageUrls.push(url);
  }

  formData.imageUrls = imageUrls;

  // ✅ Add timestamp
  formData.timestamp = new Date().toLocaleString();


  try {
    await addDoc(collection(db, 'trustbarter-sell-items'), formData);
    if (uploadStatus) uploadStatus.innerText = "Upload successful!";
    form.reset();

    ['1', '2', '3', '4'].forEach(num => {
      const img = document.getElementById(`img${num}`);
      const placeholder = document.getElementById(`placeholder${num}`);
      const loader = document.getElementById(`loader${num}`);

      img.src = '';
      img.style.display = 'none';
      placeholder.style.display = 'block';
      loader.style.display = 'none';
    });

    alert("Your item has been submitted successfully!");
  } catch (error) {
    console.error("Error submitting item:", error);
    if (uploadStatus) uploadStatus.innerText = "Upload failed!";
  }
});
