<style lang="css" scoped src="./demo.css"></style>
<script  src="./demo.js"></script>

<template>
<section>
 <div class="box">
  <div v-for="(img,index) in firstImgs" :key="index" class="card card-main">
  <div class="card-body p-0">
    <img class="imgs" :src="getImage(img)" alt="">
  </div>
</div>
 </div>
<h3>Study plan <small>coming soon...</small></h3>
<div class="inner-box">

<div class="box-2" v-for="n in 6" :key="n"> 
    <img class="imgs2"  :src="getImage(`cover${n-1}.png`)" alt="">
    <div class="text-box">
      <p class="p1">{{subContent[n-1].p1}}</p>
      <p class="p2">{{subContent[n-1].p2}}</p>
    </div>
   </div>
</div>

</section>
</template>


