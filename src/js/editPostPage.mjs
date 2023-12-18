import { createPostUrl } from "./utils/variables.mjs"
import {fetchPost} from "./api/fetchpost.mjs"
import { editPost } from "./api/editPost.mjs"
const editPostForm = document.querySelector("#edit-post-form")
const tagsInput = document.querySelector("#tags")
const clearTags = document.querySelector("#clear-tags")
const tagsView = document.querySelector("#tags-view")

const queryString =  document.location.search
const params = new URLSearchParams(queryString)
const id = params.get("id") 
const url = `${createPostUrl}/${id}`
console.log(editPostForm)

//first i need to fetch the post from the api
fetchPost(url)


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

//This will prevent the form from submitting when Enter key is pressed 
editPostForm.addEventListener("keydown",(e)=>{
    if(e.key === "Enter"){
        e.preventDefault()
    }
})

editPostForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    const title = editPostForm.title.value
    const imageUrl = editPostForm.imageUrl.value
    const body = editPostForm.body.value
    const tags = tagsArray
    // console.log(title, imageUrl, body, tags)
    const data ={
        title:title,
        body:body,
        tags: tags,
        media:imageUrl
    }
    editPost(url,data)
})



