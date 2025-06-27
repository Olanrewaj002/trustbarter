
  const swapOption = document.getElementById("swapOption");
  const itemInput = document.getElementById("desiredItemInput");
  const serviceDropdown = document.getElementById("serviceOptions");
  const serviceWrapper = document.getElementById("serviceDropdownWrapper");

  swapOption.addEventListener("change", () => {
    if (swapOption.value === "item") {
      itemInput.classList.remove("hidden");
      serviceWrapper.classList.add("hidden");
      serviceDropdown.value = '';
    } else if (swapOption.value === "service") {
      itemInput.classList.add("hidden");
      itemInput.value = '';
      serviceWrapper.classList.remove("hidden");
    } else {
      itemInput.classList.remove("hidden");
      serviceWrapper.classList.add("hidden");
      serviceDropdown.value = '';
    }
  });

  