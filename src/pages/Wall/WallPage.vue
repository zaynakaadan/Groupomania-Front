<script>
import Card from "../../components/ui/Card/Card.vue"
import PostForm from "./PostForm.vue"
export default {
    name: "WallPage",
    components: {
        Card,
        PostForm
    },
    // verify s'il y a token dans local storage
    beforeCreate() {        
        const token = localStorage.getItem("token")
        //si je change ou supprime le token dans local storage il va me rammener sur le page login
        if (token == null) {
        this.$router.push("/login")
        }
    },//Récupérer les data depuis le serveur
    mounted(){
    const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT }  = import.meta.env    
    const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`
    const options = {
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    console.log("options:", options)
    fetch(url, options)
    .then((res) => {
        if (res.status === 200) {
            return res.json()
        }else{
            throw new Error ("Failed to fetch posts")//quand je modifie ou supprime le token  
        }
        })
        
    .then((res) => {
        console.log("res:", res)
        const { email, posts } = res        
        this.currentUser = email
        this.posts = posts
        console.log("this.posts:", this.posts)
    })
    .catch((err) => console.log("err:",err))
        },
        data() {
            return {
                posts: [],
                currentUser: null
            }
        }
}
</script>
<template>
<div v-if="currentUser" class="container-sm">
<div class="col-sm-12">
    <h1 class="text-center"> Welcome, {{currentUser}}</h1>
</div>
    <PostForm></PostForm>
    <div v-if ="posts.length === 0">No posts to display. Start chatting!</div>
    <div v-for="post in posts">
        <Card :currentUser="currentUser" :email="post.user.email"  :content="post.content" :url="post.imageUrl" :comments="post.comments" :id="post.id"></Card>
    </div>
</div>
</template>
<style scoped >
h1{
    font-size: 0.8rem;
    margin-block:0.5rem;
}
</style>