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
import state from '../store/index'
import getImage from '../Utils/asset-utils';

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
    state.questions=require(`./mocks/${topic.topic}.json`);

     let getData;
    try {
       getData  = state.questions;
       getData.Description;
    } catch(err){  // this part is to make call to server side to get json data okay
 await axios.get(`http://localhost:5000/`,{
            params:{
            jsonData:JSON.stringify(require('./QuestionsMock.json')),
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

<style scoped>
.desc{
    box-shadow: 5px 4px 5px 2px #e5dede;;
    background: #f2f2f2;
    padding: 10px;
    margin: 0px !important;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

div{
     margin-top: 20px !important;
     margin-left: 15px !important;
}
.h2{
  font-size: 126%;
}
tr > td{
        border: none;
    border-radius: 5px;
    box-shadow: 1px 1px 3px 0px #00000042;
}
a{
    padding-right: 10px;
    padding-left: 10px;
}
table{
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    border-spacing: 36px !important;
    margin-left: 10px;
    border-collapse: separate;
}
  td {
     margin-right: 10px;
    padding: 10px; /* Adjust the value to increase or decrease the space */
  }
  tr {
    margin-bottom:10px; /* Adjust: the value  to increase or decrease the space */
  }
</style>                