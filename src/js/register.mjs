
const API_BASE_URL = "https://api.noroff.dev/api/v1"
const loginEndpoint = "/social/auth/login"
const loginUrl = `${API_BASE_URL}${loginEndpoint}`
const signUpSelector = document.querySelector("#singup-button")
const loginSelector = document.querySelector("#login-button")

const loginForm = document.querySelector("#login-form")
const signupForm = document.querySelector("#signup-form")
const loginSubmitButton = document.getElementById("submit")
let userEmail 
let userPassword 

//This part is for selecting Register form
signUpSelector.addEventListener("click",()=>{
    signUpSelector.classList.remove("btn-secondary")
    signUpSelector.classList.add("btn-success")
    console.log(signUpSelector)
    loginSelector.classList.remove("btn-success")
    loginSelector.classList.add("btn-secondary")
    loginForm.classList.add("d-none")
    signupForm.classList.remove("d-none")
    signupForm.classList.add("d-block") 
    console.log(signupForm)
})
loginSelector.addEventListener("click",()=>{
    signUpSelector.classList.remove("btn-success")
    signUpSelector.classList.add("btn-secondary")
    loginSelector.classList.add("btn-success")
    loginSelector.classList.add("btn-secondary")
    signupForm.classList.add("d-none")
    signupForm.classList.remove("d-block")
    loginForm.classList.add("d-block")
    loginForm.classList.remove("d-none")

})

loginSubmitButton.onclick = ()=>{
    userEmail = loginForm.email.value
    userPassword = loginForm.password.value
    console.log(userEmail)
    console.log(userPassword)
    userLogin(loginUrl)
}
async function userLogin(url){
    try{
        const option = {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer ${token}"
            },
            body: JSON.stringify({
                email: userEmail,
                password: userPassword
        })
        }
        const response = await fetch(url, option)
        console.log(response)
    }
    catch(error){
        console.log(error)
    }

}



