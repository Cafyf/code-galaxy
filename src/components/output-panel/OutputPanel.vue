<style lang="css" scoped src="./outputPanel.css"></style>
<script  src="./outputPanel.js"></script>

<template>
  <div v-if="show === true">
    <span v-for="(output, index) in normalOutput" :key="index">
      {{ output }} <br />
    </span>
  </div>
  <component :is="displayComponent" v-bind="displayComponentProps" />
</template>