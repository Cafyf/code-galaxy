<template>
  <div>
    <Codemirror
      ref="editor"
      v-model:value="code"
      :options="cmOptions"
      border
      placeholder="JAVA LOGICAL PROGRAMS"
      :height="200"
    />
    <br />
    <button @click="compileAndRun">RUN</button> &hairsp;
    <span
      ><button @click="toggle">{{ Enabletrace.msg }}</button></span
    >
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

import { ref } from "vue";

export default {
  components: { Codemirror },
  props:{
      defaultInput:{
        type:Object
      }
  },
  props:{
      codeTemplate:{
        type:String
      }
  },
  data() {
    return {
      code:this.codeTemplate,
      Enabletrace: { msg: "enable Trace Mood", switch: false },
      userIp:''
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
          console.log(response);
          this.$emit("showOutput", response.data.output, true ,(this.userIp===''&&this.Enabletrace.switch===false)?"showWithDefault":"");
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 400) {
            this.$emit("showOutput", error.response.data.error, false);
          } else {
            this.$emit("showOutput",error.response.data.error.stderr.split("error:"),false);
          }
        });
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
  },
};
</script>

<style>
.cm-s-dracula span.cm-keyword {
  color: #ff4706 !important;
}

.cm-s-dracula.CodeMirror {
  background-color: #2f2f2f !important;
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
</style>
