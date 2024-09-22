<style lang="css" scoped src="./errormsg.css"></style>

<template>
<section>

  
    <div v-if="show===false && supportShow!==true" class="errorMsg">
       <h3 :style="{ color: textColor }">{{ errorheader }}</h3>
     <pre style="margin:0px; padding-top:5px;" v-for="(error,index) in formatOutPutMessage(outputContainer)" :key="index">{{error}} </pre>
  </div>
   <div v-if="show===true && supportShow!==true">
    <span  v-for="(output,index) in formatOutPutMessage(outputContainer)" :key="index">   {{output}} <br> </span>
   </div>

<div class="test" v-if="supportShow===true">
   <table class="output">
      <tbody>
        <tr>
          <th>Expected</th>
          <th>Run</th>
          <th>Status</th>
          <th></th>
        </tr>
        <tr v-for="(output,index) in formatOutPutMessage(outputContainer)" :key="index">
          <th>{{output.desc+" "+output.ans}}</th>
          <th>{{output.output}}</th>
          <th>{{output.error?'X ':"ok"}}</th>
          <th  :class="{error:output.error,pass:!output.error}"></th>
          </tr>
      </tbody>
   </table>
</div>

</section>
</template>


<script>
export default {
    props:{
      change:false,
       outputContainer:{
        type: Object
       }
    },
    data(){
       console.log(this.outputContainer);
        return {
           change:false,
            show:true,
            supportShow:true,
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
    if (typeof element === "string" && !uniqueSet.has(element.trim()) && !element.includes(".java")) {
      // Check if the element is a string and not already in the set
      uniqueSet.add(element.trim()); // Add the element to the set
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

errorValidation(outputMessage){
  let returnMessage ={
    msg:'',
    validError:false
  }
    // if(outputMessage.msg===null ){ return };

      if(outputMessage.msg.length>0 && outputMessage.msg[0].includes('Exception') && outputMessage.msg[0].includes('java.lang.')){
        console.log("okokoko");
        returnMessage.msg=outputMessage.msg[0].split('\r\n');
        returnMessage.validError=true
        return returnMessage;
      }

    if(outputMessage.msg!='' && outputMessage.msg[1].trim()==="class, interface, enum, or record expected")
      {  
        returnMessage.msg=this.customErrors(outputMessage.msg)
        returnMessage.validError=true;
       return returnMessage;
      }
      return returnMessage;
},
     formatOutPutMessage(outputMessage) {
      if(outputMessage.defaultOpDesc!=undefined){
        this.supportShow=true;
         console.log(outputMessage.defaultOpDesc);
         return outputMessage.defaultOpDesc;
      }
      this.supportShow=false;
      this.show=outputMessage.show;
      const returnMessage=this.errorValidation(outputMessage);
       if(returnMessage.validError){ return returnMessage.msg; }

      if(outputMessage.msg === "Empty code body!"){this.errorheader=outputMessage.msg; return;}
     if(outputMessage.msg.includes("Declarations are wrong")) {this.errorheader=outputMessage.msg; return;}
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
},
mounted(){
  this.supportShow=true;
}
}
</script>

