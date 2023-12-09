
const API_BASE_URL = "https://api.noroff.dev/api/v1"
const loginEndpoint = "/social/auth/login"
const registerEndpoint ="/social/auth/register"
const loginUrl = `${API_BASE_URL}${loginEndpoint}`
const registerUrl =`${API_BASE_URL}${registerEndpoint}`
const signUpSelector = document.querySelector("#singup-button")
const loginSelector = document.querySelector("#login-button")

const loginForm = document.querySelector("#login-form")
const signupForm = document.querySelector("#signup-form")
const loginSubmitButton = document.getElementById("submit")
const signupSubmitButton = document.getElementById("signup-submit")
let userName
let userEmail 
let userPassword 


//This part is for selecting Register-form
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
// this part is for selection login-form
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

//when clicking login-button, i need to find out more about form validation in js
loginSubmitButton.onclick = ()=>{
    event.preventDefault()
    userEmail = loginForm.email.value
    userPassword = loginForm.password.value
    console.log(userEmail)
    console.log(userPassword)
    userLogin(loginUrl)

}

//when clicking signup button, i will add more functionality to check the
//input data in the future
signupSubmitButton.addEventListener("click",()=>{
    event.preventDefault()
    userName = signupForm.username.value
    userEmail = signupForm.email.value
    userPassword = signupForm.password.value
    userRegister(registerUrl)


})

/**
 * this is an authentaction function that will register a new user
 * @param {string} url the url for API register 
 */
async function userRegister(url){
    try{
        const data = {
            method: "POST",
            headers:{
                "Content-Type": "application/json"

            },
            body:JSON.stringify({
                "name":userName,
                "email":userEmail,
                "password": userPassword
            }),
    }
        const response = await fetch(url,data)
        console.log(response)
        const json = await response.json()
        console.log(json)

    }
    catch(error){
        console.log(error)
    }
}



/**
 *the is an authentication function that will login a registered user 
 * @param {string} url the url for API login
 */
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
        const json = await response.json()
        console.log(json)
        const token = json.accessToken
        console.log(token)
        localStorage.setItem("token",token)
        window.location.replace("/feed")
    }
    catch(error){
        console.log(error)
    }

}



