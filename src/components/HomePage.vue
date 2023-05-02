<template>
  <div class="QuestionGrpTopics">
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
</template>

<script>
import QuestionTopics from './QuestionTopics.json'

export default {
  name:"HomePage",
  data(){
    console.log(QuestionTopics);
   return {
    questionTopic:{}
   }
  },
   methods:{
         getImage(imgUrl) {
            return require('../../src/assets/'+imgUrl);
         }
    },
     created(){
      this.questionTopic=QuestionTopics.topics;
    }
}
</script>

<style scoped>
.QuestionGrpTopics{
float: left;
}
.headingCottage{
    max-width: 300px;
    margin: 15px;
    padding: 10px;
    border: 1px solid gray;
    border-radius: 1em;
}
.h2{
  font-size: 166%;
}

</style>