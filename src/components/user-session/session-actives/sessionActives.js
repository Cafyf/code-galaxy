
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