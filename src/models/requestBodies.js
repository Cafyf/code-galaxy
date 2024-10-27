import activityReqModels from "./activity-request-bodies/activityModels.js"

const requestPayloads = new Map([
    ['submission',activityReqModels.submissionRequestBody],
    ['session',activityReqModels.sessionRequestBody],
    ['progress',activityReqModels.progressRequestBody],
]);

export default requestPayloads;