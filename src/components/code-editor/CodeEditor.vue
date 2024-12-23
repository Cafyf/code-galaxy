<style lang="css" src="./codeEditor.css"></style>
<script  src="./codeEditor.js"></script>

<template>
  <div>
    <Codemirror
      ref="editor"
      v-model:value="codeSnippet"
      :options="cmOptions"
      border
      placeholder="JAVA LOGICAL PROGRAMS"
      :height="sizeheight"
    />
    <br> 
    <button class="button-13" @click="compileAndRun(false)">RUN</button> &hairsp;
    <button :disabled="disableOn" class=" float-end button-62" @click="submit">Submit</button>
  </div>
</template>




