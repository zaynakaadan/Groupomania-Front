<script>
import Avatar from "../Avatar.vue"

export default{
    name: "Comment",
    compenents: {
        Avatar
    },
    props: {
        email: {
            type: String,
            required: true
        },
        content: {
            trype: String,
            required: true
        }
    } 
}
</script>
<template>
<div class="d-flex gap-1">
    <b-avatar src="https://placekitten.com/50/50" size="2rem"></b-avatar>
    <div class=" d-flex flex-column comment_text p-1">        
    <p> {{email}}</p>      
    <p>{{content}}</p>
    </div>
</div> 
</template>

<style scoped>
.comment_text {
background-color: var(--bs-gray-300);
border-radius: 5px;
width:100%;
margin-block:0.3rem ;
}
.card-body > .d-flex{   
    margin-bottom: 0.5rem;
}
.d-flex p{
    margin-bottom: 0;
}
.d-flex p:nth-child(1) {
    font-weight: 500;
}
body {
    font-family: var(--bs-font-lato);
}
</style>
