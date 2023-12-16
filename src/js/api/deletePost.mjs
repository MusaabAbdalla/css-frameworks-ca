
export async function deletePost(url,id){
    try{
        const token = localStorage.getItem("token");
        console.log(token)
        const data = {
            method:"DELETE",
            headers:{
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            }
        }
        const response = await fetch(`${url}/${id}`,data)
        console.log(response)
        const json = await response.json()
        console.log(json)

    }catch(error){
        console.log(error)
    }
}