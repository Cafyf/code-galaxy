<template>
  <div>
    <Codemirror
      ref="editor"
      v-model:value="code"
      :options="cmOptions"
      border
      placeholder="JAVA LOGICAL PROGRAMS"
      :height="sizeheight"
    />
    <br> 
    <button class="button-13" @click="compileAndRun">RUN</button> &hairsp;
    <span
      ><button class="button-13 btn-13" @click="toggle">{{ Enabletrace.msg }}</button></span
    >
    <button class=" float-end button-62" @click="submit">Submit</button>
  </div>
</template>

<script >
import axios from "axios";
import Codemirror from "codemirror-editor-vue3";

// placeholder
import "codemirror/addon/display/placeholder.js";

import "codemirror/mode/clike/clike";

// theme
import "codemirror/theme/dracula.css";
import state from '../../store/index'
export default {
  components: { Codemirror },
  props:{
      defaultInput:{
        type:Object
      },
       codeTemplate:{
        type:String
      }
  },

  data() {
    return {
      sizeheight:300,
      code:this.codeTemplate,
      Enabletrace: { msg: "enable Trace Mood", switch: false },
      userIp:'',
      errors:''
    };
  },
  setup() {
    return {
      cmOptions: {
        lineNumbers: true,
        mode: "text/x-java", // Language mode
        theme: "dracula", // Theme
      },
    };
  },
  methods: {
    //how to refresh the code mirror is enabled the mood
    // prevent code from the reload
    //hey the method doesnt contains static please create Object and call the method;
    async compileAndRun() {
      const playload = {
        language: "java",
        code: this.code,
        mode: this.Enabletrace.switch,
        userIp:this.userIp,
        input:this.defaultInput
      };
      
      await axios
        .post("http://localhost:5000/run", playload)
        .then((response) => {
          state.lastRunnedStatus='Accepted';
          this.$emit("showOutput", response.data.output, true ,(this.userIp===''&&this.Enabletrace.switch===false)?"showWithDefault":"");
        })
        .catch((error) => {
           state.lastRunnedStatus='Error';
          this.errors="compilation failed"
          if (error.response.status === 400) {
            this.errors="Declaraction MisMatch"
            this.$emit("showOutput", error.response.data.error, false);
          } else if(error.response.status === 500 && Object.values(error.response.data.error).length===0){
              this.errors="Declaraction MisMatch"
              this.$emit("showOutput",'Error:Internal Server Error\n\r Declarations are wrong', false,"");
          }
          else {
            console.log(error);
            this.$emit("showOutput",error.response.data.error.stderr.split("error:"),false,"");
          }
        });
    },
   async submit(){
    if(this.Enabletrace.switch){alert("You Can Submit On Trace Mood"); return;}
    await  this.compileAndRun();
     this.$emit("submit",this.code,this.errors)
    },

    toggle() {
      // popUp a msg it will show your code will disapper click checkBox to preserve [] ok and cancle button
      this.Enabletrace.switch = !this.Enabletrace.switch;

      if (this.Enabletrace.switch) {
        this.Enabletrace.msg = "disable Trace mood";
        this.code = `//now you can practice and trace you code flow
 class Main {

   public static void main(String[] args) {
       System.out.println("hello world");
     }
 }
 `;
      } else {
        this.Enabletrace.msg = "enable Trace Mood";
        this.code = this.codeTemplate;
      }
    },
  }
};
</script>

<style >
.cm-s-dracula span.cm-keyword {
  color: #ff4706 !important;
}

.cm-s-dracula.CodeMirror {
  background-color: #2f2f2f !important;
  font-size: 12.8px !important;
}
.cm-s-dracula span.cm-def {
  color: #3a99ff !important;
}
.cm-s-dracula span.cm-type {
  color: #ffc800 !important;
}
.cm-s-dracula span.cm-variable {
  color: #218dd6 !important;
}
.cm-s-dracula span.cm-string {
  color: #6bd9dc !important;
}

.codemirror-container.width-auto {
  width: 100%;
}

/* CSS */
.button-62 {
  background: linear-gradient(to bottom right, #4675e3, #0a4087);
  border: 0;
  border-radius: 12px;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system,system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 2.5;
  outline: transparent;
  padding: 0 1rem;
  text-align: center;
  text-decoration: none;
  transition: box-shadow .2s ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
}

.button-62:not([disabled]):focus {
  box-shadow: 0 0 .25rem rgba(0, 0, 0, 0.5), -.125rem -.125rem 1rem rgba(239, 71, 101, 0.5), .125rem .125rem 1rem rgba(255, 154, 90, 0.5);
}

.button-62:not([disabled]):hover {
  box-shadow: 0 0 .25rem rgba(0, 0, 0, 0.5), -.125rem -.125rem 1rem rgba(91, 89, 113, 0.5), .125rem .125rem 1rem rgba(7, 39, 134, 0.5);
}

.btn-13{
  width: 140px !important;
}
/* CSS */
.button-13 {
  background-color: #fff;
  border: 1px solid #d5d9d9;
  border-radius: 8px;
  box-shadow: rgba(213, 217, 217, .5) 0 2px 5px 0;
  box-sizing: border-box;
  color: #0f1111;
  cursor: pointer;
  display: inline-block;
  font-family: "Amazon Ember",sans-serif;
  font-size: 13px;
  line-height: 29px;
  padding: 0 10px 0 11px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  width: 100px;
}

.button-13:hover {
  background-color: #f7fafa;
}

.button-13:focus {
  border-color: #008296;
  box-shadow: rgba(213, 217, 217, .5) 0 2px 5px 0;
  outline: 0;
}
</style>
