<script>
function submitForm (email, password, router) { 
  console.log("router:", router)   
  console.log({email, password}) 
  console.log(import.meta.env)  
const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT }  = import.meta.env 
const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/auth/login`
const options = {
  method:'POST',
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ email, password })
}
fetch(url, options)
    .then((res) => {
      console.log("res:", res)
      if (res.ok)  return res.json()
      res.text().then((err) => {
        console.log("error:", err)
        const {error} = JSON.parse(err)
        console.log("message:",error)
        this.error = error
        throw new Error(error)
      })                        
    })
    .then((res) => {
      const token = res.token
      localStorage.setItem("token", token) 
        router.push("/home")  
    })
  .catch((err) => {
    console.error(err)        
  })  
}

export default {
    name : "LoginPage" ,
    data() {
      return {email: "zk10-91@hotmail.com", password: "abc123", confirmPassword:"abc123", hasInvalidCredentials:false, error:null, isLoginMode:true}
    },
    methods: {
      submitForm,
      isFormValid,
      toggleLoginMode(){
        this.isLoginMode = !this.isLoginMode
      },
      signUp(){
        console.log("sign up")
        const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT }  = import.meta.env 
        const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/auth/signup`
        const options = {
        method:'POST',
        headers: {
        "Content-Type": "application/json",
        
        },
        body: JSON.stringify({ email:this.email, password: this.password, confirmPassword: this.confirmPassword})
}
console.log("options:", options)
fetch(url, options)
    .then((res) => {
      console.log("res:", res)
      if (res.status === 200)  return res.json()
      res.text().then((err) => {
        console.log("error:", err)
        const {error} = JSON.parse(err)
        console.log("message:",error)
        this.error = error
        throw new Error("Failed to signup")
      })                        
    })
    .then((res) => {   
        this.$router.go()
        //this.$router.push("/home")  
    })
  .catch((err) => {
    this.error = error
    console.error(err)        
  })  
      }
    },
    watch: {
      email(Value) {        
        const isValueEmpty = Value === ""
        this.isFormValid(!isValueEmpty) 
        this.error = null
      },
      password(value) {      
      const isValueEmpty = value === ""
        this.isFormValid(!isValueEmpty) 
        this.error = null
      }
    }  
}

function isFormValid(bool) {
  console.log("isFormValid:",bool)
  this.hasInvalidCredentials = !bool
}
      
</script>
<template>
<main class="form-signin">
  <form :class="this.hasInvalidCredentials ? 'hasErrors' : ''">
    <img class="mb-4 d-block mx-auto" src="../../public/favicon.ico" alt="" width="72" height="57">
    <h1 class="h3 mb-3 fw-normal">{{this.isLoginMode? "Please sign in" : "Please enter your data"}}</h1>

    <div class="form-floating">
      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model ="email" required = "true" @invalid="isFormValid" />
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model ="password" required = "true" @invalid="isFormValid" />
      <label for="floatingPassword">Password</label>
    </div>
    <div v-if="!isLoginMode" class="form-floating">
      <input type="password" class="form-control"  placeholder="Confirm password" v-model ="confirmPassword" required = "true" @invalid="isFormValid" />
      <label for="floatingPassword">Confirm Password</label>
    </div>
    <div v-if="hasInvalidCredentials" class="error-msg">Fields cannot be empty</div>
    <div v-if="!hasInvalidCredentials && error" class="error-msg">{{error}}</div>
    <button v-if="isLoginMode" class="w-100 btn btn-lg btn-primary" type="submit" @click.prevent="() => submitForm(this.email, this.password, this.$router)" :disabled="hasInvalidCredentials" >Sign in</button>
    <button v-if="!isLoginMode" class="w-100 btn btn-lg btn-primary" type="submit" @click.prevent="signUp" :disabled="hasInvalidCredentials" >Register</button>
    <p class="mt-1 mb-1" @Click.prevent="toggleLoginMode"><a href="" > {{this.isLoginMode? "Create an account" : "Back to login"}}</a></p>
    
  </form>
</main>
</template>

<style >

.hasErrors input{
border: 1px solid red;
}
.error-msg {
  color:red;
}

html,
body {
  align-items: center; 
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {  
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
button[type="submit"]{
  margin-block: 0.8rem;
}

    .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }


</style>