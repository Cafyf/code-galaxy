import getImage from '../../Utils/asset-utils'
export default {
    name:"Demo",

    data(){
     return{      
        getImage,
        firstImgs:['java.jpg','js.png','topic.png'],
        subContent:[
         { 
            p1:'Top Interview 100',
            p2:'Must-do List for Interview Prep'
        },
         { 
            p1:'Java Code',
            p2:'Ace Coding Interview with 75Q'
        },
         { 
            p1:'SQL 50',
            p2:'Crack SQL Interview in 50 Qs'
        },
         { 
            p1:"Algorithm's 20",
            p2:'Code Galaxy Staff Pick'
        },
         { 
            p1:'Java FrameWorks ',
            p2:'Practice FrameWork '
        },
         { 
            p1:'Dynamic Programming',
            p2:'10 Essential DP Patterns'
        }
        ]
     }
    },

      methods:{
         
      }

}