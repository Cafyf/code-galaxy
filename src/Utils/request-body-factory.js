import requestBodies from '../models/requestBodies.js'
import ObjectUtils from './object-utils.js';

export default class RequestBodyFactory {

    static reqBodyConfigMap = new Map([
        ['submit', ['submissionTemplate', 'progressTemplate', 'sessionTemplate']],
        ['code','codeTemplate'],
        ['signup','signupTemplate'],
    ]);

    // setting values to their appropriate keys
    static fillModelBody(model, values) {
        const modelCopy = ObjectUtils.deepCopy(model);
        console.log(modelCopy,"obj modelCopy");
        
        Object.keys(modelCopy).forEach((key, index) => {
           if(!ObjectUtils.isNullOrUndefinedOrEmpty(values[index]))
            modelCopy[key] = values[index];
        });
        return modelCopy;
    }

    static createRequestBody(configName, modelValues) {
        let requestBody  = {};
        const configStructure = this.reqBodyConfigMap.get(configName);
        if (Array.isArray(configStructure)) { // nested object structure
            configStructure.forEach((modelName, index) => {
                requestBody[modelName] = {}; // object body created 
                Object.assign(requestBody[modelName], this.fillModelBody(requestBodies.get(modelName), modelValues[index]))
            }); 
        } else {
            console.log(requestBodies.get(configStructure),"(requestBodies.get(configStructure)=================");
          requestBody  = this.fillModelBody(requestBodies.get(configStructure), modelValues);
        }
        return requestBody ;
    }
}