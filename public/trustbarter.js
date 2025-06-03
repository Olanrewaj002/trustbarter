//firebase logic

document.getElementById('formContainer').addEventListener("submit", submitForm)

function submitForm(e) {
    e.preventDefault();

    var name = getElementVal('name')
    var email = getElementVal('email')
    var phone = getElementVal('phone')
}

const getElementVal = (id) => {
    return document.getElementById(id).value;
}

//sell script
function preview(input, imgId, placeholderId) {
    const file = input.files[0];
    const img = document.getElementById(imgId);
    const placeholder = document.getElementById(placeholderId);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        img.src = reader.result;
        img.classList.remove('hidden');
        placeholder.classList.add('hidden');
      };
      reader.readAsDataURL(file);
    }
  }