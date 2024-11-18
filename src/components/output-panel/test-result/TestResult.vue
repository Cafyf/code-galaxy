<style lang="css" scoped src="./testResult.css"></style>
<script  src="./testResult.js"></script>

<template>
  <section>
    <div class="test">
      <table class="output">
        <tbody>
          <tr>
            <th>Expected</th>
            <th>Run</th>
            <th>Status</th>
            <th></th>
          </tr>
          <tr v-for="(output, index) in testData.defaultOpDesc" :key="index">
            <th>{{ output.desc + " " + output.ans }}</th>
            <th>{{ output.output }}</th>
            <th>{{ output.error ? "X " : "ok" }}</th>
            <th :class="{ error: output.error, pass: !output.error }"></th>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>