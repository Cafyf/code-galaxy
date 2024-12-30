import CryptoJS from 'crypto-js';

export default class LocalStorageUtils {
  static encryptionKey = 'please-discuss-to-provide-secret-key'; // Use a secure key for encryption even it should hide from developers

  static encrypt(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptionKey).toString();
  }

  static decrypt(data) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, this.encryptionKey);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      console.error('Decryption failed:', error);
      return null;
    }
  }

  static setItem(key, value, encrypt = false) {
    const data = encrypt ? this.encrypt(value) : JSON.stringify(value);
    localStorage.setItem(key, data);
  }

  static getItem(key, decrypt = false) {
    const data = localStorage.getItem(key);
    if (!data) return null;
    return decrypt ? this.decrypt(data) : JSON.parse(data);
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
