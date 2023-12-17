
import { postsUrl, createPostUrl} from "./utils/variables.mjs";
import renderAllPosts from "./ui/renderAllPosts.mjs"
import { deletePost } from "./api/deletePost.mjs";
import {addNewPost} from "./api/addNewPost.mjs"
const feeds = document.querySelector("#feeds")
const tagsInput = document.querySelector("#tags")
const clearTags = document.querySelector("#clear-tags")
const tagsView = document.querySelector("#tags-view")
const submitPost = document.querySelector("#submit-post")
const token = localStorage.getItem("token")
const addPostForm = document.querySelector("#add-new-post-form")





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
        editButtons.forEach((button)=>{
            button.onclick = function(){
                const id = this.dataset.id
                window.location.replace(`../post/?id=${id}`)
            }
            
        })
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



