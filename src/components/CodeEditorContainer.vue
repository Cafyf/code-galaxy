<template>
  <QuestionsPrb :problemContainer="this.problemContainer" />
 <div class="editor-container">
  <CodeEditor :codeTemplate="codeSinppet" :defaultInput="defaultIp" @showOutput="initializeCompiledOutPut"/>
  <ErrorMsgs :change="change" :outputContainer="outputData" />
 </div>
</template>

<script>
import QuestionsPrb from './QuestionsPrb.vue'
import CodeEditor from './CodeEditor.vue'
import ErrorMsgs from './ErrorMsgs.vue'
import QuestionsMock from './QuestionsMock.json'

export default {
    name:'CodeEditorContainer',
    components:{CodeEditor, ErrorMsgs,QuestionsPrb},
  props:{
    name :{
        type: String,
        required:true,
        default:'hey'
    }
  },
    data(){
        console.log("first rendered");
        return {
        defaultIp:{
            defaultIp:[],
            methodDesc:''
        },
        problemContainer:{
            problemQuestion:'',
            sampleInputDesc:[]
        },
        outputData:{
            show:true,
            msg:'',
            defaultOpDesc:undefined,
        },
        change:false,
        codeSinppet:""
        };
    },
    methods:{
        constructDefaultOpContent(DefaultAnswers,newOutPut){
           DefaultAnswers.forEach((element,index) => {
                if(element.ans==newOutPut[index]){
                    element.error=false;
                }else{element.error=true}
                element.output=newOutPut[index];
             });
             return DefaultAnswers;
        },  //array question topics user input ah disable pannidu
        initializeCompiledOutPut(message,show,showDefaulTester){
            this.outputData.show=show;
            if(showDefaulTester==="showWithDefault"){
         this.outputData.defaultOpDesc= this.constructDefaultOpContent(QuestionsMock[this.name].sampleInputDesc,message.split("\r\n"));
         console.log(this.outputData.defaultOpDesc);
         this.change=!this.change; // it is used to trigger the renders of error component
        }
            else {
             this.outputData.msg=message;
             this.outputData.defaultOpDesc=undefined;
        }
            
      }
    },
    created(){
     try{  
        this.codeSinppet=QuestionsMock[this.name].methodTemplate;
        this.defaultIp.methodDesc=QuestionsMock[this.name].methodDesc;
        this.defaultIp.defaultIp=QuestionsMock[this.name].inputDesc;
        this.problemContainer.problemQuestion=QuestionsMock[this.name].questions;
        this.problemContainer.sampleInputDesc=QuestionsMock[this.name].sampleInputDesc.slice(0,3);
     } catch(err){
        alert("Question not found");
        this.$router.go(-1)
     }
        console.log(this.name);
    }
}
</script>

<style scoped>

.editor-container{
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
}
</style>