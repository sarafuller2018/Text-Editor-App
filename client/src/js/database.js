// Imports necessary files
import { openDB } from 'idb';

// Creates function to initialize database and object store
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Adds logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("You are POSTing to the database.");
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  // Updating ID 1, adding the content
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log("Your data has been saved to the database", result);
};

// Adds logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GETting all from the database");
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.get(1);
  const result = await request;
  if (result) {
    console.log("data retrieved");
    return result.value;
  } else {
    console.log("data not found");
  }
};

initdb();