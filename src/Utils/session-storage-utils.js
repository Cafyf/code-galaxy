export class SessionStorageUtils {
    
    static setItem(key, value) {
      try {
        const data = JSON.stringify(value);
        sessionStorage.setItem(key, data);
      } catch (error) {
        console.error(`Error setting item in sessionStorage: ${error}`);
      }
    }
  
    static getItem(key) {
      try {
        const data = sessionStorage.getItem(key);
        return data ? JSON.parse(data) : null;
      } catch (error) {
        console.error(`Error getting item from sessionStorage: ${error}`);
        return null;
      }
    }
  
  
    static removeItem(key) {
      try {
        sessionStorage.removeItem(key);
      } catch (error) {
        console.error(`Error removing item from sessionStorage: ${error}`);
      }
    }
  
    static clear() {
      try {
        sessionStorage.clear();
      } catch (error) {
        console.error(`Error clearing sessionStorage: ${error}`);
      }
    }
  }