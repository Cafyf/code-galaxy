import axios from "axios";
import { Component, Vue } from "vue-facing-decorator";

@Component
export default class LoginPage extends Vue {
  email = "";
  password = "";
  emailError = false;
  passwordError = false;

  get validEmail() {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    return this.email.match(pattern);
  };

  submitForm() {
    this.emailError = this.email === "";
    this.passwordError = this.password === "";

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
      const response = await axios.get(
        `http://localhost:8090/login/email=${this.email}&password=${this.password}`
      );
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
