<template>
  <div class="question-section">
    {{problemContainer.problemQuestion}}
    <div class="input-desc">
       <span v-for="(inputDesc,index) in problemContainer.sampleInputDesc" :key="index">
         {{inputDesc.desc+" "+inputDesc.ans}} <br> 
         </span> 
    </div>
  </div>
</template>

<script>
export default {
    props:{
        problemContainer:{
           type:Object
        }
    },

    method:{
      
    }

}
</script>

<style scoped>
.question-section{
  margin-left: 25px !important;
 margin: 13px 10px 10px 0px;
 width: 100%;
 background: white;
 box-shadow: 0px 2px 0px 0px black;
margin-bottom: 30px;
padding-bottom: 10px;
}
.input-desc{
  background: rgb(247, 247, 247);
  padding-left: 15px;
padding-top: 15px;
}
</style>