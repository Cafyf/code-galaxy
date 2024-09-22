<style lang="css" scoped src="./demo.css"></style>

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

<script>
import getImage from '../../Utils/asset-utils'
export default {
    name:"Demo",

    data(){
     return{      
        getImage,
        firstImgs:['java.jpg','js.png','topic.png'],
        subContent:[
         { 
            p1:'Top Interview 100',
            p2:'Must-do List for Interview Prep'
        },
         { 
            p1:'Java Code',
            p2:'Ace Coding Interview with 75Q'
        },
         { 
            p1:'SQL 50',
            p2:'Crack SQL Interview in 50 Qs'
        },
         { 
            p1:"Algorithm's 20",
            p2:'Code Galaxy Staff Pick'
        },
         { 
            p1:'Java FrameWorks ',
            p2:'Practice FrameWork '
        },
         { 
            p1:'Dynamic Programming',
            p2:'10 Essential DP Patterns'
        }
        ]
     }
    },

      methods:{
         
      }

}
</script>
