import { Component, Prop, Vue } from "vue-facing-decorator";
import Codemirror from "codemirror-editor-vue3";
import "codemirror/addon/display/placeholder.js";
import "codemirror/mode/clike/clike";
import "codemirror/theme/dracula.css";
import HttpClient from "@/service/httpClient";
import state from "../../store/store";
import RequestBodyFactory from "@/Utils/request-body-factory";
import CodeViolationValidator from "@/service/codeViolationValidator";

@Component({
  components: { Codemirror },
  setup() {
    return {
      cmOptions: {
        lineNumbers: true,
        mode: "text/x-java", // Language mode
        theme: "dracula", // Theme
      },
    };
  }
})
export default class CodeEditor extends Vue {
  @Prop({ type: Object }) defaultInput;
  @Prop({ type: String }) codeTemplate;
  sizeheight = 300;
  codeSnippet = '';
  Enabletrace = { msg: "enable Trace Mood", switch: false };
  userIp = "";
  errors = "";
  
  async compileAndRun() {
    const codePayload = [this.codeSnippet,this.defaultInput.defaultIp," ",8342];
    console.log(codePayload,"codePay",this.defaultInput);
   const rulesVoilated = CodeViolationValidator.rulesViolationChecker(this.codeSnippet,this.defaultInput.methodDesc);
   console.log(rulesVoilated,"rulesVoilated");
   
   if(rulesVoilated){
    console.log("ullaaa");
    
      this.$emit(
        "showOutput", // emit Listner name
        rulesVoilated,
        false,
         ""
      );
      return ;
    }
    state.retainedCode=this.codeSnippet; 
    await HttpClient.executeApiCall('post',"http://localhost:8090/execute",{ reqBody:RequestBodyFactory.createRequestBody('code',codePayload) }).then((response) => {
       if(response.status!=200)  throw new Error(`HTTP Error: ${response.statusText}`);
        const data = response.data;
        state.lastRunnedStatus = data.codeStatus;
        console.log(response,data,"--------------- response and data");

        this.$emit(
          "showOutput", // emit Listner name
          data.output,
          data.codeStatus==="Accepted",
          data.codeStatus==="Accepted" && this.Enabletrace.switch === false
            ? "showWithDefault"
            : ""
        ); 
      })
      .catch((error) => {
        state.lastRunnedStatus = "Error";
        this.errors = "";
       console.log("Error",error);
      });
  };
  async submit() {
    if (this.Enabletrace.switch) {
      alert("You Can't Submit On Trace Mood");
      return;
    }
    await this.compileAndRun();
    this.$emit("submit", this.codeSnippet, this.errors);
  };

  toggle() {
    // popUp a msg it will show your code will disapper click checkBox to preserve [] ok and cancle button
    this.Enabletrace.switch = !this.Enabletrace.switch;

    if (this.Enabletrace.switch) {
      this.Enabletrace.msg = "disable Trace mood";
      this.codeSnippet = `//now you can practice and trace you code flow
 class Main {

   public static void main(String[] args) {
       System.out.println("hello world");
     }
 }
 `;
    } else {
      this.Enabletrace.msg = "enable Trace Mood";
      this.codeSnippet = this.codeTemplate;
    }
  };

  created(){
    this.codeSnippet=this.codeTemplate;
  };
}