export default class ConverterUtils {
    static numberToString(num) {
        return String(num);
      }
    
      // Method to convert a string to a number, returning NaN if conversion fails
      static stringToNumber(str) {
        const num = Number(str);
        return isNaN(num) ? NaN : num;
      }
    }
 