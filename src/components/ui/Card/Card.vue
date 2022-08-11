<script>
import Comment from "./Comment.vue"
import Avatar from "../Avatar.vue"
export default{
    name: "Card",
    components: {
    Comment,
    Avatar
},
props: [ "email", "content", "url", "comments", "id", "currentUser", "userId", "isAdmin", "nbrFans" ],
data() {
return {
    
    currentComment: null,
    selectedImage:null
}
},
mounted() {},   
methods: {    
    addComment(e){
console.log(this.currentComment)
console.log(this.$props.id)
const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT }  = import.meta.env    
    const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`
const options = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "POST",
        body: JSON.stringify({  comment: this.currentComment})
        }

        console.log("options:", options)

        fetch(url + "/AddComment/" +this.$props.id , options)
        .then((res) =>{
            if (res.status === 200) {
            return res.json()        
        } else {
            throw new Error("failed to fetch posts")
        }
        })
        .then((res) => {
        console.log('res:',res)
        this.$router.go()
        })
        .catch((err) => console.log("err:",err))
        }, 
        deletePost(){
        const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT }  = import.meta.env    
    const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`
const options = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "DELETE",        
        }
        console.log("options:", options)
        
        console.log("the request will de sent to the following address:" , url + "/" + this.$props.id)
        fetch(url + "/" +this.$props.id,  options)
            .then((res) =>{
            if (res.status === 200) {
            return res.json()        
        } else {
            throw new Error("failed to delete post")
        }
        })
        .then((res) => {
        console.log('res:',res)
        this.$router.go()       
        })
        .catch((err) => console.log("err:",err))

    },    
    
    likePost(postId, userId){
        const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT }  = import.meta.env    
    const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`
    const options = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            method: "GET",        
            }
            console.log("options:", options)
            
            console.log("the request will de sent to the following address:" , url + "/LikePost?userId=" +userId +"&postId=" + postId)
            fetch(url + "/LikePost?userId=" +userId +"&postId=" + postId,  options)
                .then((res) =>{
                if (res.status === 200) {
                return res.json()        
            } else {
                throw new Error("failed to like this post")
            }
            })
            .then((res) => {
            console.log('res:',res)
            this.$router.go()       
            })
            .catch((err) => console.log("err:",err))        
    },    
}
}
</script>
<template>
<div class="card mb-3 m-auto">    
    <div class="card-header d-flex justify-content-between">
        <div class ="d-flex flex-colum comment_text p_1">
            <img src="./../../../assets/avatar-circle.png" class="rounded-circle shadow-4" alt="Avatar" />
            <span>{{ email }}</span> 
        </div>                 
        <div class="d-inline ">            
            <i v-if="currentUser === email || isAdmin === 1" class="bi bi-trash3 mx-2" @click="deletePost"></i> 
            <span v-if="selectedImage">{{selectedImage.name}}</span>            
            <RouterLink  :to="{name:'EditCategory', params : {id}}"><button  v-if="currentUser === email || isAdmin === 1"    class="btn btn-primary ms-auto rounded-pill">Edit</button></RouterLink>                        
            <i v-if="!currentUser === !email" class="bi bi-hand-thumbs-up-fill" @click="likePost(id, userId)" ></i>
            <span class="badge bg-danger mx-2">{{this.$props.nbrFans}}</span>
        </div>        
    </div>
    <img v-if="url" :src="url" class="card-img-top" alt="..." />
    <div class="card-body">    
    <p class="card-text">{{ content }}</p>
    <div v-for="comment in comments">
    <Comment :email="comment.user.email" :content="comment.content"></Comment>
    </div>
    <div class="d-flex gap-1">
        <div class ="d-flex flex-colum comment_text p_1"></div>
        <Avatar></Avatar>
        <input type="text" class="form-control" placeholder="Username" aria-label="Username" v-model="currentComment" />        
        <button @click="addComment" type="button" class="btn btn-primary  ms-auto rounded-pill">Post</button>
    </div>
</div>
</div>
</template>
<style scoped>
@media  (min-width: 768px) { 
    .card {
    width: 70%;    
}
}
#file-input {
    font-size: 13px;
    padding-left: 1rem;
}
#file-input:hover {
    cursor: pointer;
    color: blue;
    transform: scale(1.1);
}
.rounded-pill{
    font-size: smaller;
}
.card-header {
    display:flex;
    align-items: center;    
}
.bi-trash3 {
    margin-left: auto; 
}
.bi-trash3:hover {
    cursor: pointer;
    color: blue;
    transform: scale(1.2);
}
.card-header img {
    width: 60px;
    margin-right: 0.6rem;
}
.gap-1{
    align-items: inherit;
}
.card-body{
    position: relative; 
}
.card-text{    
    display: flex;
    align-items: center;
}
.bi-hand-thumbs-up-fill{
    font-size:18px ;
    padding-left: 0.2rem;
}
.bi-hand-thumbs-up-fill:hover {
    cursor: pointer;
    color: red;
    transform: scale(1.2);
}
.btn-primary{
    background-color: #FFD7D7 !important;
    border-color:#FD2D01 !important;
}
.btn:hover {
    cursor: pointer;
    color: red;
    transform: scale(1.1);
}
.card-text{
    font-family: 'Lato' !important;
}


.d-flex{
    align-items: center;
}

</style>