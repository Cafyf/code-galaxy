import { Component, Vue } from 'vue-facing-decorator'
import getImage from '@/Utils/asset-utils';
import LocalStorageUtils from '@/Utils/local-storage-utils';
import HttpClient from '@/service/httpClient.js'
import store from '../../../store/store'
import { navigateTo } from '@/router/navigation';

@Component
export default class ProgressQuestion extends Vue {
  isLoading = false;
  show = true;
  searchInput = '';
  searchResult = {};
  progressData = [];
  getImage = getImage;

  backToHomePage() {
    navigateTo("HomePage")
  };
  async search() {
    this.isLoading = true;

    this.searchResult = this.progressData.find(
      progress => progress.question === this.searchInput
    );

    await setTimeout(() => {
      if (this.searchResult === undefined) {
        alert("No datas are found");
        this.isLoading = false;
        return;
      }
      // Once data is loaded, set isLoading to false to remove the blur effect
      this.show = !this.show;
      this.isLoading = false;
    }, 2000);

  };

  async getSubmission(questionName, submissionQuestionId) {
    const res = await HttpClient.executeApiCall('get',"http://localhost:8090/getSubmission",{ params:{'submissionQuestionId':submissionQuestionId} });
    // res.data.topic  replace here (from vue template)
    LocalStorageUtils.setItem('topic',{ topic: res.data.topic });
    const questionFile = require(`../../mocks/${res.data.topic}.json`);
    store.commit('saveQuestions', questionFile);
    store.state.submittedQuestions = res.data.submittedQuestion;
    navigateTo("CodeEditorContainer", { name: questionName, option: "previous" });
    console.log(res.data);
  };

  async created() {
    const userInfo = LocalStorageUtils.getItem('user-info');
    const session = LocalStorageUtils.getItem('active-session');
    
    this.progressData = (await HttpClient.executeApiCall('get',"http://localhost:8090/progressDetails",{ params:{'sessionId':session.id,'progressId':userInfo.id}})).data;
    if (this.progressData.length === 0) {
      alert(`Hi, you have not yet progressed`)
    }
  };
}