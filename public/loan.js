  //button logics
const stateLgaData = {
    Lagos: ["Ikeja", "Surulere", "Eti-Osa", "Badagry", "Ikorodu"],
    Abuja: ["Gwagwalada", "Kuje", "Abaji", "Bwari", "Municipal"],
    Kano: ["Fagge", "Gwale", "Nassarawa", "Dala", "Tarauni"],
    Rivers: ["Port Harcourt", "Obio-Akpor", "Bonny", "Okrika", "Eleme"],
    Enugu: ["Enugu North", "Enugu South", "Nsukka", "Udi", "Oji River"],
    // Add more states and LGAs as needed
  };

  const stateToggle = document.getElementById("stateToggle");
  const stateOptions = document.getElementById("stateOptions");
  const selectedState = document.getElementById("selectedState");
  const stateInput = document.getElementById("stateInput");

  const lgaToggle = document.getElementById("lgaToggle");
  const lgaOptions = document.getElementById("lgaOptions");
  const selectedLGA = document.getElementById("selectedLGA");
  const lgaInput = document.getElementById("lgaInput");

  // Populate states
  for (let state in stateLgaData) {
    const li = document.createElement("li");
    li.className = "px-4 py-2 hover:bg-yellow-100 cursor-pointer";
    li.textContent = state;
    li.dataset.value = state;
    stateOptions.appendChild(li);
  }

  // Toggle dropdown visibility
  stateToggle.addEventListener("click", () => stateOptions.classList.toggle("hidden"));
  lgaToggle.addEventListener("click", () => lgaOptions.classList.toggle("hidden"));

  // Select state
  stateOptions.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      const selected = e.target.dataset.value;
      selectedState.textContent = selected;
      stateInput.value = selected;
      stateOptions.classList.add("hidden");

      // Reset and enable LGA dropdown
      selectedLGA.textContent = "Select an LGA";
      lgaInput.value = "";
      lgaToggle.disabled = false;
      lgaOptions.innerHTML = "";

      // Populate LGAs
      stateLgaData[selected].forEach(lga => {
        const lgaLi = document.createElement("li");
        lgaLi.className = "px-4 py-2 hover:bg-yellow-100 cursor-pointer";
        lgaLi.textContent = lga;
        lgaLi.dataset.value = lga;
        lgaOptions.appendChild(lgaLi);
      });
    }
  });

  // Select LGA
  lgaOptions.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      const selected = e.target.dataset.value;
      selectedLGA.textContent = selected;
      lgaInput.value = selected;
      lgaOptions.classList.add("hidden");
    }
  });

  // Close dropdowns if clicked outside
  window.addEventListener("click", (e) => {
    if (!stateToggle.contains(e.target) && !stateOptions.contains(e.target)) {
      stateOptions.classList.add("hidden");
    }
    if (!lgaToggle.contains(e.target) && !lgaOptions.contains(e.target)) {
      lgaOptions.classList.add("hidden");
    }
  });
  //state and lga logic end

  //business owner or salary earner logic start
  const dropdownToggle = document.getElementById("dropdownToggle");
  const dropdownOptions = document.getElementById("dropdownOptions");
  const dropdownSelected = document.getElementById("dropdownSelected");
  const userTypeInput = document.getElementById("userType");
  const businessFields = document.getElementById("businessFields");
  const salaryFields = document.getElementById("salaryFields");

  // Toggle dropdown
  dropdownToggle.addEventListener("click", () => {
    dropdownOptions.classList.toggle("hidden");
  });

  // Handle selection
  dropdownOptions.querySelectorAll("li").forEach(option => {
    option.addEventListener("click", () => {
      const value = option.getAttribute("data-value");
      const text = option.innerText;

      dropdownSelected.innerText = text;
      userTypeInput.value = value;
      dropdownOptions.classList.add("hidden");

      if (value === "business") {
        businessFields.classList.remove("hidden");
        salaryFields.classList.add("hidden");
      } else if (value === "salary") {
        salaryFields.classList.remove("hidden");
        businessFields.classList.add("hidden");
      }
    });
  });

  // Close dropdown on outside click
  window.addEventListener("click", (e) => {
    if (!dropdownToggle.contains(e.target) && !dropdownOptions.contains(e.target)) {
      dropdownOptions.classList.add("hidden");
    }
  });

   // Reason for Loan Dropdown
   const reasonToggle = document.getElementById("reasonToggle");
   const reasonOptions = document.getElementById("reasonOptions");
   const selectedReason = document.getElementById("selectedReason");
   const loanReasonInput = document.getElementById("loanReason");

   reasonToggle.addEventListener("click", () => {
   reasonOptions.classList.toggle("hidden");
   });

   reasonOptions.querySelectorAll("li").forEach(item => {
   item.addEventListener("click", () => {
       const value = item.getAttribute("data-value");
       selectedReason.textContent = item.textContent;
       loanReasonInput.value = value;
       reasonOptions.classList.add("hidden");
   });
   });

   // Optional: close dropdown if clicked outside
   document.addEventListener("click", (e) => {
   if (!reasonToggle.contains(e.target) && !reasonOptions.contains(e.target)) {
       reasonOptions.classList.add("hidden");
   }
   });
