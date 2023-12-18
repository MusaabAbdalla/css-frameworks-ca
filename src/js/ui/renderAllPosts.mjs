
const controllButtons = document.createElement("div")
export default function renderAllPosts(posts){
    posts.forEach((post)=>{
        const date = new Date(post.updated)
        const formatedDate = date.toLocaleString()
        let media = post.media

        if(!post.media){
            media = "../../../images/No_image_available.jpg"
        }
        else{
            media = post.media
        }
        //this will add delete and edit button only if the user is the owner of the post
        if(post.author.name === localStorage.getItem("user")){
            controllButtons.innerHTML = `
            <span class="d-flex flex-column gap-2">
                    <button type="button" class="btn btn-primary" id="edit-button" data-id="${post.id}" ><i class="uil uil-edit"></i> edit</button>
                    <button type="button" class="btn btn-danger" id="delete-button" data-id="${post.id}"><i class="uil uil-trash-alt"></i> delete</button>

                </span>
            `
        }
        else{
           controllButtons.innerHTML =""
        }


        feeds.innerHTML += `
                <div class="feeds" id="feeds">
                    <div class="feed bg-white bg-gradient rounded shadow p-5 my-5">
                        <div class="head d-flex justify-content-between p-3 my-2 lh-base">
                            <div class="user d-flex gap-3">
                                <div class="profile-photo" >
                                    <img src="/images/profile-13.jpg" class="rounded-circle" alt="" style="width: 6rem; height: 6rem;">
                                </div>
                                <div class="info">
                                    <h3>${post.author.name}</h3>
                                    <small><b class="me-1">Updated</b>${formatedDate}</small>
                                </div>
                            </div>
                            ${controllButtons.innerHTML}

                        </div>                       
                        <h2 class="mx-auto">${post.title}</h2>
                        <div class="photo overflow-hidden my-1 mx-auto  rounded shadow">
                            <img src=${media} class="rounded img-fluid" alt="">
                        </div>

                        <div class="action-buttons d-flex justify-content-between align-items-center fs-2 m-3">
                            <div class="interaction-buttons">
                                <span><i class="uil uil-heart"></i></span>
                                <span><i class="uil uil-comment-dots"></i></span>
                                <span><i class="uil uil-share-alt"></i></span>

                            </div>
                            <div class="bookmark">
                                <span><i class="uil uil-bookmark"></i></span>
                            </div>
                        </div>
                        <div class="liked-by d-flex align-items-center">
                            <span class="d-block rounded-circle overflow-hidden border border-5 border-white" style="width: 4rem; height: 4rem;"><img src="/images/profile-10.jpg" alt=""></span>
                            <span><img src="/images/profile-4.jpg" class="d-block rounded-circle overflow-hidden border border-5 border-white" style="width: 4rem; height: 4rem;" alt=""></span>
                            <span><img src="/images/profile-15.jpg" class="d-block rounded-circle overflow-hidden border border-5 border-white" style="width: 4rem; height: 4rem;" alt=""></span>
                            <p>Liked by <b>Ernest Achiever</b> and <b>2,3323 others</b></p>
                        </div>
                        <div class="caption">
                            <p class=""><b class="me-4">${post.author.name}</b>${post.body}<span class="hashtag">#lifestyle</span></p>
                        </div>
                        <div class="comments text-muted">View all 277 comments</div>


                    </div>

                </div>

        `
    })
}