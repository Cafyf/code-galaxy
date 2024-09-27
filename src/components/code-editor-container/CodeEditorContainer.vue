<style lang="css" scoped src="./codeContainer.css"></style>
<script  src="./signUpPage.js"></script>

<template>
<div class="main-container">
  <QuestionsPrb :problemContainer="this.problemContainer" />
 <div class="editor-container">
  <CodeEditor :codeTemplate="codeSinppet" :defaultInput="defaultIp" @submit="submit" @showOutput="initializeCompiledOutPut"/>
  <ErrorMsgs :change="change" :outputContainer="outputData" />
 </div>
 </div>
</template>



