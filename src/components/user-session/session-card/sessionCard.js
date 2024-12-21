import { Component, Vue } from 'vue-facing-decorator'
import HttpClient from '@/service/httpClient.js'
import state from '../../../store/store'

@Component
export default class SessionCard extends Vue {
  sessionPicked = {
    modes: {
      easy: 0,
      medium: 0,
      hard: 0
    }
  };
  selectedSession = 0;
  totalNoOfQuestion = 0;
  sessions = [0];


  selected() {
    if (this.selectedSession) {
      this.sessionPicked = this.sessions.find(
        session => session.manageId === this.selectedSession
      );
    }
    this.totalNoOfQuestion = 0;
    for (const mode in this.sessionPicked.modes) {
      this.totalNoOfQuestion += this.sessionPicked.modes[mode];
    }
    state.currentSession = this.sessionPicked;
    localStorage.setItem('active-session', JSON.stringify({ id: this.selectedSession, sessionName: this.sessionPicked.sessionName }))
  };

  async created() {
    console.log('logger from session card: checking how fast the deployment is reflecting in environment');
    try {
      const userInfo = JSON.parse(localStorage.getItem('user-info'));
      const sessionActiveId = localStorage.getItem('active-session');
      const data = await HttpClient.executeApiCall('get',"http://localhost:8090/sessionDetails",{ params:{'sessionId':userInfo.id}});
      this.sessions = data.data;
      console.log(sessionActiveId);
      if (sessionActiveId === null) {
        this.selectedSession = this.sessions[0].manageId;
        localStorage.setItem('active-session', JSON.stringify({ id: this.selectedSession, sessionName: this.sessions[0].sessionName }))
      } else
        this.selectedSession = JSON.parse(sessionActiveId).id;
      this.selected();

    } catch (err) {
    }
  };
}