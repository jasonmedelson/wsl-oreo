import React, { useState, useContext, useEffect } from 'react';
import "./ReviewComponent.css";
import DataContext from '../../context/DataContext.jsx';
import CarouselComponent from './CarouselComponent/CarouselComponent'
const ReviewComponent = () => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState('5');
  const { firestoreData, addScore } = useContext(DataContext);
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [loading, setLoading] = useState(false);
  const [ratingConfirmed, setRatingConfirmed] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      let newScore = await addScore(selectedFlavor, name, rating);
      console.log("New Score Entry Created: ", newScore);
      setRatingConfirmed(true);
    } catch (error) {
      console.error("Error submitting rating:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Reset form fields and confirmation message when selectedFlavor changes
    setRatingConfirmed(false);
    setName('');
    setRating('5');
  }, [selectedFlavor]);

  const handleImageChange = (key) => {
    console.log("Currently focused image key:", key);
    setSelectedFlavor(key);
  };

  const ratingOptions = [];
  for (let i = 1; i <= 10; i += 0.5) {
    ratingOptions.push(<option key={i} value={i}>{i}</option>);
  }

  const getImages = (data) => {
    if (data.length) {
      let hold = [];
      for (let item of data) {
        console.log(JSON.stringify(item));
        hold.push({
          key: item['id'],
          image: item['image'],
          name: item['name']
        });
      }
      return hold;
    }
  };

  return (
    <div id="review-component">
      <h2>Rate Your Oreo Flavor</h2>
      {firestoreData.length && (
        <CarouselComponent images={getImages(firestoreData)} onImageChange={handleImageChange} />
      )}

      <div className="rating-form">
        {ratingConfirmed ? (
          <div>Rating confirmed!</div>
        ) : (
          <form onSubmit={handleSubmit}>
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
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReviewComponent;