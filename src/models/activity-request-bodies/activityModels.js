const submissionRequestBody = {
    submissionId: 0,
    question: '',
    status: '',
    runtime: '', // pass data with + 'ms'
    language: "",
    submittedQuestion: "",
    topic: "",
  };
  
const sessionRequestBody = {
    sessionId:0,
    sessionName: "",
    mode: "",
  };

const progressRequestBody = {
    progressId: 0,
    question: "",
    topic: "",
    mode: "",
    status: "",
  };
  const codeRequestBody = {
    language : "",
    code :"",
    mode : false,
    userIp: "",
    input: "",
  }
 
  export default {progressRequestBody,sessionRequestBody,submissionRequestBody,codeRequestBody};