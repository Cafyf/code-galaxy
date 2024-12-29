<style lang="css" src="./codeEditor.css"></style>
<script  src="./codeEditor.js"></script>

<template>
  <div>
    <div id="editor" style="height: 280px; width: 100%;"></div>
    <br> 
    <button id="run" class="button-13" >RUN</button> &hairsp;
    <button id="submit" :disabled="disableOn" class="float-end button-62">Submit</button>
  </div>
</template>




