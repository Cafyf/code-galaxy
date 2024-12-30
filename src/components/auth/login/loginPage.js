import { Component, Vue } from "vue-facing-decorator";
import HttpClient from '@/service/httpClient.js'
import ObjectUtils from "@/Utils/object-utils";
import ValidationUtils from '@/Utils/validation-util';
import { navigateTo } from "@/router/navigation";
import LocalStorageUtils from "@/Utils/local-storage-utils";

@Component
export default class LoginPage extends Vue {
  email = "";
  password = "";
  emailError = false;
  passwordError = false;

  get emailIsValid() {
    return ValidationUtils.emailIsValid(this.email);
  }
  
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
      name: "RpsFreko",
      email: "prasanna@gmail.com",
      password: "prasa57",
      userProfile: {
        userProfile: 2,
        userName: "Rps",
        status: "beginner",
      },
    };
    LocalStorageUtils.setItem("user-info",body);
  };
  async logIn() {
    console.log(this.email, this.password);
    try {
      const params ={email:this.email,password:this.password};
      const response =  await HttpClient.executeApiCall('get',"http://localhost:8090/login",{ params });
      if (response.data != "") {
        console.log(response.data);
        LocalStorageUtils.setItem("user-info",response.data);
        navigateTo("HomePage");
        alert("Login Success");
      }else {
        alert("InValid Username or Password");
      }
    } catch (err) {
      console.log(err);
      this.initUserDatas();
      navigateTo("HomePage");
    }
  };
}
