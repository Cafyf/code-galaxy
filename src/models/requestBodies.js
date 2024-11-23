import activityReqModels from "./activity-request-bodies/activityModels.js"
import authModel from "./user-request-bodies/authModel.js";

const requestBodyTemplates = new Map([
    ['submissionTemplate',activityReqModels.submissionRequestBody],
    ['sessionTemplate',activityReqModels.sessionRequestBody],
    ['progressTemplate',activityReqModels.progressRequestBody],
    ['codeTemplate',activityReqModels.codeRequestBody],
    ['signupTemplate',authModel.signupRequestBody]
]);

export default requestBodyTemplates;