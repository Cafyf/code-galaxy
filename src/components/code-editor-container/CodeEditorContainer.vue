<style lang="css" scoped src="./codeContainer.css"></style>
<script  src="./codeEditorContainer.js"></script>

<template>
<div class="main-container">
  <QuestionsPrb :problemContainer="problemContainer" />
 <div class="editor-container">
  <CodeEditor :codeTemplate="codeSnippet " :miData="methodAndInputs" @submit="submit" @showOutput="initializeCompiledOutPut"/>
  <OutputPanel :change="change" :outputContainer="outputData"/>
 </div>
 </div>
</template>



