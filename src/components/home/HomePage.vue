<style lang="css" scoped src="./home.css"></style>

<template>
<div>

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
  <SessionCard  />
  </div>
  <FooterPage/>
</div>
</template>

<script>
import QuestionTopics from '../mocks/QuestionTopics.json'
import SessionCard from '../user-session/session-card/SessionCard.vue'
import Demo from '../demo/Demo.vue'
import FooterPage from '../footer/FooterPage.vue'
import HeaderSection from '../header/HeaderSection.vue'
import getImage from '../../Utils/asset-utils'
export default {
  name:"HomePage",
  components:{SessionCard,Demo,FooterPage,HeaderSection},
  data(){
   return {
    getImage,
    questionTopic:{}
   }
  },
   methods:{
        
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
     this.initUserDatas();
     
      this.questionTopic=QuestionTopics.topics;
    }
}
</script>

