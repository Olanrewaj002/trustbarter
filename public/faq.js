//variables for question one divs
let toggleDown=document.getElementById("drop-down")
let faqStyle1 = document.getElementById("faq-style1")
let qtnOne = document.getElementById("question-1")

//variables for question two divs
let faqStyle2 = document.getElementById("faq-style2")
let qtnTwo = document.getElementById("question-2")
let toggleDown2 = document.getElementById("drop-down2")

//variables for faq three divs
let faqStyle3 = document.getElementById("faq-style3")
let qtnThree = document.getElementById("question-3")
let toggleDown3 = document.getElementById("drop-down3")

//variables for faq three divs
let faqStyle4 = document.getElementById("faq-style4")
let qtnFour = document.getElementById("question-4")
let toggleDown4 = document.getElementById("drop-down4")

//variables for faq three divs
let faqStyle5 = document.getElementById("faq-style5")
let qtnFive = document.getElementById("question-5")
let toggleDown5 = document.getElementById("drop-down5")

//functions section

//faq one function
function openInfo() {
    toggleDown.classList.toggle("hidden")
    faqStyle1.classList.toggle("rounded-sm"), ("bg-none")
    qtnOne.classList.toggle("font-bold")
    qtnOne.classList.toggle("text-[#550000]")
}

//faq two function
function openInfo2() {
    toggleDown2.classList.toggle("hidden")
    faqStyle2.classList.toggle("rounded-sm"), ("bg-none")
    qtnTwo.classList.toggle("font-bold")
    qtnTwo.classList.toggle("text-[#550000]")
}

//faq three function
function openInfo3() {
    toggleDown3.classList.toggle("hidden")
    faqStyle3.classList.toggle("rounded-sm"), ("bg-none")
    qtnThree.classList.toggle("font-bold")
    qtnThree.classList.toggle("text-[#550000]")
}

//faq three function
function openInfo4() {
    toggleDown4.classList.toggle("hidden")
    faqStyle4.classList.toggle("rounded-sm"), ("bg-none")
    qtnFour.classList.toggle("font-bold")
    qtnFour.classList.toggle("text-[#550000]")
}
