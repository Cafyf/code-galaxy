import { openDB, deleteDB  } from 'idb';

export default class IndexedDb {

    static dbName = 'galaxy-store';
  
    // Initialize or connect to the database
    static async initDB(storeName, primaryKeyPath) {
      return openDB(this.dbName, 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, {keyPath:primaryKeyPath});
          }
        },
      });
    }
  
    // Add data to the store
    static async addData(storeName,data) {
      try {
        const db = await this.initDB(storeName);
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName); // Access the object store inside the transaction now we can performe CURD
        await store.put(data);
        await tx.done;
      } catch (error) {
        console.error('Error adding data:', error);
      }
    }
  
    // Get all data from the store
    static async getData(storeName,keyName) {
      try {
        const db = await this.initDB(storeName);
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        return await store.get(keyName);
      } catch (error) {
        console.error('Error fetching data:', error);
        return [];
      }
    }

    static async deleteDatabase(dbName) {
        try {
          // Delete the database
          await deleteDB(dbName);
          console.log('Database deleted successfully.');
        } catch (error) {
          console.error('Error deleting database:', error);
        }
      }
  }
