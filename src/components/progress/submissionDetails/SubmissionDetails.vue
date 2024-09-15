<style lang="css" scoped src="./submission.css"> </style>

<template>
  <!-- <div class="progress">
                              <div class="progress-bar bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div> <progress value="75" min="0" max="100">75%</progress>
 -->

  <div class="page-content page-container" id="page-content">
    <div class="padding">
      <h3>All My Submissions</h3>
      <div class="row container d-flex justify-content-center">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Time Submitted</th>
                      <th>Questions</th>
                      <th>Status</th>
                      <th>Runtime</th>
                      <th>Language</th>
                    </tr>
                  </thead>
                  <!-- <div v-if="isLoading" class="loading-overlay"><div class="loading-spinner"></div></div> -->
                  <tbody
                    :class="{ blur: isLoading }"
                    :style="{ opacity: isLoading ? 0.5 : 1 }"
                  >
                    <tr
                      v-for="(submission, index) in submissionsData"
                      :key="index"
                    >
                      <td>{{ dateFormate(submission.timeSubmitted) }}</td>
                      <td @click="showInEditor(submission.question,submission.submittedQuestion,submission.topic)">{{ submission.question }}</td>
                      <td
                        :class="
                          'status' + `-${submission.status.replaceAll(' ', '')}`
                        "
                      >
                        {{ submission.status }}
                      </td>
                      <td>{{ submission.runtime }}</td>
                      <td>{{ submission.language }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <button @click="backToHomePage" class="btn btn-primary">
             back to home Page
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
</script>