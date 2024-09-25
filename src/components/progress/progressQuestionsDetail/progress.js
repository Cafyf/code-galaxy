import axios from 'axios'
import state from '../../../store/index'
export default {
 name:"ProgressQuestion",

    data() {
     return {
        isLoading:false,
         show:true,
         searchInput:'',
         searchResult:{},
         progressData:[]
     }
  },
  methods:{
      getImage(imgUrl) {
            return require('../../../../src/assets/'+imgUrl);
         },
          backToHomePage(){
    this.$router.push({name:'HomePage'})
    },
        async search(){
            this.isLoading=true;
    
      this.searchResult= this.progressData.find(
          progress => progress.question === this.searchInput
        );
 
        await setTimeout(() => {
             if(this.searchResult===undefined){
                alert("No datas are found");
                this.isLoading = false;
                 return;
        }
      // Once data is loaded, set isLoading to false to remove the blur effect
       this.show=!this.show;
      this.isLoading = false;
    }, 2000); 

       },

   async getSubmission(questionName,submissionQuestionId) {
      const res=  await axios.get(`http://localhost:8090/getSubmission?submissionQuestionId=${submissionQuestionId}`);
          // res.data.topic  replace here (from vue template)
      localStorage.setItem('topic',JSON.stringify({topic:res.data.topic}))
      const questionFile=require(`../../mocks/${res.data.topic}.json`);
      state.questions=questionFile;
      state.submittedQuestions=res.data.submittedQuestion;
      this.$router.push({ name: 'CodeEditorContainer', query: { name: questionName , option:'previous'} });
      console.log(res.data);
    }
  },
 async created(){
  const userInfo =JSON.parse(localStorage.getItem('user-info'));
  const session = JSON.parse(localStorage.getItem('active-session'));
  this.progressData  =  (await axios.get(`http://localhost:8090/progressDetails?sessionId=${session.id}&progressId=${userInfo.id}`)).data;
  if(this.progressData.length===0){
   alert(`Hi, you have not yet progressed`)
  }
  }
}