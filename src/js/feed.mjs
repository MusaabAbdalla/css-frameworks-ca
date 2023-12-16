
import { postsUrl, createPostUrl} from "./utils/variables.mjs";
import renderAllPosts from "./ui/renderAllPosts.mjs"
import { deletePost } from "./api/deletePost.mjs";
const feeds = document.querySelector("#feeds")
const addPostForm = document.querySelector("#add-new-post-form")
const tagsInput = document.querySelector("#tags")
const clearTags = document.querySelector("#clear-tags")
const tagsView = document.querySelector("#tags-view")
const submitPost = document.querySelector("#submit-post")
const token = localStorage.getItem("token")
const successAlert = document.querySelector("#success-alert")
const dangerAlert = document.querySelector("#danger-alert")





async function getAllPosts(url){
    try {
        // const token = localStorage.getItem("token")
        const data = {
            method: "GET",
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
        const response = await fetch(url,data)
        console.log(response)
        const posts = await response.json()
        console.log(posts)
        feeds.innerHTML = ""
        renderAllPosts(posts)
        const editButtons = document.querySelectorAll("#edit-button")
        const deleteButtons = document.querySelectorAll("#delete-button")
        deleteButtons.forEach((button)=>{
            button.onclick = function(){
                const id = this.dataset.id
                console.log(id)
                deletePost(createPostUrl,id)
            }
        })

        // editButton.addEventListener("click",showmessage())
        // deleteButton.addEventListener("click",showmessage())
        
    } catch (error) {
        console.log(error)
    }
}
getAllPosts(postsUrl)



//This part will add a tag to an array æwhen a user press Enter key when the value is not empty string.
let tagsArray = []
tagsInput.addEventListener("keydown",(e)=>{
    if(e.key==="Enter"){
        if(tagsInput.value){
        // console.log(tagsInput.value)
        tagsArray.push(tagsInput.value)
        tagsView.value += `#${tagsInput.value} `
        tagsInput.value=""
    }
}
})
//this button will empty the tags array and clear the value of tags text input
clearTags.addEventListener("click",()=>{
    tagsArray =[]
    tagsInput.value=""
    tagsView.value =""
})
console.log(submitPost)

//This will prevent the form from submitting when Enter key is pressed 
addPostForm.addEventListener("keydown",(e)=>{
    if(e.key === "Enter"){
        e.preventDefault()
    }
})

addPostForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    const title = addPostForm.title.value
    const imageUrl = addPostForm.imageUrl.value
    const body = addPostForm.body.value
    const tags = tagsArray
    // console.log(title, imageUrl, body, tags)
    const data ={
        title:title,
        body:body,
        tags: tags,
        media:imageUrl
    }
    console.log(data)
    addNewPost(createPostUrl,data)
})

// add new post to the api
// submitPost.addEventListener("submit",(e)=>{
//     e.preventDefault()
    
//     const title = addPostForm.title.value
//     const imageUrl = addPostForm.imageUrl.value
//     const body = addPostForm.body.value
//     const tags = tagsArray
//     // console.log(title, imageUrl, body, tags)
//     const data ={
//         title:title,
//         body:body,
//         tags: tags,
//         media:imageUrl
//     }
//     console.log(data)
//     // addNewPost(createPostUrl,data)

// })

// This function will add the post to the api if everything is validated
async function addNewPost(url,data){
    try {
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
    });
    console.log(response)
    const json = await response.json();
    console.log(json)
    // If the post is added successfully an Alert will Show with success message
    if(response.status === 200){
        console.log("hellllloooooo")
        successAlert.classList.toggle("d-none");
        setTimeout(()=>{
            successAlert.classList.toggle("d-none")
            addPostForm.reset()
            location.reload()
        },1000)
    }
    else{
        console.log(json.errors[0].message)
        dangerAlert.classList.toggle("d-none")
        dangerAlert.innerHTML= json.errors[0].message
        setTimeout(()=>{
            dangerAlert.classList.toggle("d-none")
        },1500)


    }
        
    } catch (error) {
        console.log(error)
        
    }


}

function showmessage(){
    console.log("this is the button")
}
