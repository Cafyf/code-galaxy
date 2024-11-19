import { Component,Prop, Vue,Watch  } from "vue-facing-decorator";
import TestResult from "./test-result/TestResult.vue";
import ErrorDisplayProcessor from "./error-display-processor/ErrorDisplayProcessor.vue";

@Component({
    components:{TestResult, ErrorDisplayProcessor}
})
export default class OutputPanel extends Vue {
    @Prop({ default: false }) change;
    @Prop({type:Object}) outputContainer;

    displayComponent = "";
    displayComponentProps = {};
    normalOutput =[];
    show = false;

    @Watch('outputContainer')
    displayOutput(){
        this.show = false;
        this.displayComponent = ""
        this.displayComponentProps = {};
        if (this.outputContainer.isTestResult && !TestResult.isNullOrUndefinedOrEmpty(this.outputContainer.defaultOpDesc )) {
            this.displayComponent = "TestResult";
            this.displayComponentProps = {testData:this.outputContainer}
        } else if (!this.outputContainer.isTestResult && !TestResult.isNullOrUndefinedOrEmpty(this.outputContainer.defaultOpDesc )) {
            this.displayComponent = "ErrorDisplayProcessor";
            this.displayComponentProps = {outputContainer:this.outputContainer}
        } else if (this.outputContainer.isTestResult && !TestResult.isNullOrUndefinedOrEmpty(this.outputContainer.defaultOpDesc )){
            try {
                this.show = true;
                this.normalOutput = this.outputContainer.msg.split("\r\n");
              } catch (err) {
                console.error("ERROR: Catch in displayOutput method :",err);
                this.normalOutput = this.outputContainer.msg;
              }
        }
    }
}