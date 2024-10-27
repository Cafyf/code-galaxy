import requestBodies from '../model/requestBodies.js'

export default class RequestBodyFactory {

    static createRequestBody(modelName,modelValues){
      return requestBodies.get(modelName);
    }
}