
const token = localStorage.getItem("token")
const successAlert = document.querySelector("#success-alert")
const dangerAlert = document.querySelector("#danger-alert")
const addPostForm = document.querySelector("#add-new-post-form")

export async function addNewPost(url,data){
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