// DateFormatter.js
export default class DateFormatter {
    /**
     * Formats a JavaScript Date object into a specified string format.
     * @param {Date} date - The date to format.
     * @param {string} format - The desired format (e.g., 'YYYY-MM-DD', 'MM/DD/YYYY').
     * @returns {string} - The formatted date string.
     */
    static formatDate(date, format) {
        const year = date.getFullYear();
        const month = (`0${date.getMonth() + 1}`).slice(-2); // Months are 0-based, so we add 1
        const day = (`0${date.getDate()}`).slice(-2);
    
        // Replace the format placeholders with actual date parts
        return format
          .replace('YYYY', year)
          .replace('MM', month)
          .replace('DD', day);
      }
    }
  
    