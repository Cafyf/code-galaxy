<template>
<div>
  <Codemirror
    ref="editor"
    v-model:value="code"
    :options="cmOptions"
    border
    placeholder="JAVA LOGICAL PROGRAMS"
    :height="200"
    @change="change"
  /> <br>
  <button @click="compileAndRun">RUN</button>
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
  
  setup() {
    const code = ref(`
class Main {
   public static void main(String [] args){
     System.out.println("hello nandy loose buddy im rps!");
     for(int i=1;5>i;i++){
        System.out.println("For Loop Executing "+i);
     }
   }
}`);
    return {
      code,
      cmOptions: {
        lineNumbers: true,
        mode: "text/x-java", // Language mode
        theme: "dracula", // Theme
      }
    };
  },
  methods:{ //try to differentiate complie time error and run time error like codeing bat
   async compileAndRun(){
    const playload={
        language:"java",
        code:this.code
    }
   
  await axios.post(" http://localhost:5000/run",playload).then(response =>{
     this.$emit('showOutput',response.data.output,true);
  }).catch(error =>{
    console.log(error.response.data.error);
    this.$emit('showOutput',error.response.data.error.stderr.split("error:"),false);
  });
 }
}
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
  width: 100% ;
}
</style>
