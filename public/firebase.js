const firebaseConfig = {
  apiKey: "AIzaSyBrJzSs1f97vBVTvZj8qMP8VHNsXqCOQg0",
  authDomain: "trustbarter-4763c.firebaseapp.com",
  projectId: "trustbarter-4763c",
  storageBucket: "trustbarter-4763c.firebasestorage.app",
  messagingSenderId: "579854252705",
  appId: "1:579854252705:web:21ff1d31de4d55846d0ee0",
  measurementId: "G-WYZG014G44"
};

//init firebase
firebase.initializeApp(firebaseConfig);

//reference database
const trustbarterDB = firebase.database().ref('trustbarter')

//firebase logic

document.getElementById('formContainer').addEventListener("submit", submitForm)

function submitForm(e) {
    e.preventDefault();

    var name = getElementVal('name')
    var email = getElementVal('email')
    var phone = getElementVal('phone')

    console.log(name, email, phone)
}

const getElementVal = (id) => {
    return document.getElementById(id).value;
}
