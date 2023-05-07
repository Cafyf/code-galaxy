<template>
<div>
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
</template>

<script>
// import generateFileForQuestions from '@/generateFile';
//import rimraf from 'rimraf'
import axios from "axios";
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
            description:"",
            questions:[]
        }
    },
    methods:{
         getImage(imgUrl) {
            return require('../../src/assets/'+imgUrl);
         }
    },
    async created(){

        await axios.get(`http://localhost:5000/`,{
            params:{
            jsonData:JSON.stringify(require('./QuestionsMock.json')),
            fileName:this.topic.header
        }
    }
        ).then((response) => {
            console.log(response);
            this.description=response.data.questions.Description.text;
            this.questions=response.data.questions.Methodtitles;
        })
        .catch((err)=>{console.log(err);})
    }
}
</script>

<style scoped>
body{
     width: 100%;
}
.h2{
  font-size: 126%;
}
</style>