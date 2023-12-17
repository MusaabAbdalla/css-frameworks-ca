const token = localStorage.getItem("token")
let posts 
export async function fetchAllPosts(url){
    try {
        const data = {
            method: "GET",
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
        const response = await fetch(url,data)
        const json = await response.json()
         posts = json
        

    } catch (error) {
        console.log(error)
    }
    return posts
}