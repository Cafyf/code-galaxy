import { Component, Prop, Vue } from "vue-facing-decorator";
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main';
import HttpClient from "@/service/httpClient";
import store from "../../store/store";
import { onBeforeRouteLeave } from "vue-router";
import RequestBodyFactory from "@/Utils/request-body-factory";
import CodeViolationValidator from "@/service/codeViolationValidator";
import ObjectUtils from "@/Utils/object-utils";
import StringUtils from "@/Utils/string-utils";
import LocalStorageUtils from "@/Utils/local-storage-utils";
import { SessionStorageUtils } from "@/Utils/session-storage-utils";

@Component({
  setup() {
    return {};
  }
})
export default class CodeEditor extends Vue {
  @Prop({ type: Object }) miData; // method & input data
  @Prop({ type: String }) codeTemplate;
  disableOn = false;

  async compileAndRun(submissionCheck,codeSnippet) {
    const methodPrototype = CodeViolationValidator.isMultipleMethodSignature(codeSnippet) ? this.miData.methodSignature : " ";
    const codePayload = [codeSnippet, this.miData.testInputs, methodPrototype,LocalStorageUtils.getItem("user-info").id];
    console.log(codePayload, "codePay", this.miData);
    const rulesVoilated = CodeViolationValidator.rulesViolationChecker(codeSnippet, this.miData.methodSignature);
    if (rulesVoilated) {
      this.$emit("showOutput", rulesVoilated, false);
      return;
    }

    let runOrBreaker = true;
    if (!submissionCheck && !ObjectUtils.isNullOrUndefinedOrEmpty(store.state.retainedCode) && !StringUtils.hasValueChanged(store.state.retainedCode, codeSnippet)) {
      runOrBreaker = confirm("Code is not changed from it's last run the output would be remain same, are you sure want to re-run or you can cancle it.");
    }
    store.state.retainedCode = codeSnippet;
    if (!runOrBreaker) return;

    await HttpClient.executeApiCall('post', "http://localhost:8090/execute", { reqBody: RequestBodyFactory.createRequestBody('code', codePayload) }).then((response) => {
      if (response.status != 200) throw new Error(`HTTP Error: ${response.statusText}`);
      const data = response.data;
      store.state.lastRunnedStatus = data.codeStatus;
      console.log(response, data, "--------------- response and data");
      this.$emit("showOutput", data.output, data.codeStatus === "Accepted");
    })
      .catch((error) => {
        store.state.lastRunnedStatus = "error"; 
        alert("some unexpected error try again!")
        console.log("Error", error);
      });
  };

  async submit(codeSnippet) {
    this.disableOn = true;
    let runOrBreaker = true;
    //code snippet is modified from it's last run are you sure submit
    if (!ObjectUtils.isNullOrUndefinedOrEmpty(store.state.retainedCode) && StringUtils.hasValueChanged(store.state.retainedCode, codeSnippet)) {
      runOrBreaker = confirm("The code was modified from its last run do you want to Submit it.\nAre you sure to submit might can expect unexpected resulted.");
    }

    if (!runOrBreaker) {
      this.disableOn = false;
      return;
    };

    await this.compileAndRun(true,codeSnippet);// please discuss can we do run before submit or not (Note:if ok can we perform in frontend or backend)
    this.$emit("submit",codeSnippet);
    this.disableOn = false;
  };

  buildMonacoEditor(monacoContainer){
      // Define custom tokenization for the Java language
    monaco.languages.setMonarchTokensProvider('java', {
        tokenizer: {
          root: [
            [
              /\b(interface|enum|public|private|protected|static|final|abstract|synchronized|volatile|transient|native|strictfp|super|this|extends|implements|package|import|throws|throw|new|try|catch|finally|return|if|else|while|for|switch|case|break|continue|default|goto|null)\b/,
              'keyword',
            ],
            [
              /\b(class|const|boolean|byte|char|short|int|long|float|double|void|null)\b|\b([A-Z][a-zA-Z0-9]*)\b/,
              'type',
            ],
            [/\b(true|false)\b/, 'boolean'],
            [/\b(\d+)\b/, 'number'],
            [/[A-Za-z_][A-Za-z0-9_]*/, 'identifier'],
            [/[;,.]/, 'delimiter'],
            [/\"([^\\\"]|\\.)*\"/, 'string'],
            [/'([^\\']|\\.)*'/, 'string'],
            [/\/\/.*/, 'comment'],
            [/(\/\*[\s\S]*?\*\/)/, 'comment'],
            [/\b([A-Za-z_][A-Za-z0-9_]*)(?=\s*\()/, 'method'], // Match methods
          ],
        },
      });
    const template =  SessionStorageUtils.getItem(localStorage.getItem('selectedQestionName')) ?? this.codeTemplate;
    store.state.retainedCode = template;
    
    const model = monaco.editor.createModel(template, 'java');
  
      // Create the editor instance with the custom model
    const editor = monaco.editor.create(monacoContainer, {
        model: model,
        theme: 'vs',
        automaticLayout: false,
        minimap: { enabled: false },
        fontSize: 12,
        padding: { top: 10},
        scrollBeyondLastLine: false,
        scrollbar: {
          verticalScrollbarSize: 6,
        },
        lineDecorationsWidth:2,
        lineNumbersMinChars: 4
    });
    
    editor.layout({width:monacoContainer.offsetWidth,height:monacoContainer.offsetHeight - 2});

    document.getElementById('run').addEventListener('click',() => {
      this.compileAndRun(false,model.getValue());
    });

    document.getElementById('submit').addEventListener('click',() => {
      this.submit(model.getValue());
    });

    this.boundHandlePreserveCode = () => this.handlePreserveCode(model.getValue());
    
    window.addEventListener('beforeunload', this.boundHandlePreserveCode);

    onBeforeRouteLeave(() => {
      console.log("Leaving the route from Class Component!");
      this.handlePreserveCode(model.getValue());
     });

    window.addEventListener('resize', () => {
      editor.layout();
    });
    
 // find a solution to perform dispose editor
  }

  handlePreserveCode = (value) => {
    const questionName = LocalStorageUtils.getItem('selectedQestionName');
    if(ObjectUtils.isNullOrUndefinedOrEmpty(value)){
      SessionStorageUtils.setItem(questionName, null);
      return ;
    }
    if(StringUtils.hasValueChanged(value, store.state.retainedCode )){
      //localStorage.setItem("checking",value+"   /    "+store.state.retainedCode );
      SessionStorageUtils.setItem(questionName, value);
    } 
  };

 async mounted() {
    const monacoContainer = document.getElementById('editor');
    if (monacoContainer) {
      this.buildMonacoEditor(monacoContainer);
    }
  }

  beforeUnmount(){
    window.removeEventListener('beforeunload',this.boundHandlePreserveCode);
    this.boundHandlePreserveCode=null;
  }
}
