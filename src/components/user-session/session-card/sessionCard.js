
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

