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
   async logIn(){
    console.log(this.email,this.password);
       const response=  await axios.get(`http://localhost:8090/login/email=${this.email}&password=${this.password}`);
       if(response.data!=''){
          console.log(response.data);
           localStorage.setItem('user-info',JSON.stringify(response.data));
            this.$router.push({ name: 'HomePage' })
           alert("Login Success");
        } else {alert("InValid Username or Password")}
   }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
@import url('https://pro.font-awesome.com/releases/v5.10.0/css/all.css');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
body{
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background:linear-gradient(to right,#3f5efb,#fc466b);
}
::selection{
  color: #fff;
  background:linear-gradient(to right);
}
.wrapper{
  width: 370px;
  padding: 40px 30px 50px 30px;
  background: #fff;
  border-radius: 5px;
  text-align: center;
  box-shadow: -1px 0px 15px rgba(0, 0, 0, 0.1);
  margin: 0 auto; /* Add this line to center the wrapper horizontally */
  margin-top: 10vh;
}
.wrapper header{
  font-size: 35px;
  font-weight: 600;
}
.wrapper form{
  margin: 40px 0;
}
form .field{
  width: 100%;
  margin-bottom: 20px;
}
form .field.shake{
  animation: shake 0.3s ease-in-out;
}
@keyframes shake {
  0%, 100%{
    margin-left: 0px;
  }
  20%, 80%{
    margin-left: -12px;
  }
  40%, 60%{
    margin-left: 12px;
  }
}
form .field .input-area{
  height: 50px;
  width: 100%;
  position: relative;
}
form input{
  width: 100%;
  height: 100%;
  outline: none;
  padding: 0 45px;
  font-size: 14px;
  background: none;
  caret-color: #5372F0;
  border-radius: 5px;
  border: 1px solid #bfbfbf;
  border-bottom-width: 2px;
  transition: all 0.2s ease;
}
form .field input:focus,
form .field.valid input{
  border-color: #5372F0;
}
form .field.shake input,
form .field.error input{
  border-color: #dc3545;
}
.field .input-area i{
  position: absolute;
  top: 50%;
  font-size: 18px;
  pointer-events: none;
  transform: translateY(-50%);
}
.input-area .icon{
  left: 15px;
  color: #bfbfbf;
  transition: color 0.2s ease;
}
.input-area .error-icon{
  right: 15px;
  color: #dc3545;
}
form input:focus ~ .icon,
form .field.valid .icon{
  color: #5372F0;
}
form .field.shake input:focus ~ .icon,
form .field.error input:focus ~ .icon{
  color: #bfbfbf;
}
form input::placeholder{
  color: #bfbfbf;
  font-size: 17px;
}
form .field .error-txt{
  color: #dc3545;
  text-align: left;
  margin-top: 5px;
}
form .field .error{
  display: none;
}
form .field.shake .error,
form .field.error .error,
form.field.error.error
{
  display: block;
}
form .pass-txt{
  text-align: left;
  margin-top: -10px;
}
.wrapper a{
  color: #5372F0;
  text-decoration: none;
}
.wrapper a:hover{
  text-decoration: underline;
}
form input[type="submit"]{
  height: 50px;
  margin-top: 30px;
  color: #fff;
  padding: 0;
  border: none;
  background: #5372F0;
  cursor: pointer;
  border-bottom: 2px solid rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}
form input[type="submit"]:hover{
  background: #2c52ed;
}
</style>
