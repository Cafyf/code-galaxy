import { Component, Prop, Vue } from "vue-facing-decorator";
import state from "../../../store/store";
import { MESSAGES } from "@/models/constants/custom-messages.js";
import { CONSTANTS } from "@/models/constants/globalConstants";
import ObjectUtils from "@/Utils/object-utils";

@Component
export default class ErrorDisplayProcessor extends Vue {
  @Prop({ default: false }) change;
  @Prop({ type: Object }) outputContainer;

  change = false;
  show = true;
  supportShow = true;
  errorheader = "";
  textColor = "";

  // filterOutPut(mergedErrorContainer) {
  //   let uniqueErrors = []; // Initialize an empty array to store unique string elements
  //   let uniqueSet = new Set(); // Initialize a Set to keep track of unique elements

  //   mergedErrorContainer.forEach((element) => {
  //     // Iterate over the merged array
  //     if (
  //       typeof element === "string" &&
  //       !uniqueSet.has(element.trim()) &&
  //       !element.includes(".java")
  //     ) {
  //       // Check if the element is a string and not already in the set
  //       uniqueSet.add(element.trim()); // Add the element to the set
  //       uniqueErrors.push(element); // Add the element to the unique array
  //     }
  //   });

  //   return uniqueErrors; // Return the unique array
  // };
  
  customErrors(CheckCustomErrorMsg) {
    
    for (let i = 0; i <= CheckCustomErrorMsg.length - 1; i++) {
      if (
        CheckCustomErrorMsg[i].includes(CONSTANTS.NO_CHANGE_DECLARATION)
      ) {
        this.errorheader = MESSAGES.ambiguity.title;
        return MESSAGES.ambiguity.msg;
      } else if (
        CheckCustomErrorMsg[i].includes(CONSTANTS.PRINT_NOT)
      ) {
        this.textColor = "red";
        this.errorheader = MESSAGES.traceError.title;
        console.log(this.errorheader ,MESSAGES.ambiguity.msg);
        return MESSAGES.traceError.msg;
      } else if (CheckCustomErrorMsg[i].includes(CONSTANTS.DECLARATION_MISSING)){
        this.textColor = "orange";
        this.errorheader = MESSAGES.declarationMissing.title;
        return MESSAGES.declarationMissing.msg;
      } else if (CheckCustomErrorMsg[i].includes(CONSTANTS.DATA_TYPE_MODIFIED)){
        this.textColor = "orange";
        this.errorheader = MESSAGES.dataTypeModified.title;
        return MESSAGES.dataTypeModified.msg;
      } 
    }
  };

  errorValidation(outputMessage) {
    let returnMessage = {
      msg: [],
      validError: false,
    };
    const customError = this.customErrors(outputMessage.msg);
    if(!ObjectUtils.isNullOrUndefinedOrEmpty(customError)){
         returnMessage.msg=customError;
         returnMessage.validError = true;
         return returnMessage;
    }
    if (outputMessage.msg.length > 0) {
      console.log("okokoko");
      this.errorheader = state.lastRunnedStatus;
      returnMessage.msg = outputMessage.msg.split("\n");
      returnMessage.validError = true;
      return returnMessage;
    }
    return returnMessage;
  };
  
  formatOutPutMessage(outputMessage) {
    const returnMessage = this.errorValidation(outputMessage);
    if (returnMessage.validError) {
      return returnMessage.msg;
    }

    // if (outputMessage.msg != null) {  Currently Disabled the sorting of duplicate error msg (Note:) need additional logic to make it work 100%
    //   let mergeErrors = [];
    //   outputMessage.msg.map((errorContainer, index) => {
    //     if (index != 0 && index != outputMessage.msg.length - 1)
    //       errorContainer.split("\n").map((errorMsg) => {
    //         mergeErrors.push(errorMsg);
    //       });
    //   });
    //   return this.filterOutPut(mergeErrors);
    // }
  };
}
