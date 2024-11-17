import { Component, Prop, Vue } from "vue-facing-decorator";
import { MESSAGES } from "@/models/constants/custom-messages.js";
import { CONSTANTS } from "@/models/constants/globalConstants";

@Component
export default class errorMsgs extends Vue {
  @Prop({ default: false }) change;
  @Prop({ type: Object }) outputContainer;

  change = false;
  show = true;
  supportShow = true;
  errorheader = "";
  textColor = "";

  filterOutPut(mergedErrorContainer) {
    let uniqueErrors = []; // Initialize an empty array to store unique string elements
    let uniqueSet = new Set(); // Initialize a Set to keep track of unique elements

    mergedErrorContainer.forEach((element) => {
      // Iterate over the merged array
      if (
        typeof element === "string" &&
        !uniqueSet.has(element.trim()) &&
        !element.includes(".java")
      ) {
        // Check if the element is a string and not already in the set
        uniqueSet.add(element.trim()); // Add the element to the set
        uniqueErrors.push(element); // Add the element to the unique array
      }
    });

    return uniqueErrors; // Return the unique array
  };
  customErrors(CheckCustomErrorMsg) {
    for (let i = 0; i < CheckCustomErrorMsg.length - 1; i++) {
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
        return MESSAGES.traceError.msg;
      } else {
        console.log(CheckCustomErrorMsg[i]);
        // this.filterOutPut(CheckCustomErrorMsg);
      }
    }
  };

  errorValidation(outputMessage) {
    let returnMessage = {
      msg: "",
      validError: false,
    };
    // if(outputMessage.msg===null ){ return };

    if (
      outputMessage.msg.length > 0 &&
      outputMessage.msg[0].includes("Exception") &&
      outputMessage.msg[0].includes("java.lang.")
    ) {
      console.log("okokoko");
      returnMessage.msg = outputMessage.msg[0].split("\r\n");
      returnMessage.validError = true;
      return returnMessage;
    }

    if (
      (outputMessage.msg != "" &&
      outputMessage.msg[1].trim() ===
        "class, interface, enum, or record expected") || 
        (outputMessage.msg != "" &&
          outputMessage.msg[1].trim() ===
            "class, interface, or enum expected")
    ) {
      returnMessage.msg = this.customErrors(outputMessage.msg);
      returnMessage.validError = true;
      return returnMessage;
    }
    return returnMessage;
  };
  formatOutPutMessage(outputMessage) {
    if (outputMessage.defaultOpDesc != undefined) {
      this.supportShow = true;
      console.log(outputMessage.defaultOpDesc);
      return outputMessage.defaultOpDesc;
    }
    this.supportShow = false;
    this.show = outputMessage.show;
    const returnMessage = this.errorValidation(outputMessage);
    if (returnMessage.validError) {
      return returnMessage.msg;
    }

    if (outputMessage.msg === "Empty code body!") {
      this.errorheader = outputMessage.msg;
      return;
    }
    if (outputMessage.msg.includes("Declarations are wrong")) {
      this.errorheader = outputMessage.msg;
      return;
    }
    if (this.show == false && outputMessage.msg != null) {
      if (outputMessage.msg.length - 1 === 1) {
        this.errorheader = outputMessage.msg[outputMessage.msg.length - 1];
        return;
      }
      this.errorheader = outputMessage.msg[outputMessage.msg.length - 1];
      let mergeErrors = [];
      outputMessage.msg.map((errorContainer, index) => {
        if (index != 0 && index != outputMessage.msg.length - 1)
          errorContainer.split("\r\n").map((errorMsg) => {
            mergeErrors.push(errorMsg);
          });
      });
      return this.filterOutPut(mergeErrors);
    }
    try {
      return outputMessage.msg.split("\r\n");
    } catch (err) {
      return outputMessage.msg;
    }
  };

  mounted() {
    this.supportShow = true;
  };
}
