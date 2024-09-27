<style lang="css" scoped src="./sessionCard.css"></style>
<script src="./sessionCard.js" ></script>
<template>

    <div class="card">
    <div class="row">
      <div class="column">
        <div>Session</div>
      </div>
      <div class="column pl-none">
        <select v-model="selectedSession" @change="selected">
          <option v-for="sessionDetail in sessions" :key="sessionDetail.manageId" :value="sessionDetail.manageId">
            {{sessionDetail.sessionName}}</option>
        </select>
      </div>
    </div>
    <div class="row mb-0">
      <div class="column-2 pr-none">
        <div class="circle">
          <div class="circle-text"><small>All</small></div>
          <div class="circle-text"><b class="total-by-user">{{this.totalNoOfQuestion}}</b></div>
          <div class="circle-text circle-total">332</div>
        </div>
      </div>
      <div class="column-2 pl-none">
        <div>
          <div class="mode "> <span class="mode-Easy">Easy</span> <span >{{this.sessionPicked.modes.easy}} <span class="total-sub">/120</span></span></div>
         
          <div class="mode "><span class="mode-Medium">Medium</span> <span>{{this.sessionPicked.modes.medium}} <span class="total-sub">/112</span></span></div>
         
          <div class="mode "><span class="mode-Hard">Hard</span> <span>{{this.sessionPicked.modes.hard}} <span class="total-sub">/10</span></span> </div>
        </div>
      </div>
    </div>
  </div>
</template>


