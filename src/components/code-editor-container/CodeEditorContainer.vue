<style lang="css" scoped src="./codeContainer.css"></style>
<script  src="./codeEditorContainer.js"></script>

<template>
<div class="main-container">
  <QuestionsPrb :problemContainer="problemContainer" />
 <div class="editor-container">
  <CodeEditor :codeTemplate="codeSnippet " :defaultInput="defaultIp" @submit="submit" @showOutput="initializeCompiledOutPut"/>
  <ErrorMsgs :change="change" :outputContainer="outputData" />
 </div>
 </div>
</template>



