
import QuestionTopics from '../mocks/QuestionTopics.json'
import SessionCard from '../user-session/session-card/SessionCard.vue'
import Demo from '../demo/Demo.vue'
import FooterPage from '../footer/FooterPage.vue'
import HeaderSection from '../header/HeaderSection.vue'
import getImage from '../../Utils/asset-utils'
export default {
  name:"HomePage",
  components:{SessionCard,Demo,FooterPage,HeaderSection},
  data(){
   return {
    getImage,
    questionTopic:{}
   }
  },
   methods:{
        
         initUserDatas(){
          const body={
    "id": 1,
    "name": "nandyRps",
    "email": "prasannaNandhini730@gmail.com",
    "password": "prasaNan57",
    "userProfile": {
        "userProfile": 2,
        "userName": "nandyRps",
        "status": "beginner"
    }
}
         localStorage.setItem("user-info",JSON.stringify(body));
          
         }
    },
     created(){
     this.initUserDatas();
     
      this.questionTopic=QuestionTopics.topics;
    }
}