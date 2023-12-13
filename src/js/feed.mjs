
import { postsUrl } from "./utils/variables.mjs";
import renderAllPosts from "./ui/renderAllPosts.mjs"
const feeds = document.querySelector("#feeds")






async function getAllPosts(url){
    try {
        const token = localStorage.getItem("token")
        const data = {
            method: "GET",
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
        const response = await fetch(url,data)
        console.log(response)
        const json = await response.json()
        console.log(json)
        feeds.innerHTML = ""
        renderAllPosts(json)

        // json.forEach((post)=>{
        //     feeds.innerHTML += `
        //     <h2>${post.title}</h2>
        //     `
        // })
            
        

        
    } catch (error) {
        console.log(error)
    }
}
getAllPosts(postsUrl)