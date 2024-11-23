import requestBodies from '../models/requestBodies.js'

export default class RequestBodyFactory {

    static reqBodyConfigMap = new Map([
        ['submit', ['submissionTemplate', 'progressTemplate', 'sessionTemplate']],
        ['code','codeTemplate'],
        ['signup','signupTemplate'],
    ]);

    // setting values to their appropriate keys
    static fillModelBody(model, values) {
        Object.keys(model).forEach((key, index) => {
            model[key] = values[index];
        });
        return model;
    }

    static createRequestBody(configName, modelValues) {
        let requestBody  = {};
        const configStructure = this.reqBodyConfigMap.get(configName);
        if (Array.isArray(configStructure)) { // nested object structure
            configStructure.forEach((modelName, index) => {
                const modelBody = requestBodies.get(modelName);
                requestBody[modelName] = {}; // object body created 
                Object.assign(requestBody [modelName], this.fillModelBody(modelBody, modelValues[index]))
            }); 
        } else {
          requestBody  = this.fillModelBody(requestBodies.get(configStructure), modelValues);
        }
        return requestBody ;
    }
}