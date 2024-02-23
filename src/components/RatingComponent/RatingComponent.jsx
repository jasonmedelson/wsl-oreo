import React, { useState, useContext } from 'react';
import "./RatingComponent.css";
import DataContext from '../../context/DataContext.jsx';

const RatingsComponent = () => {
  const { firestoreData, getRatings } = useContext(DataContext);
  console.log(firestoreData)
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission logic here
    alert(`Name: ${name}, Rating: ${rating}`);
  };
  const renderRatings = () => {
    if (firestoreData) {
      let hold = []
      for (let oreo of firestoreData) {
        console.log(`OREO: ${oreo.name}`)
        let oreorating = getRatings("oreo", oreo.id)

        console.log(oreorating)
        let oreoAVG = (oreorating.reduce((total, item) => total + item.score, 0) / oreorating.length).toFixed(2);

        hold.push(
          <div className='oreo-holder' key={oreo.id}>
            <div className='oreo-rating-name'>
              <h2>{oreo.name}</h2>
            </div>
            <div className='oreo-rating-image'>
              <img src={oreo.image} alt="" />
            </div>
            <div className='oreo-rating-rating'>
              <h2>{oreoAVG}⭐</h2>
            </div>
          </div>
        )
      }
      return hold
    }
  }
  return (
    <div id="rating-component">
      <h2>Ratings Component</h2>
      {renderRatings()}
      {/* Add more content here */}
    </div>
  );
};

export default RatingsComponent;
