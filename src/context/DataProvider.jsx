import React, { useState, useEffect } from 'react';
import DataContext from './DataContext';
import { db, storage } from '../firebase/firebase';
import { collection, query, onSnapshot, addDoc, doc } from "firebase/firestore";
const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "oreo-types"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const documents = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc)
        documents.push({ ...doc.data(), id: doc.id });
      });
      setData(documents);
    });
    // Unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Function to add a new document
  const addDocument = async (newDocument) => {
    try {
      const docRef = await addDoc(collection(db, "oreo-types"), newDocument);
      console.log("Document written with ID: ", docRef.id);
      return docRef.id
    } catch (e) {
      console.error("Error adding document: ", e);
      return false
    }
  };
  const addScore = async (oreo, name, score) => {
    try {
      const oreoDocRef = await addDoc(collection(db, "oreo-types", oreo, "ratings"), {
        author: name,
        score: parseInt(score)
      });
      console.log("Document written with ID: ", oreoDocRef.id);
      return oreoDocRef.id
    } catch (e) {
      console.error("Error adding document: ", e);
      return false
    }
  };
  return (
    <DataContext.Provider value={{ firestoreData: data, storageData: storage, newData: addDocument, addScore: addScore }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
