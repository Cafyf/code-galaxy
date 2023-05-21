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
import state from '../../store/index'

export default {
  name: "submissionDetails",
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
       const questionFile=require(`../mocks/${topic}.json`);
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

<style scoped>
body {
  background-color: #f9f9fa;
}
table td{
  cursor: pointer;
}
.flex {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
}

@media (max-width: 991.98px) {
  .padding {
    padding: 1.5rem;
  }
}

@media (max-width: 767.98px) {
  .padding {
    padding: 1rem;
  }
}

.padding {
  padding: 5rem;
}

h3 {
  margin-bottom: 21px;
}

.row > * {
  padding-right: 0px;
  padding-left: 0px;
}

.card {
  box-shadow: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  -ms-box-shadow: none;
}

.pl-3,
.px-3 {
  padding-left: 1rem !important;
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
  border-radius: 0;
}

.card-body {
  padding: 0px;
}

.card .card-title {
  color: #000000;
  margin-bottom: 0.625rem;
  text-transform: capitalize;
  font-size: 0.875rem;
  font-weight: 500;
}

.card .card-description {
  margin-bottom: 0.875rem;
  color: #48525a;
  font-family: Geneva;
  font-weight: 800;
}

p {
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  line-height: 1.5rem;
}

.table-responsive {
  display: block;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}

.table,
.jsgrid .jsgrid-table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
}

.table thead th,
.jsgrid .jsgrid-table thead th {
  border-top: 0;
  border-bottom-width: 1px;
  font-weight: 500;
  font-size: 0.875rem;
  text-transform: uppercase;
}

.table td,
.jsgrid .jsgrid-table td {
  padding: 8px 0.9375rem;
}

.badge {
  border-radius: 0;
  font-size: 12px;
  line-height: 1;
  padding: 0.375rem 0.5625rem;
  font-weight: normal;
}

.progress {
  border-radius: 3px;
  height: 8px;
  margin-top: 7px;
}

.difficulty-medium {
  color: rgb(255 184 0) !important;
}
.status-Accepted {
  color: rgb(0 175 155) !important;
}
.status-CompileError {
  color: rgb(237 14 14) !important;
}
table td {
  opacity: 1;
  background-color: rgb(255 255 255);
}

.table-striped > tbody > tr:nth-of-type(odd) > * {
  opacity: 1;
  --bs-table-accent-bg: rgb(247 248 250);
  color: var(--bs-table-striped-color);
}

.table thead {
  border-bottom: 2px solid #d4cccc; /*#d5b0b0 */
  padding-bottom: 2px !important;
}
.btns {
  height: 32px;
  padding-top: 2px;
  border-radius: 17px;
  background-color: rgb(22, 22, 100) !important;
}
input:focus {
  outline: none; /* Remove the default outline */
  outline-offset: -2px; /* Adjust the outline offset */
  box-shadow: 0px -2px 0px red, 0px 2px 0px blue;
  transition: box-shadow 0.3s ease-in-out;
}

.inputs {
  border: 1px solid #154b7e;
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

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>