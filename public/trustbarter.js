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