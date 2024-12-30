import { Component, Vue } from "vue-facing-decorator";
import getImage from "../../Utils/asset-utils";
import LocalStorageUtils from "@/Utils/local-storage-utils";
import SessionCard from "../user-session/session-card/SessionCard.vue";
import Demo from "../demo/Demo.vue";
import FooterPage from "../footer/FooterPage.vue";
import HeaderSection from "../header/HeaderSection.vue";
import QuestionTopics from "../mocks/QuestionTopics.json";

@Component({
  components: { SessionCard, Demo, FooterPage, HeaderSection }
})
export default class HomePage extends Vue {
  questionTopic = {};
  getImage = getImage;
  initUserDatas() {
    const body = {
      id: 1,
      name: "RpsFreko",
      email: "prasanna@gmail.com",
      password: "prasa57",
      userProfile: {
        userProfile: 2,
        userName: "Rps",
        status: "beginner",
      },
    };
   LocalStorageUtils.setItem("user-info",body);
  };

  created() {
  //  this.initUserDatas();
    this.questionTopic = QuestionTopics.topics;
  };
}
