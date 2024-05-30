import React, { useState, useContext, useEffect } from 'react';
import "./RatingComponent.css";
import { useLocation, useNavigate } from 'react-router-dom';
import DataContext from '../../context/DataContext.jsx';

const RatingsComponent = () => {
  const { firestoreData, getRatings, uniqueRaters, currentPage, changePage} = useContext(DataContext);
  let location = useLocation();
  let navigate = useNavigate();
  console.log(firestoreData)
  console.log(uniqueRaters)
  useEffect(() => {
    console.log(location.pathname)
  })
  const navOreo = (oreoName) => {
    let check = oreoName.toLowerCase().replace(/\s+/g, '');
    navigate(`/${check}`)
    changePage('review')
  }
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
          <div className='oreo-holder' key={oreo.id} onClick={()=>{navOreo(oreo.name)}}>
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
