<template>
    <div v-if="show==false" class="errorMsg">
       <h3>{{errorheader}}</h3>
     <span v-for="(error,index) in formatOutPutMessage(outputContainer)" :key="index">{{error}} <br></span>
  </div>
   <div v-if="show===true ">
    <span  v-for="(output,index) in formatOutPutMessage(outputContainer)" :key="index">   {{output}} <br> </span>
   </div>
</template>

<script>
export default {
    props:{
       outputContainer:{
        type: Object
       }
    },
    data(){
        return {
            show:true,
            errorheader:''
        }
    },
    methods:{

    filterOutPut(mergedErrorContainer){
     let uniqueErrors = []; // Initialize an empty array to store unique string elements
     let uniqueSet = new Set(); // Initialize a Set to keep track of unique elements

       mergedErrorContainer.forEach((element) => {
    // Iterate over the merged array
    if (typeof element === "string" && !uniqueSet.has(element) && !element.includes(".java")) {
      // Check if the element is a string and not already in the set
      uniqueSet.add(element); // Add the element to the set
      uniqueErrors.push(element); // Add the element to the unique array
    }
  });

  return uniqueErrors; // Return the unique array
},

     formatOutPutMessage(outputMessage) {
        this.show=outputMessage.show;
        if( this.show==false && outputMessage.msg!=null ){
            this.errorheader=outputMessage.msg[outputMessage.msg.length-1];
            let mergeErrors=[];
            outputMessage.msg.map((errorContainer,index)=>{
                if(index!=0 && index != outputMessage.msg.length-1) 
               errorContainer.split('\r\n').map(errorMsg=>{
                  mergeErrors.push(errorMsg);
                })  
            })
         return this.filterOutPut(mergeErrors);
        }
       
      return outputMessage.msg.split('\r\n');
    }
}
}
</script>

<style scoped>
.errorMsg{
    border: 1px solid rgb(255, 255, 255) !important;
    width: 100%;
}
</style>