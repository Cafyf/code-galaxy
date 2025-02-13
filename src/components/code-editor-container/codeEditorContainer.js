import { Component, Vue, Prop } from "vue-facing-decorator";
import { toRaw } from "vue";
import HttpClient from '@/service/httpClient.js'
import RequestBodyFactory from "../../Utils/request-body-factory.js"
import store from "../../store/store";
import QuestionsPrb from "../questions/QuestionsPrb.vue";
import CodeEditor from "../code-editor/CodeEditor.vue";
import ErrorDisplayProcessor from '../output-panel/error-display-processor/ErrorDisplayProcessor.vue'
import OutputPanel from "../output-panel/OutputPanel.vue";
import LocalStorageUtils from "@/Utils/local-storage-utils.js";
import IndexedDbService from "@/service/indexedDbService.js";
import ObjectUtils from "@/Utils/object-utils.js";

@Component({
  components: { CodeEditor, ErrorDisplayProcessor, QuestionsPrb, OutputPanel}
})
export default class CodeEditorContainer extends Vue {
  @Prop({ type: String, required: true, default: "hey" }) name;
  @Prop({ type: String, default: "" }) option;

  methodAndInputs = {
    testInputs: [],
    methodSignature: "",
  };

  problemContainer = {
    problemQuestion: "",
    sampleInputDesc: [],
  };

  outputData = {
    isTestResult: false,
    msg: "",
    defaultOpDesc: undefined,
  };

  change = false;
  codeSnippet = "";
  showEditor = false;

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
    store.commit('updateDefaultTestAccepted',Object.values(DefaultAnswers).length !== count ? "Wrong Answer" : "Accepted");
    // if (Object.values(DefaultAnswers).length !== count) {
    //   state.isDefaultTestAccepted = "Wrong Answer";
    // } else {
    //   state.isDefaultTestAccepted = "Accepted";
    // }
    return DefaultAnswers;
  }; 
  //array question topics user input ah disable pannidu
  initializeCompiledOutPut(message, resultFlag) {
    this.outputData.isTestResult = resultFlag; // instead of this flag use outputType eg:testResult,normal,error
    if (resultFlag) { 
      this.outputData = {
        ...this.outputData, defaultOpDesc: this.constructDefaultOpContent(
          store.state.questions[this.name].sampleInputDesc,
          message
        )
      }
      console.log(this.outputData.defaultOpDesc);
    } else {
      this.outputData = { ...this.outputData, msg: message, defaultOpDesc: undefined };
    }
  };

  async submit(code) {
    console.log(store.state.questions, "questions2");
    const topic = LocalStorageUtils.getItem("topic");
    const runtime = Math.floor(Math.random() * 20) + 1;
    const userInfo = LocalStorageUtils.getItem("user-info");
    const sessionInfo = LocalStorageUtils.getItem("active-session");
    console.log(
      code,
      this.name,
      store.state.isDefaultTestAccepted,
      store.state.lastRunnedStatus
    );
    const submissionStatus =
      store.state.lastRunnedStatus === "Accepted"
        ? store.state.isDefaultTestAccepted
        : store.state.lastRunnedStatus;

    //The request body values should be follow the preserve order of request Body keys
    const submissionReqBodyValues = [userInfo.id,this.name,submissionStatus,runtime + " ms","Java",code,topic.topic];
    const progressReqBodyValues = [userInfo.id,this.name,topic.topic,store.state.questions[this.name].mode,state.lastRunnedStatus];
    const sessionReqBodyValues = [userInfo.id,sessionInfo.sessionName,store.state.questions[this.name].mode];

    const reqBodyValues =[submissionReqBodyValues,progressReqBodyValues,sessionReqBodyValues];

    const response = await HttpClient.executeApiCall('post', "http://localhost:8090/submit", { reqBody:RequestBodyFactory.createRequestBody('submit',reqBodyValues) });
    if (response.status == 200) {
      alert("Submitted");
    }
    console.log(response);
  };

   async created() {
    this.showEditor=false; 
    LocalStorageUtils.setItem('selectedQuestionName',this.name)
    try {
      const question = await this.fetchAndInitQuestion();
      this.initializeDefaultMethodWithInputs(question);
      this.initializeProblemContainer(question);
      this.initializeCodeSnippet(question);
    }
    catch (err) {
      console.error(err);
      this.$router.go(-1);
    }
    this.showEditor=true;
    console.log(this.name, " Question Selected");
  };

  initializeCodeSnippet(question) {
    if (this.option === "previous") {
      this.codeSnippet = store.state.submittedQuestions;
    } else {
      this.codeSnippet = question.methodTemplate;
    }
  }

  initializeDefaultMethodWithInputs(question) {
    this.methodAndInputs.methodSignature = question.methodDesc;
    this.methodAndInputs.testInputs = question.inputDesc;
  }

  initializeProblemContainer(question) {
    this.problemContainer.problemQuestion = question.questions;
    this.problemContainer.sampleInputDesc = question.sampleInputDesc.slice(0, 3);
  }

  async fetchAndInitQuestion(){
    let question = await IndexedDbService.getData("questions",this.name);
    if(ObjectUtils.isNullOrUndefinedOrEmpty(question)){
        question = store.state.questions[this.name]; // make API call here  
        question.name = this.name;
        await IndexedDbService.addData("questions",toRaw(question));
    }
    return question;
  }
}