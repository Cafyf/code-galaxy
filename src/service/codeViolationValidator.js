import MethodSignatureExtractor from "@/Utils/method-signature-extractor";

export default class CodeViolationValidator {

    static rulesViolationChecker(codeSnippet,methodBrief){
        const prohibitedLines = this.checkProhibitedLines(codeSnippet);
        if(prohibitedLines){
            return prohibitedLines;
        } 
        const isMethodRulesViolated = this.validateMethodSignatures(codeSnippet,methodBrief);
         if(isMethodRulesViolated){
            return "error:DONT_CHANGE_THE_DEFAULT_METHOD_DECLARATION";
        }

        return "rulesNotViolated";
    }

    static checkProhibitedLines(codeSnippet){
        if(/System\.out\.println\(|print\(/.test(codeSnippet)) 
          return "error:PRINT_STATEMENTS_ARE_NOT_ALLOWED";
    }

    static validateMethodSignatures(codeSnippet,methodBrief){
        const methodRegex =/(\w+(?:\s*\[\s*\])?)\s+(\w+)\s*\([^)]*\)\s*{[^}]*}/g;
        const methods = codeSnippet.trim().match(methodRegex);
        if(methods.length>1){
            for (const method of methods) {
                const methodName = MethodSignatureExtractor.extract(method,"methodName",null);
                const parameterTypes = MethodSignatureExtractor.extract(method,"parameters","dataTypes");
                const escapedParameterTypes = parameterTypes.map(escapeRegEx=> this.escapeRegExp(escapeRegEx));
                const regexString =`\\b${methodName}\\s*\\(\\s*(?:${escapedParameterTypes.join('\\s?\\w+\\s*,\\s*')})\\s+\\w+\\s*\\)`;
                const methodRegex = new RegExp(regexString);
                if (methodRegex.test(methodBrief)) return false;
              }
              return true;
        }
        return false;
    }

    static escapeRegExp(stringValue) {
        return stringValue.replace(/[.*+?^${}()|[\]\\]/g, '\\s?\\$&').replace(" ","");
      }
}