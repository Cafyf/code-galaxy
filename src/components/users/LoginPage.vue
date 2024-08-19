<style lang="css" scoped src="./login.css"></style>

<template>
  <div class="wrapper">
    <header>Login Form</header>
    <form @submit.prevent="submitForm">
      <div class="field email" :class="{ shake: emailError }">
        <div class="input-area">
          <input type="text" placeholder="Email Address" v-model="email">
          <i class="icon fas fa-envelope"></i>
          <i class="error error-icon fas fa-exclamation-circle"></i>
        </div>
        <div class="error error-txt" v-if="!email">Email can't be blank</div>
        <div class="error error-txt" v-else-if="!validEmail">Enter a valid email address</div>
      </div>
      <div class="field password" :class="{ shake: passwordError }">
        <div class="input-area">
          <input type="password" placeholder="Password" v-model="password">
          <i class="icon fas fa-lock"></i>
          <i class="error error-icon fas fa-exclamation-circle"></i>
        </div>
        <div class="error error-txt" v-if="!password">Password can't be blank</div>
      </div>
      
      <div class="pass-txt"><a href="#">Forgot password?</a></div>
      <input type="submit" value="Login">
    </form>
    <div class="sign-txt">Not yet a member? <router-link to="/signIn">Signup now</router-link></div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name:"LoginPage",
  data() {
    return {
      email: '',
      password: '',
      emailError: false,
      passwordError: false
    };
  },
  computed: {
    validEmail() {
      const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      return this.email.match(pattern);
    }
  },
  methods: {
    submitForm() {
      this.emailError = this.email === '';
      this.passwordError = this.password === '';

      if (!this.emailError && !this.passwordError) {
       this.logIn();
      }
    },
        initUserDatas(){
          const body={
    "id": 1,
    "name": "nandyRps",
    "email": "prasannaNandhini730@gmail.com",
    "password": "prasaNan57",
    "userProfile": {
        "userProfile": 2,
        "userName": "nandyRps",
        "status": "beginner"
    }
}
         localStorage.setItem("user-info",JSON.stringify(body));
          
         },
   async logIn(){
    console.log(this.email,this.password);
    try {   const response=  await axios.get(`http://localhost:8090/login/email=${this.email}&password=${this.password}`);
       if(response.data!=''){
          console.log(response.data);
           localStorage.setItem('user-info',JSON.stringify(response.data));
            this.$router.push({ name: 'HomePage' })
           alert("Login Success");
        } else {alert("InValid Username or Password")}
    } catch(err){
          console.log(err);
          initUserDatas(); 
          this.$router.push({ name: 'HomePage' })
    }
   }
  }
};
</script>