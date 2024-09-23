<style lang="css" scoped src="./sessionActives.css"></style>
<template>
<div class="container ">
<div class="card card-panel">
  <h4 class="card-header h4">Session Management</h4>
  <div class="card-body">
    <h5 class="card-title">Instructions</h5>
    <p class="card-text">To make a fresh start, create a new session and click on the new session to activate it.</p>
    <button @click="createSession" class="btn btns2 btn-primary">create</button> 
     <input  class="input-field ip-head" placeholder=" Create Session.." v-model="createNewSession" type="text">
  </div>
</div>

<div class=" parent-card">
    <div v-for="(session, index) in sessionDetails" :key="index" :class="{'card card-main':true,'card-active':isActive(session.manageId)}" style="width: 20rem;">
      <div @click="activeEnabel(session.manageId,session.sessionName)" class="card-body">
        <h5 class="font-weight-bold mb-3" 
        :class="'title' + (isActive(session.manageId) ? 'active' : '')">{{ session.sessionName +` (${(isActive(session.manageId) ? 'Active' :'Deactive')})`}}</h5>

        <p :class="'mb-0 title-desc-' + (isActive(session.manageId) ? 'active' : '')">{{ session.desc }}</p>
      </div>
      <ul class="list-group list-group-flush list">
        <li  class="list-group-item">
          <span>Number of accepted questions</span><span>{{getCallResponse[`progressManageId${session.manageId}`].acceptedCount}}</span>
        </li>
         <li  class="list-group-item">
          <span>Number of submitted questions</span><span>{{getCallResponse[`progressManageId${session.manageId}`].totalCount}}</span>
        </li>
         <li  class="list-group-item">
          <span>Number of accepted submissions</span><span>{{getCallResponse[`submissionManageId${session.manageId}`].acceptedSubmission}}</span>
        </li>
         <li  class="list-group-item">
          <span>Number of submissions</span><span>{{getCallResponse[`submissionManageId${session.manageId}`].totalSubmission}}</span>
        </li>
      </ul>
      <div class="card-body card-footer" :class="{ 'card-footer-on': isEdit(index) }">
        <button @click="editSession(index,isEdit(index) ? 'save' : 'edit',session.sessionName,session.manageId)" :class="isEdit(index) ? 'button-on' : ''" class="btn btns btn-primary">
          {{ isEdit(index) ? 'save' : 'edit' }}
        </button>
        <input v-if="isEdit(index)" class="input-field" placeholder=" rename.." v-model="sessionRename" type="text">
        <button v-if="isEdit(index)" @click="editSession(index)" class="btn">Close</button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import state from '../../../store'
import axios from 'axios'
export default {
    name:'SessionActives',
data(){
    // we need a column for last active to update it again login just show that session only
  return {
    getCallResponse:{
   
},
    createNewSession:'',
    activeSessionIndex:0,
    edit:false,
    sessionRename:'',
    sessionDetails:[],
    editSessions:[]
  }
},
methods:{
    async createSession(){
      const userInfo=JSON.parse(localStorage.getItem('user-info'));
        if(this.createNewSession.trim()!==''){
          const requestParam={
            sessionName:this.createNewSession,
            loginId:userInfo.id
          }
     const response= await axios.post(`http://localhost:8090/createSession`,null,{params:requestParam});
     console.log(response);
        if(response.status===200){
          console.log(response.data);
          localStorage.setItem('active-session',JSON.stringify({id:response.data,sessionName:this.createNewSession}))
          window.location.reload();
        }
    }
      console.log(this.createNewSession);
    },
   activeEnabel(manageId,name) {
      localStorage.setItem('active-session',JSON.stringify({id:manageId,sessionName:name}));
      this.activeSessionIndex = manageId;
       this.sessionDetails.forEach(session =>{
             if(session.manageId===manageId){
              state.currentSession=session;
             }
       })
    },
    isActive(manageId) {
      this.activeSessionIndex === manageId;
      const activeSession=JSON.parse(localStorage.getItem('active-session'));
      if( activeSession.id===manageId){
        return true;
      } else
      return false;
    },
   
   async editSession(index,mode,sessionName,manageId) {
    console.log(sessionName);
     if(!this.isActive(manageId)){alert("Please Click And Active Your Session"); return;}
        if(mode==='save' && this.sessionRename.trim()!==''){
          const userInfo=JSON.parse(localStorage.getItem('user-info'));
          const session=JSON.parse(localStorage.getItem('active-session'));
          console.log(session);
          const SessionRenameParams={
            newSessionName:this.sessionRename,
            currentSessionName:sessionName+'',
            loginId:userInfo.id,
            manageId:session.id
          }
    const dataResponse= await axios.post(`http://localhost:8090/renameSession`,null,{params:SessionRenameParams});
            if(dataResponse.status===200){
                 window.location.reload();
            }
            sessionName='';
        }
      if (this.editSessions.includes(index)) {
        this.editSessions = this.editSessions.filter((item) => item !== index);
      } else {
        this.editSessions.push(index);
      }
      console.log(this.editSessions);
    },
    isEdit(index) {
      return this.editSessions.includes(index);
    },
  async initSetUp(){
  
   const userInfo=JSON.parse(localStorage.getItem('user-info'));
   if(state.sessionManagerDetails===undefined){
   state.sessionManagerDetails  =  (await axios.get("http://localhost:8090/sessionActive",{ params:{loginId:userInfo.id}})).data
  }

  this.getCallResponse=state.sessionManagerDetails;
   this.sessionDetails=state.sessionManagerDetails.sessionDetails;
   console.log('okok');
   console.log(localStorage.getItem('active-session'));
  if(localStorage.getItem('active-session')=== null){
    console.log('okok');
  state.currentSession=this.sessionDetails[0];
  localStorage.setItem('active-session',JSON.stringify({id: this.sessionDetails[0].manageId,sessionName:this.sessionDetails[0].sessionName}))
  }
 }

},
   created () {
  this.initSetUp();
}
}
</script>


