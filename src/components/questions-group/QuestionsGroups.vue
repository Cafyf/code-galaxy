<style lang="css" scoped src="./questionGroup.css"></style>
<template>
<div>
<div class="desc">
    <span class="h2">{{topic.header}}</span> &ensp;
    <img width="20" v-for="i in topic.stars" :key="i" :src="getImage(topic.starImg)" alt=""> 
    <p>{{description}}</p>
</div>

  <table>
    <tbody >
        <tr v-for="(question,index) in questions" :key="index" >
            <td v-for="details in question" :key="details.name" width="200px">
                <img width="20" :src="getImage(details.imgUrl)" alt="">
                 <router-link :to="{name: 'CodeEditorContainer', query:{ name: details.name } }">{{details.name}}</router-link> &nbsp;
                 <font color="grey">{{details.font}}</font>
            </td>
        </tr>
    </tbody>
  </table>
</div>
</template>

<script>

// import generateFileForQuestions from '@/generateFile';
//import rimraf from 'rimraf'
import axios from "axios";
import state from '../../store/index'
import getImage from '../../Utils/asset-utils';

export default {
 name:'QuestionsGroups',
props:{
    topic :{
        type:Object,
        required:true,
        default:{}
    }
},
    data(){
        return { 
            getImage,
            description:"",
            questions:[]
        }
    },
    methods:{
       
    },
    async created(){
    await localStorage.setItem('topic',JSON.stringify({topic:this.topic.header}));
    const topic=JSON.parse(localStorage.getItem('topic'))
    state.questions=require(`../mocks/${topic.topic}.json`);

     let getData;
    try {
       getData  = state.questions;
       getData.Description;
    } catch(err){  // this part is to make call to server side to get json data okay
 await axios.get(`http://localhost:5000/`,{
            params:{
            jsonData:JSON.stringify(require('../QuestionsMock.json')),
            fileName:this.topic.header
        }
    },
        ).then((response) => {
            console.log(response);
            getData=response.data;
        })
        .catch((err)=>{console.log(err);})
    }
            this.description=getData.Description.text;
            this.questions=getData.Methodtitles;
}
       
}
</script>
            