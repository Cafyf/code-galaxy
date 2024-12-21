import state from "@/store/store";
import MethodSignatureExtractor from "@/Utils/method-signature-extractor";
import ObjectUtils from "@/Utils/object-utils";

export default class CodeViolationValidator {

    static rulesViolationChecker(codeSnippet,methodBrief){
        const isNotValidCodeSnippent = this.isValidForExecution(codeSnippet);
        if(isNotValidCodeSnippent){
         return ["METHOD_DECLARATION_MISSING"];
        } 
        const isDataTypesModified = this.checkDataTypeDeclaration(codeSnippet,methodBrief);
        if(isDataTypesModified){
         return ["DATA_TYPES_DECLARATION_MODIFIED"];
        }
        const prohibitedLines = this.checkProhibitedLines(codeSnippet);
        if(prohibitedLines){
            return prohibitedLines;
        } 
        const isMethodRulesViolated = this.validateMethodSignatures(codeSnippet,methodBrief);
         if(isMethodRulesViolated){
            state.codeStatus="Declaraction MisMatch";
            return ["DONT_CHANGE_THE_DEFAULT_METHOD_DECLARATION"];
        }

        return false;
    }

    static checkProhibitedLines(codeSnippet){
        if(/System\.out\.println\(|print\(/.test(codeSnippet)) 
          return ["PRINT_STATEMENTS_ARE_NOT_ALLOWED"];
    }

    static validateMethodSignatures(codeSnippet,methodBrief){
        const methods = this.extractMethodDefinition(codeSnippet);
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
    
    static isMultipleMethodSignature(codeSnippet){
        return this.extractMethodDefinition(codeSnippet).length>1;
    }
    
    static isValidForExecution(codeSnippet){
        if(ObjectUtils.isNullOrUndefinedOrEmpty(codeSnippet.trim())) return true;
        return ObjectUtils.isNullOrUndefinedOrEmpty(this.extractMethodDefinition(codeSnippet));
    }

    static extractMethodDefinition(codeSnippet){
        const methodRegex =/(\w+(?:\s*\[\s*\])?)\s+(\w+)\s*\([^)]*\)\s*{[^}]*}/g;
        return codeSnippet.match(methodRegex);
    }

    static checkDataTypeDeclaration(codeSnippet,methodBrief){
        const methods = this.extractMethodDefinition(codeSnippet);
        if(methods.length===1){
         return !(JSON.stringify(MethodSignatureExtractor.extract(methods[0],"parameters","dataTypes")).replace(/\s+/g, '') === JSON.stringify( MethodSignatureExtractor.extract("prototype "+methodBrief,"parameters","dataTypes")).replace(/\s+/g, ''));
       }
       return false;
    }
}