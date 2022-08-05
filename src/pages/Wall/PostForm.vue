<script>
export default {
    name: "PostForm",
    data () {
      return {
        content: "",
        selectedImage: null
      }
    },
    methods: {
      handleFileSelected(e) {
        console.log("e:", e.target.files[0])
        this.selectedImage = e.target.files[0]
      },
      handleClick() {
      const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT} = import.meta.env
      const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`
      //Fabriqué un formData
      const formData = new FormData()
      formData.append("content", this.content)
      formData.append("image", this.selectedImage)
      const options = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Accept": "application/json"
        },
        method: "POST",
        body: formData
      }
      console.log("options:", options)
      fetch(url, options)
        .then((res) =>{
          console.log("res:", res)
      if (res.status === 200)  return res.json()
      res.text().then((err) => {
        console.log("error:", err)
        const {error} = JSON.parse(err)
        console.log("message:",error)
        this.error = error
        throw new Error("Failed to post")
      })                        
    })
    .then((res) => {     
        this.$router.go() 
    })
      .catch((err) => console.log("err:",err))
      }  
    }
}
</script>
<template>
<div class="form-floating mt-3">
<input  class="form-control py-3" v-model="content"  />    
</div>
<div class="d-flex">
<label for="file-input" class="btn btn-secondary mt-1">Add Image</label>
<span v-if="selectedImage">{{selectedImage.name}}</span>
<input id="file-input" type="file" @change="handleFileSelected" />
<button @click ="handleClick"   type="button"  class="btn btn-primary mt-1 ms-auto ">Post</button>
</div>
{{content}}

<hr class="dropdown-divider mt-4" />
</template>


<style scoped type="sass">
#file-input {
    display: none;
}
div span {
  font-size: 0.9rem;
  margin-left: 0.5rem;
}
body{
background-color: lighten(var(--bs-gray-100), 30%) !important;
}
.btn-primary{
  background-color: #FFD7D7 !important;
  border-color:#FD2D01 !important;
  color:#FD2D01 !important;
}
.py-3{
  font-family: 'Lato' !important;
}
</style>