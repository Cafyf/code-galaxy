<style lang="css" scoped src="./sessionActives.css"></style>
<script src="./sessionActives.js"></script>
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




