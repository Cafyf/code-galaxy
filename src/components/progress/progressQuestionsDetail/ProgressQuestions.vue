<style lang="css" scoped src="./progress.css"></style>
<script src="./progress.js" type="text" lang="js"></script>

<template>
                            <!-- <div class="progress">
                              <div class="progress-bar bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div> -->
<div class="page-content page-container" id="page-content">
    <div class="padding">
        <div class="row container d-flex justify-content-center">
<div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                    <div class="d-flex justify-content-between  align-items-center">
                   <div><img width="20" :src="getImage('report.jpg')" alt=""></div> 
                  <div>
                    <input v-model="searchInput" class="inputs" type="text"> <button @click="search()" type="button" :class="!show?'btn-danger':''" class="btns btn text-white ">{{show?'search':'close '}}</button>
                  </div>
                 </div>
                  <div class="card-description">
                    Progress Details
                  </div>
                  <div class="table-responsive">
                    <table class="table table-striped">
                      <thead>
                    <tr><th>Last Solved</th><th> Questions</th><th>Topic</th><th> Difficulty</th><th>  Status</th></tr>
                      </thead>
                       <tbody :class="{ 'blur': isLoading }" :style="{ opacity: isLoading ? 0.5 : 1 }" v-if="!show">
                        <tr >
                          <td >{{searchResult.lastSolvedDate}}</td>
                          <td @click="getSubmission(searchResult.question,searchResult.submissionQuestionId)"> {{searchResult.question}}</td>
                          <td> {{searchResult.topic}}</td>
                           <td :class="'difficulty'+`-${searchResult.mode}`">{{searchResult.mode}}</td>
                            <td>{{searchResult.status}}</td>
                    </tr>
                      </tbody>
 <!-- <div v-if="isLoading" class="loading-overlay"><div class="loading-spinner"></div></div> -->
                      <tbody :class="{ 'blur': isLoading }" :style="{ opacity: isLoading ? 0.5 : 1 }" v-if="show">
                        <tr v-for="(progressDetails,index) in progressData" :key="index">
                          <td >{{progressDetails.lastSolvedDate}}</td>
                          <td @click="getSubmission(progressDetails.question,progressDetails.submissionQuestionId)"> {{progressDetails.question}}</td>
                          <td> {{progressDetails.topic}}</td>
                           <td :class="'difficulty'+`-${progressDetails.mode}`">{{progressDetails.mode}}</td>
                            <td>{{progressDetails.status}}</td>
                    </tr>
                       
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            </div>
              </div>
                <button @click="backToHomePage" class="btn btn1">
             back to home Page
            </button>
            </div>
</template>