<style lang="css" scoped src="./submission.css"> </style>
<script src="./submissionDetails.js"></script>
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

