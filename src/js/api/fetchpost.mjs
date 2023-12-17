const token = localStorage.getItem("token")
const editPostForm = document.querySelector("#edit-post-form")
// const tagsView = document.querySelector("#tags-view")



export async function fetchPost(url){
    try{
        const response = await fetch(url,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            }
        })
        const json = await response.json()
        //adding all vlaues to the edit form
        editPostForm.title.value = json.title
        editPostForm.imageUrl.value = json.media
        editPostForm.body.value = json.body

    }
    catch(error){
        console.log(error)
    }
}