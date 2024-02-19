import React, { useState } from 'react';
import "./RatingComponent.css";

const RatingsComponent = () => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState('1');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission logic here
    alert(`Name: ${name}, Rating: ${rating}`);
  };

  const ratingOptions = [];
  for (let i = 1; i <= 10; i += 0.5) {
    ratingOptions.push(<option key={i} value={i}>{i}</option>);
  }
  return (
    <div id="rating-component">
      <h2>Ratings Component</h2>
      {/* Add more content here */}
    </div>
  );
};

export default RatingsComponent;
