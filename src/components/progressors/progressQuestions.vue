<style lang="css" scoped src="./progress.css"></style>

<template>
                            <!-- <div class="progress">
                              <div class="progress-bar bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div> -->
<div class="page-content page-container" id="page-content">
    <div class="padding">
        <div class="row container d-flex justify-content-center">
<div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                    <div class="d-flex justify-content-between  align-items-center">
                   <div><img width="20" :src="getImage('report.jpg')" alt=""></div> 
                  <div>
                    <input v-model="searchInput" class="inputs" type="text"> <button @click="search()" type="button" :class="!show?'btn-danger':''" class="btns btn text-white ">{{show?'search':'close '}}</button>
                  </div>
                 </div>
                  <div class="card-description">
                    Progress Details
                  </div>
                  <div class="table-responsive">
                    <table class="table table-striped">
                      <thead>
                    <tr><th>Last Solved</th><th> Questions</th><th>Topic</th><th> Difficulty</th><th>  Status</th></tr>
                      </thead>
                       <tbody :class="{ 'blur': isLoading }" :style="{ opacity: isLoading ? 0.5 : 1 }" v-if="!show">
                        <tr >
                          <td >{{searchResult.lastSolvedDate}}</td>
                          <td @click="getSubmission(searchResult.question,searchResult.submissionQuestionId)"> {{searchResult.question}}</td>
                          <td> {{searchResult.topic}}</td>
                           <td :class="'difficulty'+`-${searchResult.mode}`">{{searchResult.mode}}</td>
                            <td>{{searchResult.status}}</td>
                    </tr>
                      </tbody>
 <!-- <div v-if="isLoading" class="loading-overlay"><div class="loading-spinner"></div></div> -->
                      <tbody :class="{ 'blur': isLoading }" :style="{ opacity: isLoading ? 0.5 : 1 }" v-if="show">
                        <tr v-for="(progressDetails,index) in progressData" :key="index">
                          <td >{{progressDetails.lastSolvedDate}}</td>
                          <td @click="getSubmission(progressDetails.question,progressDetails.submissionQuestionId)"> {{progressDetails.question}}</td>
                          <td> {{progressDetails.topic}}</td>
                           <td :class="'difficulty'+`-${progressDetails.mode}`">{{progressDetails.mode}}</td>
                            <td>{{progressDetails.status}}</td>
                    </tr>
                       
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            </div>
              </div>
                <button @click="backToHomePage" class="btn btn1">
             back to home Page
            </button>
            </div>
</template>

<script>
import axios from 'axios'
import state from '../../store/index'
export default {
 name:"progressQuestion",

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
            return require('../../../src/assets/'+imgUrl);
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
      const questionFile=require(`../mocks/${res.data.topic}.json`);
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
</script>