<template>
<HeaderSection/>
<div class="container-page">
  <div class="QuestionGrpTopics">
    <div class="demoSection"><Demo/></div>
    
 <table>
    <tbody >
        <tr v-for="(headerTopic,index) in questionTopic" :key="index" >
            <td v-for="(details,index) in headerTopic" :key="index" >
                <div class="headingCottage">
                 <router-link class="h2" :to="{name: 'QuestionsGroups', query:{ topic:encodeURIComponent(JSON.stringify({header:details.header,starImg:details.starImg,stars:details.stars})) } }">{{details.header}}</router-link>&ensp;
                 <img width="20" v-for="i in details.stars" :key="i" :src="getImage(details.starImg)" alt=""> <br>
                 <span>{{details.desc}}</span> <br>
                 <img  :src="getImage(details.tickImg)" alt="">
                </div>
            </td>
        </tr>
    </tbody>
  </table>
  </div>
  <sessionCard  />
  </div>
  <footerPage/>
</template>

<script>
import QuestionTopics from './mocks/QuestionTopics.json'
import sessionCard from './cards/sessionCard.vue'
import Demo from './Demo.vue'
import footerPage from './footerPage.vue'
import HeaderSection from './HeaderSection.vue'
export default {
  name:"HomePage",
  components:{sessionCard,Demo,footerPage,HeaderSection},
  data(){
   return {
    questionTopic:{}
   }
  },
   methods:{
         getImage(imgUrl) {
            return require('../../src/assets/'+imgUrl);
         },
         initUserDatas(){
          const body={
    "id": 1,
    "name": "nandyRps",
    "email": "prasannaNandhini730@gmail.com",
    "password": "prasaNan57",
    "userProfile": {
        "userProfile": 2,
        "userName": "nandyRps",
        "status": "beginner"
    }
}
         localStorage.setItem("user-info",JSON.stringify(body));
          
         }
    },
     created(){
    //  this.initUserDatas();
     
      this.questionTopic=QuestionTopics.topics;
    }
}
</script>

<style  scoped>
body{
  margin-left: 15px !important;
}
.QuestionGrpTopics{
float: left;
}
.headingCottage{
    max-width: 100%;
    margin: 15px;
    padding: 10px;
    border-radius: 9px;
    box-shadow: 0 2px 4px 4px rgba(0, 0, 0, 0.1);
     transition: box-shadow 0.5s ease;
}
.headingCottage:hover{
 box-shadow:  0px 4px 0px rgba(0, 0, 0, 0.1);;  
}

.h2{
  font-size: 166% !important;
}
.container-page{
  display: grid;
  grid-template-columns: 2.5fr 1fr; /* Adjust the column sizes as needed */
  gap: 20px;
}
.demoSection{
margin: 20px;
}
</style>