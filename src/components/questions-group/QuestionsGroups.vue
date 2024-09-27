<style lang="css" scoped src="./questionGroup.css"></style>
<script src="./questionsGroup.js"></script>
<template>
<div>
<div class="desc">
    <span class="h2">{{topic.header}}</span> &ensp;
    <img width="20" v-for="i in topic.stars" :key="i" :src="getImage(topic.starImg)" alt=""> 
    <p>{{description}}</p>
</div>

  <table>
    <tbody >
        <tr v-for="(question,index) in questions" :key="index" >
            <td v-for="details in question" :key="details.name" width="200px">
                <img width="20" :src="getImage(details.imgUrl)" alt="">
                 <router-link :to="{name: 'CodeEditorContainer', query:{ name: details.name } }">{{details.name}}</router-link> &nbsp;
                 <span style="color:grey; font-family: Arial; font-size: 16px;">{{details.font}}</span>
            </td>
        </tr>
    </tbody>
  </table>
</div>
</template>            