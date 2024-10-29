import { Component, Vue } from "vue-facing-decorator";
import HttpClient from '@/service/httpClient.js'
import ValidationUtils from '@/Utils/validation-util';

@Component
export default class SignupPage extends Vue {
  stopValidate = true;
  username = "";
  email = "";
  password = "";
  password2 = "";
  usernameError = "";
  emailError = "";
  passwordError = "";
  password2Error = "";

  get usernameIsValid() {
    return ValidationUtils.usernameIsValid(this.username);
  }
 
  get emailIsValid() {
    return ValidationUtils.emailIsValid(this.email);
    }
   get passwordIsValid() {
    return ValidationUtils.passwordIsValid(this.password);
  }
  
  get passwordMatch() {
    return ValidationUtils.passwordMatch(this.password, this.password2);
  }
  validateInputs() {
    if (this.stopValidate) {
      this.stopValidate = false;
      return;
    }
    console.log("logged", this.stopValidate);
    this.usernameError = !this.usernameIsValid ? "Username is required" : "";
    this.emailError = !this.emailIsValid ? "Provide a valid email address" : "";
    this.passwordError = !this.passwordIsValid
      ? "Password must be at least 8 characters"
      : "";
    this.password2Error = !this.passwordMatch ? "Passwords don't match" : "";

    if (
      this.usernameIsValid &&
      this.emailIsValid &&
      this.passwordIsValid &&
      this.passwordMatch
    ) {
      this.submit();
    }
  };
  async submit() {
    const reqBody = {
      name: this.username,
      email: this.email,
      password: this.password2,
      userProfile: {},
    };
   
    const signed = await HttpClient.executeApiCall('post', "http://localhost:8090/addUser", { reqBody });
    if (signed.status === 200) {
      if (signed.data.email === "Email already exist please use different") {
        alert("Email already exist please use different");
        return;
      }
      signed.data.password = "";
      localStorage.setItem("user-info", JSON.stringify(signed.data));
      alert("SignUp Successful");
      this.$router.push({ name: "HomePage" });
      console.log(signed.data);
    }
  };
}
