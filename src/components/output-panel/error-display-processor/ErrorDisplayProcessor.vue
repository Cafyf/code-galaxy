<style lang="css" scoped src="./errorDisplay.css"></style>
<script  src="./errorDisplayProcessor.js"></script>

<template>
<section>
    <div class="errorMsg">
       <h3 :style="{ color: textColor }">{{ errorheader }}</h3>
     <pre style="margin:0px; padding-top:5px;" v-for="(error,index) in formatOutPutMessage(outputContainer)" :key="index">{{error}} </pre>
  </div>
</section>
</template>