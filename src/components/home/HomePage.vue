<style lang="css" scoped src="./home.css"></style>
<script src="./homePage.js"></script>

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