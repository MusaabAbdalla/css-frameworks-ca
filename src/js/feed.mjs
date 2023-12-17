
import { postsUrl, createPostUrl} from "./utils/variables.mjs";
import renderAllPosts from "./ui/renderAllPosts.mjs"
import { deletePost } from "./api/deletePost.mjs";
import {addNewPost} from "./api/addNewPost.mjs"
import { fetchAllPosts } from "./api/fetchAllposts.mjs"; 
const feeds = document.querySelector("#feeds")
const tagsInput = document.querySelector("#tags")
const clearTags = document.querySelector("#clear-tags")
const tagsView = document.querySelector("#tags-view")
const token = localStorage.getItem("token")
const addPostForm = document.querySelector("#add-new-post-form")
const serachForm = document.querySelector("#search-form")
const select = document.querySelector("#select")
const searchInput = document.querySelector("#search-input")





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
        const posts = await response.json()
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
    addNewPost(createPostUrl,data)
})


// I tried to import fetchAllPost from a file but i got a Promise, I think it has something to do with async code 
// thats way this section is very long and ugly
serachForm.addEventListener("submit",()=>{
    switch(select.value){
        case "1":
            async function searchById(url){
                try {
                    const data = {
                        method: "GET",
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }
                    const response = await fetch(url,data)
                    const posts = await response.json()
                    console.log(posts)
                    const postsFromAuthor = posts.filter((post)=>{
                        if(post.id === parseInt(searchInput.value)){
                            return true
                        }
                    })
                    console.log(postsFromAuthor)
                    feeds.innerHTML=""
                    renderAllPosts(postsFromAuthor)

                } catch (error) {
                    console.log(error)
                }
            }
            searchById(postsUrl)

            break;

        case "2":
            async function searchByAuthor(url){
                try {
                    const data = {
                        method: "GET",
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }
                    const response = await fetch(url,data)
                    const posts = await response.json()
                    console.log(posts)
                    const postsFromAuthor = posts.filter((post)=>{
                        if(post.author.name.toLowerCase() === searchInput.value.toLowerCase()){
                            return true
                        }
                    })
                    console.log(postsFromAuthor)
                    feeds.innerHTML=""
                    renderAllPosts(postsFromAuthor)

                } catch (error) {
                    console.log(error)
                }
            }
            searchByAuthor(postsUrl)

            break;
        case "3":
            async function searchByContent(url){
                try {
                    const data = {
                        method: "GET",
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }
                    const response = await fetch(url,data)
                    const posts = await response.json()
                    console.log(posts)
                    const postsThatContains = posts.filter((post)=>{
                        if(post.body.toLowerCase().includes(searchInput.value.toLowerCase()) ){
                            return true
                        }
                    })
                    console.log(postsThatContains)
                    feeds.innerHTML=""
                    renderAllPosts(postsThatContains)

                } catch (error) {
                    console.log(error)
                }
            }
            searchByContent(postsUrl)
            break;
        default:
            alert("Please select search catogary")
    }

})


// const str = 'This is my example string!';
// const substr = 'my';
// if(str.toLowerCase().includes(substr.toLocaleLowerCase())){
//     console.log("hello")
// }

// console.log(str.includes(substr));
