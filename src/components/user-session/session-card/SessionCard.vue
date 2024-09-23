<style lang="css" scoped src="./sessionCard.css"></style>
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

