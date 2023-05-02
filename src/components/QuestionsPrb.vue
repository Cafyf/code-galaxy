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

<style>
.question-section{
 margin: 10px 10px 10px 0px;
 width: 50%;
}
.input-desc{
padding-top: 15px;
}
</style>