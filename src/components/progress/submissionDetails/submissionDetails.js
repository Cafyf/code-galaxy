import moment from "moment";
import axios from "axios";
import state from '../../../store/index'

export default {
  name: "SubmissionDetails",
  data() {
    return {
      isLoading: false,
      submissionsData: [],
    };
  },
  methods: {
    backToHomePage(){
    this.$router.push({name:'HomePage'})
    },
    showInEditor(question,submittedQuestion,topic){
       localStorage.setItem('topic',JSON.stringify({topic:topic}))
       const questionFile=require(`../../mocks/${topic}.json`);
       state.questions=questionFile;
      state.submittedQuestions=submittedQuestion;
      this.$router.push({ name: 'CodeEditorContainer', query: { name: question ,option:'previous' } });
    },
    dateFormate(date) {
      const currentDate = moment();
      const pastDate = moment(date);

      const duration = moment.duration(currentDate.diff(pastDate));
      const days = Math.floor(duration.asDays());
      const hours = duration.hours();
      const minutes = duration.minutes();

      if (duration.asMinutes() < 60) {
        return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
      } else if (days === 0) {
        return `${hours} hour${hours !== 1 ? "s" : ""} ${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
      } else if (days < 30) {
        return `${days} days ${hours} hour${hours !== 1 ? "s" : ""} ago`;
      } else if (days < 365) {
        const remainingDays = days % 30;
        const months = Math.floor(days / 30);
        return `${months} month${months !== 1 ? "s" : ""} ${remainingDays} ${remainingDays !== 1 ? "days" : "day"} ago`;
      } else {
        const years = Math.floor(days / 365);
        const months = Math.floor((days % 365) / 30);
        return `${years} year${years !== 1 ? "s" : ""} ${months} month${months !== 1 ? "s" : ""} ago`;
      }
    },
  },
  async created() {
    // console.log(this.dateFormate("2021-05-15T23:58:56"));
    // console.log(this.dateFormate("2023-03-15T23:58:56"));
    // console.log(this.dateFormate("2023-05-17T23:58:56"));
    // console.log(this.dateFormate("2023-05-15T13:58:56"));
    // console.log(this.dateFormate("2023-05-18T00:18:56"));
    // console.log(this.dateFormate("2023-05-15T23:58:56"));
    const userInfo = JSON.parse(localStorage.getItem("user-info"));
    const session = JSON.parse(localStorage.getItem("active-session"));
    this.submissionsData = (
      await axios.get(
        `http://localhost:8090/submissionDetails?sessionId=${session.id}&submissionId=${userInfo.id}`
      )
    ).data;
  },
};