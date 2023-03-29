<template>
 <div class="editor-container">
  <CodeEditor @showOutput="initializeCompiledOutPut"/>
  <ErrorMsgs  :outputContainer="outputData" />
 </div>
</template>

<script>
import CodeEditor from './CodeEditor.vue'
import ErrorMsgs from './ErrorMsgs.vue'

export default {
    name:'CodeEditorContainer',
    components:{CodeEditor, ErrorMsgs},

    data(){
        return {
        outputData:{
            show:true,
            msg:''
        }
        };
    },
    methods:{
        initializeCompiledOutPut(message,show){
            this.outputData.show=show;
            this.outputData.msg=message;
        }
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