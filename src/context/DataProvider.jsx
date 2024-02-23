import React, { useState, useEffect } from 'react';
import DataContext from './DataContext';
import { db, storage } from '../firebase/firebase';
import { collection, query, onSnapshot, addDoc, where } from "firebase/firestore";

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [ratingsData, setRatingsData] = useState([]);

  useEffect(() => {
    // Query for oreo-types collection
    const oreoTypesQuery = query(collection(db, "oreo-types"));
    const unsubscribeOreoTypes = onSnapshot(oreoTypesQuery, (querySnapshot) => {
      const oreoDocuments = [];
      querySnapshot.forEach((doc) => {
        oreoDocuments.push({ ...doc.data(), id: doc.id });
      });
      setData(oreoDocuments);
    });

    // Query for Ratings collection
    const ratingsQuery = query(collection(db, "Ratings"));
    const unsubscribeRatings = onSnapshot(ratingsQuery, (querySnapshot) => {
      const ratingsDocuments = [];
      querySnapshot.forEach((doc) => {
        ratingsDocuments.push({ ...doc.data(), id: doc.id });
      });
      setRatingsData(ratingsDocuments);
    });

    // Cleanup functions
    return () => {
      unsubscribeOreoTypes();
      unsubscribeRatings();
    };
  }, []);

  // Function to add a new document to oreo-types collection
  const addDocument = async (newDocument) => {
    try {
      const docRef = await addDoc(collection(db, "oreo-types"), newDocument);
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
      return false;
    }
  };

  // Function to add a new document to Ratings collection
  const addScore = async (oreo, name, score) => {
    try {
      const oreoDocRef = await addDoc(collection(db, "Ratings"), {
        oreo: oreo,
        rater: name,
        score: parseInt(score)
      });
      console.log("Document written with ID: ", oreoDocRef.id);
      return oreoDocRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
      return false;
    }
  };

  // Function to get all ratings for a specific oreo or rater
  const getRatings = (filterType, filterValue) => {
    return ratingsData.filter((rating) => rating[filterType] === filterValue);
  };

  return (
    <DataContext.Provider value={{ firestoreData: data, storageData: storage, newData: addDocument, addScore: addScore, getRatings: getRatings }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
