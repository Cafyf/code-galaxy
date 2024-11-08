import { Component, Vue, Prop } from "vue-facing-decorator";
import QuestionsPrb from "../questions/QuestionsPrb.vue";
import CodeEditor from "../code-editor/CodeEditor.vue";
import ErrorMsgs from "../error-message/ErrorMsgs.vue";
import HttpClient from '@/service/httpClient.js'
import state from "../../store/index";
import RequestBodyFactory from "../../Utils/request-body-factory.js"

@Component({
  components: { CodeEditor, ErrorMsgs, QuestionsPrb }
})
export default class CodeEditorContainer extends Vue {
  @Prop({ type: String, required: true, default: "hey" }) name;
  @Prop({ type: String, default: "" }) option;

  defaultIp = {
    defaultIp: [],
    methodDesc: "",
  };

  problemContainer = {
    problemQuestion: "",
    sampleInputDesc: [],
  };

  outputData = {
    show: true,
    msg: "",
    defaultOpDesc: undefined,
  };

  change = false;
  codeSnippet = "";

  constructDefaultOpContent(DefaultAnswers, newOutPut) {
    let count = 0;
    DefaultAnswers.forEach((element, index) => {
      if ("" + element.ans == newOutPut[index]) {
        console.log(element.ans, newOutPut[index]);
        count++;
        element.error = false;
      } else {
        element.error = true;
      }
      element.output = newOutPut[index];
    });
    if (Object.values(DefaultAnswers).length !== count) {
      state.isDefaultTestAccepted = "Wrong Answer";
    } else {
      state.isDefaultTestAccepted = "Accepted";
    }
    return DefaultAnswers;
  }; //array question topics user input ah disable pannidu
  initializeCompiledOutPut(message, show, showDefaulTester) {
    this.outputData.show = show;
    if (showDefaulTester === "showWithDefault") {
      this.outputData.defaultOpDesc = this.constructDefaultOpContent(
        state.questions[this.name].sampleInputDesc,
        message.split("\r\n")
      );
      console.log(this.outputData.defaultOpDesc);
      this.change = !this.change; // it is used to trigger the renders of error component
    } else {
      this.outputData.msg = message;
      this.outputData.defaultOpDesc = undefined;
    }
  };

  async submit(code, errors) {
    console.log(state.questions, "questions2");
    const topic = JSON.parse(localStorage.getItem("topic"));
    const runtime = Math.floor(Math.random() * 20) + 1;
    const userInfo = JSON.parse(localStorage.getItem("user-info"));
    const sessionInfo = JSON.parse(localStorage.getItem("active-session"));
    console.log(
      code,
      errors,
      this.name,
      state.isDefaultTestAccepted,
      state.lastRunnedStatus
    );
    const submissionStatus =
      state.lastRunnedStatus === "Accepted"
        ? state.isDefaultTestAccepted
        : "compile Error";

    //The request body values should be follow the preserve order of request Body keys
    const submissionReqBodyValues = [userInfo.id,this.name,submissionStatus,runtime + " ms","Java",code,topic.topic];
    const progressReqBodyValues = [userInfo.id,this.name,topic.topic,state.questions[this.name].mode,state.lastRunnedStatus];
    const sessionReqBodyValues = [userInfo.id,sessionInfo.sessionName,state.questions[this.name].mode];

    const reqBodyValues =[submissionReqBodyValues,progressReqBodyValues,sessionReqBodyValues];

    const response = await HttpClient.executeApiCall('post', "http://localhost:8090/submit", { reqBody:RequestBodyFactory.createRequestBody('submit',reqBodyValues) });
    if (response.status == 200) {
      alert("Submitted");
    }
    console.log(response);
  };

  created() {
    console.log(state.questions, "questions");
    try {
      const question = state.questions[this.name];
      this.initializeDefaultMethodWithInputs(question);
      this.initializeProblemContainer(question);
      this.initializeCodeSnippet(question);
    }
    catch (err) {
      console.error(err);
      alert("Question not found");
      this.$router.go(-1);
    }
    console.log(this.name, " Question Selected");
  };


  initializeCodeSnippet(question) {
    if (this.option === "previous") {
      this.codeSnippet = state.submittedQuestions;
    } else {
      this.codeSnippet = question.methodTemplate;
    }
  }

  initializeDefaultMethodWithInputs(question) {
    this.defaultIp.methodDesc = question.methodDesc;
    this.defaultIp.defaultIp = question.inputDesc;
  }

  initializeProblemContainer(question) {
    this.problemContainer.problemQuestion = question.questions;
    this.problemContainer.sampleInputDesc = question.sampleInputDesc.slice(0, 3);
  }
}