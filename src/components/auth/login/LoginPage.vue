<style lang="css" scoped src="./login.css"></style>
<script src="./loginPage.js"></script>
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