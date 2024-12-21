import ObjectUtils from "./object-utils";

export default class MethodSignatureExtractor {

    static regexCapturePosition = new Map([
        ["dataTypes",1],
        ["variableNames",2],
        ["methodName",2],
        ["parameters",3]
    ]);
    
    static extract(methodSignature, type, inType) {
        const methodRegex = /(\w+(?:\s*\[\s*\])?)\s+(\w+)\s*\((.*?)\)/;
        const parameterRegex = /(\w+(?:\[\s*\]|\s?\[\s*\])*)\s*(\w+)/g;
        const matchedGroups = methodSignature.match(methodRegex);

        if(ObjectUtils.isNullOrUndefinedOrEmpty(matchedGroups)) return [];
        const capturedGroup = matchedGroups[this.regexCapturePosition.get(type)];
        if (inType == null) return capturedGroup;

        let capturedDataInOrder = [];
        let parameterMatch;
        while ((parameterMatch = parameterRegex.exec(capturedGroup)) !== null) {
            capturedDataInOrder.push(parameterMatch[this.regexCapturePosition.get(inType)]);
        }
        return capturedDataInOrder;
    }
}