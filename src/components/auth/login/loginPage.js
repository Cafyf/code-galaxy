import { Component, Vue } from "vue-facing-decorator";
import HttpClient from '@/service/httpClient.js'
import ObjectUtils from "@/Utils/object-utils";
import ValidationUtils from '@/Utils/validationUtil';

@Component
export default class LoginPage extends Vue {
  email = "";
  password = "";
  emailError = false;
  passwordError = false;

  get emailIsValid() {
    return ValidationUtils.emailIsValid(this.email);
  }

  // submitForm() {
  //   this.emailError = this.email === "";
  //   this.passwordError = this.password === "";

  //   if (!this.emailError && !this.passwordError) {
  //     this.logIn();
  //   }
  // };
  submitForm() {
    // Use ObjectUtils to check for empty values
    this.emailError = ObjectUtils.isNullOrUndefinedOrEmpty(this.email);
    this.passwordError = ObjectUtils.isNullOrUndefinedOrEmpty(this.password);

    // Proceed with login if no errors
    if (!this.emailError && !this.passwordError) {
      this.logIn();
    } 
  };


  initUserDatas() {
    const body = {
      id: 1,
      name: "nandyRps",
      email: "prasannaNandhini730@gmail.com",
      password: "prasaNan57",
      userProfile: {
        userProfile: 2,
        userName: "nandyRps",
        status: "beginner",
      },
    };
    localStorage.setItem("user-info", JSON.stringify(body));
  };
  async logIn() {
    console.log(this.email, this.password);
    try {
      const params ={email:this.email,password:this.password};
      const response =  await HttpClient.executeApiCall('get',"http://localhost:8090/login",{ params });
      if (response.data != "") {
        console.log(response.data);
        localStorage.setItem("user-info", JSON.stringify(response.data));
        this.$router.push({ name: "HomePage" });
        alert("Login Success");
      } else {
        alert("InValid Username or Password");
      }
    } catch (err) {
      console.log(err);
      this.initUserDatas();
      this.$router.push({ name: "HomePage" });
    }
  };
}
