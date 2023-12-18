
const token = localStorage.getItem("token")
const successAlert = document.querySelector("#success-alert")
const dangerAlert = document.querySelector("#danger-alert")





export async function editPost(url,data){
    try {
        const response = await fetch(url,{
            method:"PUT",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify(data)
            
        })
        const json = await response.json()


    if(response.status === 200){
        successAlert.classList.toggle("d-none");
        setTimeout(()=>{
            successAlert.classList.toggle("d-none")
            location.replace("/feed")
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