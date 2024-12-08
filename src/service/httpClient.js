import ObjectUtils from "@/Utils/object-utils";
import axios from "axios";

export default class HttpClient {

   static setParamValue(url, params) {
        const constructedParams = Object.entries(params)
        .map(([paramKey,paramValue]) => (paramValue && paramValue != undefined ? `${paramKey}=${paramValue}` : ''))
        .filter(Boolean).join('&');
        return url.concat("\\").concat('?').concat(constructedParams);
      }

      static async executeApiCall(requestMethod, endPoint, requestData) {
        const { params , reqBody } = requestData || {};
        if (!ObjectUtils.isNullOrUndefinedOrEmpty(params)) {
          endPoint = HttpClient.setParamValue(endPoint, params);
        }
        let argument = [endPoint];
        if (!ObjectUtils.isNullOrUndefinedOrEmpty(reqBody)) argument.push(reqBody);
        try { 
           return await axios[requestMethod](...argument); 
        }
        catch (err) {
           throw err;
        }
    }
}