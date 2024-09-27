<style lang="css" src="./codeEditor.css"></style>
<script  src="./codeEditor.js"></script>

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




