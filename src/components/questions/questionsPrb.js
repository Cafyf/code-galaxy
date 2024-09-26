import { Component,Prop,Vue} from "vue-facing-decorator"

@Component
export default class QuestionsPrb extends Vue {
    @Prop()
    problemContainer;
}