<style lang="css" scoped src="./signup.css"></style>
<script  src="./signUpPage.js"></script>
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