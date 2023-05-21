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
                <button @click="backToHomePage" class="btn ">
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

<style scoped>
.btn{
  border:1px solid ;
  background: white;
  color: #000;
margin-left: 20px;
margin-bottom: 20px;
}

 body {
     background-color: #f9f9fa
 }

 .flex {
     -webkit-box-flex: 1;
     -ms-flex: 1 1 auto;
     flex: 1 1 auto
 }

 @media (max-width:991.98px) {
     .padding {
         padding: 1.5rem
     }
 }

 @media (max-width:767.98px) {
     .padding {
         padding: 1rem
     }
 }

 .padding {
     padding: 5rem
 }

 .card {
     box-shadow: none;
     -webkit-box-shadow: none;
     -moz-box-shadow: none;
     -ms-box-shadow: none
 }

 .pl-3,
 .px-3 {
     padding-left: 1rem !important
 }

 .card {
     position: relative;
     display: flex;
     flex-direction: column;
     min-width: 0;
     word-wrap: break-word;
     background-color: #fff;
     background-clip: border-box;
     border: 1px solid #d2d2dc;
     border-radius: 0
 }

 .card .card-title {
     color: #000000;
     margin-bottom: 0.625rem;
     text-transform: capitalize;
     font-size: 0.875rem;
     font-weight: 500
 }

 .card .card-description {
     margin-bottom: .875rem;
     color: #48525a;
     font-family: Geneva;
    font-weight: 800;
 }

 p {
     font-size: 0.875rem;
     margin-bottom: .5rem;
     line-height: 1.5rem
 }

 .table-responsive {
     display: block;
     width: 100%;
     overflow-x: auto;
     -webkit-overflow-scrolling: touch;
     -ms-overflow-style: -ms-autohiding-scrollbar
 }

 .table,
 .jsgrid .jsgrid-table {
     width: 100%;
     max-width: 100%;
     margin-bottom: 1rem;
     background-color: transparent
 }

 .table thead th,
 .jsgrid .jsgrid-table thead th {
     border-top: 0;
     border-bottom-width: 1px;
     font-weight: 500;
     font-size: .875rem;
     text-transform: uppercase
 }

 .table td,
 .jsgrid .jsgrid-table td {
    
     padding: .875rem 0.9375rem
 }

 .badge {
     border-radius: 0;
     font-size: 12px;
     line-height: 1;
     padding: .375rem .5625rem;
     font-weight: normal
 }
 
 .progress {
    border-radius: 3px;
    height: 8px;
    margin-top:7px;
}

.difficulty-medium {

    color: rgb(255 184 0) !important;
}
.difficulty-easy {

    color: rgb(0 175 155) !important;
}
.difficulty-hard {

    color: rgb(237 14 14) !important;
}
table td{
    opacity: 1;
    background-color: rgb(255 255 255);
}

.table-striped > tbody > tr:nth-of-type(odd) > * {
    opacity: 1;
    --bs-table-accent-bg: rgb(247 248 250);
    color: var(--bs-table-striped-color);
}
.table thead {
  border-bottom: 1px solid #000;
  padding-bottom: 2px !important;
}
.btns{
        height: 32px;
    padding-top: 2px;
    border-radius: 17px;
    background-color: rgb(22, 22 ,100) !important;
}
input:focus{
     outline: none; /* Remove the default outline */
    outline-offset: -2px; /* Adjust the outline offset */
    box-shadow: 0px -2px 0px red, 0px 2px 0px blue; 
    transition: box-shadow 0.3s ease-in-out;
}

.inputs{
    border:1px solid #154b7e;
    border-radius: 8px;
}

.blur {
  filter: blur(5px); /* Apply the blur effect */
  pointer-events: none; /* Disable pointer events on the blurred table */
  opacity: 5;
  transition: opacity 0.5s ease-in-out;
}

.loading-overlay {
  position: absolute; /* Position the overlay relative to the table container */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.7);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 4px solid #ccc;
  border-top-color: #333;
  animation: spin 1s linear infinite;
}

table td{
cursor:pointer;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>