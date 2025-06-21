import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// ✅ Firebase config
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

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// ✅ Handle form submission
document.getElementById("swapForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;

  const desiredItemInput = document.getElementById("desiredItemInput");
  const serviceSelect = document.getElementById("serviceOptions");

  const data = {
    location: form.location.value,
    category: form.category.value,
    itemName: form.itemName.value,
    condition: form.condition.value,
    description: form.description.value,
    swapPreference: form.swapOption.value,
    desiredSwap: form.swapOption.value === 'item'
      ? desiredItemInput.value
      : serviceSelect.value,
    availability: form.condition.value,
    yourName: form.yourName.value,
    phone: form.phone.value,
    email: form.email.value,
    type: "swap",
    createdAt: serverTimestamp(),
    timestamp: new Date().toLocaleString()
  };

  const fileInputs = form.querySelectorAll('input[type="file"]');
  const imageUploadPromises = [];
  const imageUrls = [];

  fileInputs.forEach((input) => {
    const file = input.files[0];
    if (file) {
      const storageRef = ref(storage, `swapImages/${Date.now()}-${file.name}`);
      const uploadTask = uploadBytes(storageRef, file).then(snapshot =>
        getDownloadURL(snapshot.ref).then(url => imageUrls.push(url))
      );
      imageUploadPromises.push(uploadTask);
    }
  });

  try {
    await Promise.all(imageUploadPromises);
    data.images = imageUrls;

    await addDoc(collection(db, "trustbarter-swap-items"), data);

    alert("✅ Your swap item was submitted successfully!");
    form.reset();

    for (let i = 1; i <= 4; i++) {
      document.getElementById(`img${i}`)?.classList.add("hidden");
      document.getElementById(`placeholder${i}`)?.classList.remove("hidden");
    }

    // ✅ Refresh displayed items after new submission
    displaySwapItems();

  } catch (error) {
    console.error("Error during submission:", error);
    alert("❌ Something went wrong. Please try again.");
  }
});

// Preview logic
window.preview = function (input, imgId, placeholderId) {
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.getElementById(imgId);
      const placeholder = document.getElementById(placeholderId);
      img.src = e.target.result;
      img.classList.remove("hidden");
      placeholder.classList.add("hidden");
    };
    reader.readAsDataURL(file);
  }
};

// Swap option toggle
document.getElementById("swapOption").addEventListener("change", function () {
  const itemInput = document.getElementById("desiredItemInput");
  const serviceDropdown = document.getElementById("serviceDropdownWrapper");
  const serviceSelect = document.getElementById("serviceOptions");

  if (this.value === "item") {
    itemInput.classList.remove("hidden");
    itemInput.setAttribute("required", "true");
    serviceDropdown.classList.add("hidden");
    serviceSelect.removeAttribute("required");
  } else if (this.value === "service") {
    itemInput.classList.add("hidden");
    itemInput.removeAttribute("required");
    serviceDropdown.classList.remove("hidden");
    serviceSelect.setAttribute("required", "true");
  } else {
    itemInput.classList.remove("hidden");
    itemInput.setAttribute("required", "true");
    serviceDropdown.classList.add("hidden");
    serviceSelect.removeAttribute("required");
  }
});


// ✅ Display submitted swap items
async function displaySwapItems() {
  const container = document.getElementById("swapItemsContainer");
  if (!container) return;

  container.innerHTML = "Loading...";

  try {
    const querySnapshot = await getDocs(collection(db, "trustbarter-swap-items"));
    container.innerHTML = "";

    querySnapshot.forEach(doc => {
      const data = doc.data();

      const card = document.createElement("div");
      card.className = "bg-white rounded-xl shadow p-4";

      card.innerHTML = `
        ${data.images?.[0] ? `<img src="${data.images[0]}" class="mt-2 rounded-md" />` : ""}
        <h3 class="text-lg font-bold">${data.itemName || "Swap Item"}</h3>
        <p class="text-sm text-gray-500">${data.category} | ${data.condition}</p>
        <p class="my-2">${data.description}</p>
        <p class="text-sm"><strong>Swap For:</strong> ${data.desiredSwap}</p>
        <p class="text-xs text-gray-400 mt-2">Submitted: ${data.timestamp || "N/A"}</p>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error("Failed to load items:", err);
    container.innerHTML = "❌ Could not load swap items.";
  }
}

// ✅ Call it on page load
displaySwapItems();
