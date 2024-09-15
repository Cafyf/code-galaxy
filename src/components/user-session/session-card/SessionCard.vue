<template>

    <div class="card">
    <div class="row">
      <div class="column">
        <div>Session</div>
      </div>
      <div class="column pl-none">
        <select v-model="selectedSession" @change="selected">
          <option v-for="sessionDetail in sessions" :key="sessionDetail.manageId" :value="sessionDetail.manageId">
            {{sessionDetail.sessionName}}</option>
        </select>
      </div>
    </div>
    <div class="row mb-0">
      <div class="column-2 pr-none">
        <div class="circle">
          <div class="circle-text"><small>All</small></div>
          <div class="circle-text"><b class="total-by-user">{{this.totalNoOfQuestion}}</b></div>
          <div class="circle-text circle-total">332</div>
        </div>
      </div>
      <div class="column-2 pl-none">
        <div>
          <div class="mode "> <span class="mode-Easy">Easy</span> <span >{{this.sessionPicked.modes.easy}} <span class="total-sub">/120</span></span></div>
         
          <div class="mode "><span class="mode-Medium">Medium</span> <span>{{this.sessionPicked.modes.medium}} <span class="total-sub">/112</span></span></div>
         
          <div class="mode "><span class="mode-Hard">Hard</span> <span>{{this.sessionPicked.modes.hard}} <span class="total-sub">/10</span></span> </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import state from '../../../store'
export default {
    name:"SessionCard",
   
data(){
return {
  selectedSession:0,
  sessionPicked:{
    modes:{
      easy:0,
      medium:0,
      hard:0
    }
  },
  totalNoOfQuestion:0,
  sessions:[0]
}
},

methods:{
  selected(){
      if (this.selectedSession) {
        this.sessionPicked= this.sessions.find(
          session => session.manageId === this.selectedSession
        );
      }
   this.totalNoOfQuestion=0;
   for (const mode in this.sessionPicked.modes) {
    this.totalNoOfQuestion += this.sessionPicked.modes[mode];
   } 
  state.currentSession=this.sessionPicked;
  localStorage.setItem('active-session',JSON.stringify({id:this.selectedSession,sessionName:this.sessionPicked.sessionName}))
},

},
async created(){
   const userInfo=JSON.parse(localStorage.getItem('user-info'));
   const sessionActiveId=localStorage.getItem('active-session');
   const data = await axios.get("http://localhost:8090/sessionDetails",{ params:{sessionId:userInfo.id}});
   this.sessions=data.data;
  console.log(sessionActiveId);
  if(sessionActiveId===null){
   this.selectedSession = this.sessions[0].manageId;
 localStorage.setItem('active-session',JSON.stringify({id:this.selectedSession,sessionName:this.sessions[0].sessionName}))
  } else
   this.selectedSession=JSON.parse(sessionActiveId).id;
   this.selected();
}

}
</script>

<style scoped>

.circle-total{
    border-top:1px solid #c4c1c1;
    width: 31px;
    color: #c4c1c1 !important;
}
.total-sub{
    color: #ccc;
    font-size: 14px;
}
.pl-none{
    padding-left: 0px !important;
}
.pr-none{
    padding-right: 0px;
}
 .card {
      width: 303px;
      height: 167px;
      padding: 10px;
      border: 1px solid #fcfafa; /* #e4d9d9 */
      border-radius: 10px;
      box-shadow: 0 2px 4px 4px rgba(0, 0, 0, 0.1); /**inset 0px 0px 4px 3px rgba(0, 0, 0, 0.1) */
      background-color: #fff;
       flex-wrap: wrap;
       padding-bottom: 0px;
       margin-top: 20px !important;
    }
select{
    width: 100%;
    outline: none;
    border: 1px solid #cbc3c3;
    background-color: #f5f2f257;
    border-radius: 5px;
}
    .row {
      display: flex;
      /* justify-content: space-between; */
      margin-bottom: 10px;
    }

    .column {
    flex-basis: calc(50% - 10px); 
      margin-bottom: 10px; 
    }
    .column-2{
    flex-basis: calc(50% - 10px); 
      margin-bottom: 0px; 
    }

    .circle {
      width: 97px;
      height: 96px;
      border-radius: 50%;
      border: 3px solid #e0cfcf;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      margin-left: 8px;
     
    }
    

    .circle-text {
      font-size: 12px;
      color: #555;
      text-align: center;
    }

    .mode-Easy{
color: rgb(0 175 155) !important;
    }
     .mode-Medium{
 color: rgb(255 184 0) !important;
    }
     .mode-Hard{
  color: rgb(237 14 14) !important;
    }
    .mode {
     padding-top: 5px;
     display: flex;
     justify-content: space-between;
    }
    .total-by-user{
        font-size: 21px;
    }
</style>