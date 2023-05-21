<template>
<div>
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

</div>
</template>

<script>
export default {
    name:"Demo",

    data(){
     return{
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
         getImage(imgUrl) {
            return require('../../src/assets/'+imgUrl);
         }
      }

}
</script>

<style scoped>
.card-body{
   border-radius: 10px !important;
}
h3{
   margin: 10px;
   margin-bottom: 19px !important;
}
.card-main{
   width: 100% !important;
    height: 60% ;
    margin-bottom: 20px;
}

.imgs{
    width: 100%;
    object-fit: cover;
    cursor:not-allowed;
}

.imgs2{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.text-box{
   padding-left: 18px;
}
small{
   font-size: 14px !important;
   color: #635959;;
}
.p1{
 margin-bottom: 3px;
    margin-top: 16px;
}
.p2{
    margin-bottom: 3px;
    margin-top: 8px;
    font-size: 11px;
    color: #969090;
}
.box-2{
    display: grid;
    grid-template-columns: 0.5fr 1fr ;
    padding: 5px;
    border-radius: 5px;
    border: none;
    box-shadow: 1px 1px 4px 0px #50454557;
    margin-bottom: 25px;
    transition: 0.3s ease-in-out;
    cursor:not-allowed;
}
.box{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 20px !important;
}
.inner-box{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 30px !important;
}
.box-2:hover{
   box-shadow:1px 1px 6px 2px #5b565657 ;
}

</style>