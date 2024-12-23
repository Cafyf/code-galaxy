import ObjectUtils from "./object-utils";

export default class StringUtils {
    // Method to convert a string to uppercase letters
    static toUpperCase(str) {
      return str.toUpperCase();
    } 
    // Method to convert a string to lowercase letters
    static toLowerCase(str) {
      return str.toLowerCase();
    }
  
    static hasValueChanged(newValue,oldValue){
       return this.ignoreCommentedAndWhiteSpaces(newValue) !== this.ignoreCommentedAndWhiteSpaces(oldValue);
    }

    static ignoreCommentedAndWhiteSpaces(value){
       if(ObjectUtils.isNullOrUndefinedOrEmpty(value)) return "";
       return value.replace(/\/\/\s?.*$/gm, '').replace(/\s+/g, '');
    }
}