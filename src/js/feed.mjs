
import { postsUrl } from "./utils/variables.mjs";





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
        
    } catch (error) {
        console.log(error)
    }
}
getAllPosts(postsUrl)