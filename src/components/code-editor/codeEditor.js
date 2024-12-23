import { Component, Prop, Vue } from "vue-facing-decorator";
import Codemirror from "codemirror-editor-vue3";
import "codemirror/addon/display/placeholder.js";
import "codemirror/mode/clike/clike";
import "codemirror/theme/dracula.css";
import HttpClient from "@/service/httpClient";
import state from "../../store/store";
import RequestBodyFactory from "@/Utils/request-body-factory";
import CodeViolationValidator from "@/service/codeViolationValidator";
import ObjectUtils from "@/Utils/object-utils";
import StringUtils from "@/Utils/string-utils";

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
  @Prop({ type: Object }) miData;
  @Prop({ type: String }) codeTemplate;
  sizeheight = 300;
  codeSnippet = '';
  disableOn = false;

  async compileAndRun(submissionCheck) {
    const methodPrototype = CodeViolationValidator.isMultipleMethodSignature(this.codeSnippet) ? this.miData.methodSignature : " ";
    const codePayload = [this.codeSnippet, this.miData.testInputs, methodPrototype, JSON.parse(localStorage.getItem("user-info")).id];
    console.log(codePayload, "codePay", this.miData);
    const rulesVoilated = CodeViolationValidator.rulesViolationChecker(this.codeSnippet, this.miData.methodSignature);
    if (rulesVoilated) {
      this.$emit("showOutput", rulesVoilated, false);
      return;
    }

    let runOrBreaker = true;
    if (!submissionCheck && !ObjectUtils.isNullOrUndefinedOrEmpty(state.retainedCode) && !StringUtils.hasValueChanged(state.retainedCode, this.codeSnippet)) {
      runOrBreaker = confirm("Code is not changed from it's last run the output would be remain same, are you sure want to re-run or you can cancle it.");
    }
    state.retainedCode = this.codeSnippet;
    if (!runOrBreaker) return;

    await HttpClient.executeApiCall('post', "http://localhost:8090/execute", { reqBody: RequestBodyFactory.createRequestBody('code', codePayload) }).then((response) => {
      if (response.status != 200) throw new Error(`HTTP Error: ${response.statusText}`);
      const data = response.data;
      state.lastRunnedStatus = data.codeStatus;
      console.log(response, data, "--------------- response and data");
      this.$emit("showOutput", data.output, data.codeStatus === "Accepted");
    })
      .catch((error) => {
        state.lastRunnedStatus = "Error";
        alert("some unexpected error try again!")
        console.log("Error", error);
      });
  };

  async submit() {
    this.disableOn = true;
    let runOrBreaker = true;
    //code snippet is modified from it's last run are you sure submit
    if (!ObjectUtils.isNullOrUndefinedOrEmpty(state.retainedCode) && StringUtils.hasValueChanged(state.retainedCode, this.codeSnippet)) {
      runOrBreaker = confirm("The code was modified from its last run do you want to Submit it.\nAre you sure to submit might can expect unexpected resulted.");
    }

    if (!runOrBreaker) {
      this.disableOn = false;
      return;
    };

    await this.compileAndRun(true);// please discuss can we do run before submit or not (Note:if ok can we perform in frontend or backend)
    this.$emit("submit", this.codeSnippet);
    this.disableOn = false;
  };

  created() {
    this.codeSnippet = this.codeTemplate;
  };
}