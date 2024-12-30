class LocalStorageUtils {
  
    static setItem(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  
    static getItem(key) {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    }
  
    static removeItem(key) {
      localStorage.removeItem(key);
    }
  
    static clear() {
      localStorage.clear();
    }
  
    static hasKey(key) {
      return localStorage.getItem(key) !== null;
    }
  
    static getAllKeys() {
      return Object.keys(localStorage);
    }
  }
  