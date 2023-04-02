<template>
    <div v-if="show==false" class="errorMsg">
       <h3 :style="{ color: textColor }">{{ errorheader }}</h3>
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
            errorheader:'',
            textColor:''
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
customErrors(CheckCustomErrorMsg){
  
     for(let i=0;i<CheckCustomErrorMsg.length-1;i++){
        if(CheckCustomErrorMsg[i].includes("DONT_CHANGE_THE_DEFAULT_METHOD_DECLARATION")){
          this.errorheader="Ambiguity";
          return ["IF_ADD_MULTIPLE_METHODS","DONT_CHANGE_THE_DEFAULT_METHOD_DECLARATION"];
        }
        else if(CheckCustomErrorMsg[i].includes("PRINT_STATEMENTS_ARE_NOT_ALLOWED")){
             this.textColor='red';
             this.errorheader="PRINT_STATEMENTS_ARE_NOT_ALLOWED";
             return ["IF YOU WANT TO USE ENABLE TRACE MODE"];
        }
       else{
          console.log(CheckCustomErrorMsg[i]);
         // this.filterOutPut(CheckCustomErrorMsg);
      }
     }
},

     formatOutPutMessage(outputMessage) {
      this.show=outputMessage.show;
      if(outputMessage.msg!='' && outputMessage.msg[1].trim()==="class, interface, enum, or record expected")
      {  
       return this.customErrors(outputMessage.msg);
      }  

        if(outputMessage.msg === "Empty code body!"){this.errorheader=outputMessage.msg; return;}
        if( this.show==false && outputMessage.msg!=null ){
            if(outputMessage.msg.length-1===1){
             this.errorheader=outputMessage.msg[outputMessage.msg.length-1];
             return ;
            }
            this.errorheader=outputMessage.msg[outputMessage.msg.length-1];
            let mergeErrors=[];
            outputMessage.msg.map((errorContainer,index)=>{
                if(index!=0 && index != outputMessage.msg.length-1)
               errorContainer.split('\r\n').map(errorMsg=> {
                  mergeErrors.push(errorMsg);
                });  
            })
         return this.filterOutPut(mergeErrors);
        }
    try{ 
      return outputMessage.msg.split('\r\n');}
    catch(err){
     return outputMessage.msg;
    }
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