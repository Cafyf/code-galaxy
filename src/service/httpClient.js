import axios from "axios";

export default class HttpClient {

   static setParamValue(url, params) {
        const constructedParams = Object.entries(params)
        .map(([paramKey,paramValue]) => (paramValue != undefined ? `${paramKey}=${paramValue}` : ''))
        .filter(Boolean).join('&');
        return url.concat("\\").concat('?').concat(constructedParams);
      }

      static async executeApiCall(requestMethod, endPoint, requestData) {
        const { params, reqBody } = requestData;
        if (params != null && params != undefined) {
          endPoint = HttpClient.setParamValue(endPoint, params);
        }
        let argument = [endPoint];
        if (reqBody != null) argument.push(reqBody);
        try { 
           return await axios[requestMethod](...argument); 
        }
        catch (err) {
            console.error(err);
            return { data: null };
        }
    }
}
