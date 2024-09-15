<style lang="css" scoped src="./signup.css"></style>
<template>
  <div class="container">
    <form @submit.prevent="validateInputs">
      <h1>Registration</h1>
      <div class="input-control" :class="{ error: !usernameIsValid && !stopValidate }">
        <label for="username">Username</label>
        <input v-model="username" id="username" name="username" type="text">
        <div class="error">{{ usernameError }}</div>
      </div>
      <div class="input-control" :class="{ error: !emailIsValid && !stopValidate}">
        <label for="email">Email</label>
        <input v-model="email" id="email" name="email" type="text">
        <div class="error">{{ emailError }}</div>
      </div>
      <div class="input-control" :class="{ error: !passwordIsValid && !stopValidate }">
        <label for="password">Password</label>
        <input v-model="password" id="password" name="password" type="password">
        <div class="error">{{ passwordError }}</div>
      </div>
      <div class="input-control" :class="{ error: !passwordMatch && !stopValidate }">
        <label for="password2">Password again</label>
        <input v-model="password2" id="password2" name="password2" type="password">
        <div class="error">{{ password2Error }}</div>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:"SignupPage",
  data() {
    return {
      stopValidate:true,
      username: '',
      email: '',
      password: '',
      password2: '',
      usernameError: '',
      emailError: '',
      passwordError: '',
      password2Error: ''
    };
  },
  computed: {
    usernameIsValid() {
      return this.username.trim() !== '';
    },
    emailIsValid() {
      const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return this.email.trim() !== '' && emailPattern.test(this.email.trim().toLowerCase());
    },
    passwordIsValid() {
      return this.password.trim() !== '' && this.password.trim().length >= 8;
    },
    passwordMatch() {
      return this.password === this.password2;
    }
  },
  methods: {
    validateInputs() {
      if(this.stopValidate){this.stopValidate=false; return;}
      console.log("logged",this.stopValidate);
      this.usernameError = !this.usernameIsValid ? 'Username is required' : '';
      this.emailError = !this.emailIsValid ? 'Provide a valid email address' : '';
      this.passwordError = !this.passwordIsValid ? 'Password must be at least 8 characters' : '';
      this.password2Error = !this.passwordMatch ? "Passwords don't match" : '';

      if (this.usernameIsValid && this.emailIsValid && this.passwordIsValid && this.passwordMatch) {
         this.submit();
      }
    },
   async submit(){
    const reqBody={
    "name":this.username,
    "email":this.email,
    "password":this.password2,
    "userProfile":{}
}
      const signed=  await axios.post("http://localhost:8090/addUser",reqBody);
      if(signed.status===200){
         if(signed.data.email==='Email already exist please use different'){
          alert('Email already exist please use different');
          return;
         }
        signed.data.password='';
        localStorage.setItem('user-info',JSON.stringify(signed.data));
        alert("SignUp Successful");
        this.$router.push({ name: 'HomePage' })
        console.log(signed.data);
      }
    }
  }
};
</script>