
import { postsUrl, createPostUrl} from "./utils/variables.mjs";
import renderAllPosts from "./ui/renderAllPosts.mjs"

const feeds = document.querySelector("#feeds")
const addPostForm = document.querySelector("#add-new-post-form")
const tagsInput = document.querySelector("#tags")
const clearTags = document.querySelector("#clear-tags")
const tagsView = document.querySelector("#tags-view")
const submitPost = document.querySelector("#submit-post")
const token = localStorage.getItem("token")





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
        
    } catch (error) {
        console.log(error)
    }
}
// getAllPosts(postsUrl)



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

// add new post to the api
submitPost.addEventListener("click",(e)=>{
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
    addNewPost(createPostUrl,data)

})
//this function will 
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
        
    } catch (error) {
        console.log(error)
        
    }


}