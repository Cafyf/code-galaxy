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