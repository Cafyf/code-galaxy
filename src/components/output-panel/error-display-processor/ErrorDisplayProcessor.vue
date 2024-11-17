<style lang="css" scoped src="./errorDisplay.css"></style>
<script  src="./errorDisplayProcessor.js"></script>

<template>
<section>

  
    <div v-if="show===false && supportShow!==true" class="errorMsg">
       <h3 :style="{ color: textColor }">{{ errorheader }}</h3>
     <pre style="margin:0px; padding-top:5px;" v-for="(error,index) in formatOutPutMessage(outputContainer)" :key="index">{{error}} </pre>
  </div>
   <div v-if="show===true && supportShow!==true">
    <span  v-for="(output,index) in formatOutPutMessage(outputContainer)" :key="index">   {{output}} <br> </span>
   </div>

<div class="test" v-if="supportShow===true">
   <table class="output">
      <tbody>
        <tr>
          <th>Expected</th>
          <th>Run</th>
          <th>Status</th>
          <th></th>
        </tr>
        <tr v-for="(output,index) in formatOutPutMessage(outputContainer)" :key="index">
          <th>{{output.desc+" "+output.ans}}</th>
          <th>{{output.output}}</th>
          <th>{{output.error?'X ':"ok"}}</th>
          <th  :class="{error:output.error,pass:!output.error}"></th>
          </tr>
      </tbody>
   </table>
</div>

</section>

</template>