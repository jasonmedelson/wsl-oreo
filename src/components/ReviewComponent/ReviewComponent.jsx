import React, { useState, useContext } from 'react';
import "./ReviewComponent.css";
import DataContext from '../../context/DataContext.jsx';
import CarouselComponent from './CarouselComponent/CarouselComponent'
const ReviewComponent = () => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState('5');
  const [flavors, setFlavors] = useState([]);
  const { firestoreData, addScore } = useContext(DataContext);
  const [selectedFlavor, setSelectedFlavor] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle the form submission logic here
    // alert(`Name: ${name}, Rating: ${rating}, OREO: ${selectedFlavor}`);
    let newScore = await addScore(selectedFlavor, name, rating)
    console.log("New Score Entry Created: ", newScore)

  };

  const ratingOptions = [];
  for (let i = 1; i <= 10; i += 0.5) {
    ratingOptions.push(<option key={i} value={i}>{i}</option>);
  }

  const handleImageChange = (key) => {
    console.log("Currently focused image key:", key);
    setSelectedFlavor(key)
  };
  const getImages = (data) => {
    if (data.length) {
      let hold = []
      for (let item of data) {
        console.log(JSON.stringify(item))
        hold.push({
          key: item['id'],
          image: item['image'],
          name: item['name']
        })
      }
      return hold;
    }
  }
  // getImages(firestoreData)
  return (
    <div id="review-component">
      <h2>Ratings Component</h2>
      {
        firestoreData.length
        &&
        <CarouselComponent images={getImages(firestoreData)} onImageChange={handleImageChange} />

      }
      {/* Add more content here */}
      <div className="rating-form">
        <div className="form-group">
          <label htmlFor="name">Reviewer Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            {ratingOptions}
          </select>
        </div>
        <button type="button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default ReviewComponent;
