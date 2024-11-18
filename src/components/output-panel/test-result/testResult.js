import { Component,Prop, Vue } from "vue-facing-decorator";

@Component
export default class TestResult extends Vue {
    @Prop({ type: Object }) testData;

}