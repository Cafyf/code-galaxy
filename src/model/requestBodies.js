const submitRequestBody = {
    submission: {
        submissionId: 0,
        question: '',
        status: '',
        runtime: '', // pass data with + 'ms'
        language: "Java",
        submittedQuestion: "",
        topic: "",
      },
      progress: {
        progressId: 0,
        question: "",
        topic: "",
        mode: "",
        status: "",
      },
      session: {
        sessionId:0,
        sessionName: "",
        mode: "",
      }
}

const requestPayloads = new Map([
    ['submit', submitRequestBody]
]);

export default requestPayloads;