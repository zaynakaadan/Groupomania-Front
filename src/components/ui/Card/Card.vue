<script>
import Comment from "./Comment.vue"
import Avatar from "../Avatar.vue"
export default{
    name: "Card",
    components: {
    Comment,
    Avatar
},
props: [ "email", "content", "url", "comments", "id", "currentUser" ],
data() {
return {
    currentComment: null,
    
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

        fetch(url + "/" +this.$props.id , options)
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
       // this.comments.push(res)
        //this.currentComment = null
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
    editPost(){
        const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT }  = import.meta.env    
    const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`
const options = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "PUT",        
        }
        console.log("options:", options)

        
        console.log("the request will de sent to the following address:" , url + "/" + this.$props.id)
        fetch(url + "/" +this.$props.id,  options)
            .then((res) =>{
            if (res.status === 200) {
            return res.json()        
        } else {
            throw new Error("failed to edit post")
        }
        })
        .then((res) => {
        console.log('res:',res)
        this.$router.go()       
        })
        .catch((err) => console.log("err:",err))    
    }
}
}

</script>
<template>
<div class="card mb-3 m-auto">
    <div class="card-header">
        
    <img src="./../../../assets/avatar-circle.png" class="rounded-circle shadow-4" alt="Avatar" />
        <span>{{ email }}</span>                 
        <i v-if="currentUser === email" class="bi bi-trash3" @click="deletePost"></i> 
        <i v-if="currentUser === email" class="bi bi-pen" @click="editPost"></i>
        <i v-if="!currentUser === !email" class="bi bi-hand-thumbs-up-fill" @click="likePost" ></i>

        </div>
    <img v-if="url" :src="url" class="card-img-top" alt="..." />
    <div class="card-body">
    <h5 class="card-title">{{ title }}</h5>
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
<style>
@media  (min-width: 768px) { 
    .card {
    width: 70%;
}
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
.bi-pen {
    font-size:18px ;
    padding-left: 0.5rem;
}
.bi-pen:hover {
    cursor: pointer;
    color: blue;
    transform: scale(1.2);
}
.bi-hand-thumbs-up-fill{
    font-size:18px ;
    padding-left: 0.5rem;
}
.bi-hand-thumbs-up-fill:hover {
    cursor: pointer;
    color: red;
    transform: scale(1.2);
}

</style>