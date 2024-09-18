import React, { useState, useContext, useEffect } from 'react';
import "./RatingComponent.css";
import { useLocation, useNavigate } from 'react-router-dom';
import DataContext from '../../context/DataContext.jsx';
import { json } from 'react-router-dom';

const RatingsComponent = () => {
  const [oreoFilter, setOreoFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
  const { firestoreData, getRatings, uniqueRaters, currentPage, changePage } = useContext(DataContext);
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
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    console.log("Sort order changed to:", event.target.value); // Optional: For debugging
  };
  const sortOreos = (oreoList) => {
    // for (let oreo of oreoList) {
    //   console.log("---------")
    //   console.log(oreo.toString())
    // }

    console.log("---------")
    console.log(oreoList)
    return oreoList
  }
  const renderOreos = (oreosList) => {
    let hold = []
    oreosList.sort((a, b) => {
      let isANaN = isNaN(a.rating);
      let isBNaN = isNaN(b.rating);

      switch (sortOrder) {
        case 'alpha':
          // Alphabetically by name ascending
          return a.name.localeCompare(b.name);
        case 'alpha_rev':
          // Alphabetically by name descending
          return b.name.localeCompare(a.name);
        case 'numeric_asc':
          // Numerically by rating ascending
          if (isANaN && isBNaN) return 0; // Both are NaN, maintain current order
          if (isANaN) return 1;           // a is NaN, b is not, a goes to end
          if (isBNaN) return -1;          // b is NaN, a is not, b goes to end
          return a.rating - b.rating;
        case 'numeric_des':
          // Numerically by rating descending
          if (isANaN && isBNaN) return 0; // Both are NaN, maintain current order
          if (isANaN) return 1;           // a is NaN, b is not, a goes to end
          if (isBNaN) return -1;          // b is NaN, a is not, b goes to end
          return b.rating - a.rating;
        case 'unrated':
          if (isANaN && isBNaN) return 0; // Both are NaN, maintain current order
          if (isANaN) return -1;           // a is NaN, b is not, a goes to end
          if (isBNaN) return 1;
          return a.rating - b.rating;
        case 'default':
          // By default order (assumed to be by 'default' property ascending)
          return a.default - b.default;
        default:
          return a.default - b.default;
      }
    })
    for (let oreo of oreosList) {
      hold.push(
        <div className='oreo-holder' key={oreo.id} onClick={() => { navOreo(oreo.name) }}>
          <div className='oreo-rating-name'>
            <h2>{oreo.name}</h2>
          </div>
          <div className='oreo-rating-image'>
            <img src={oreo.image} alt="" />
          </div>
          <div className='oreo-rating-rating'>
            <h2>{oreo.rating}⭐</h2>
          </div>
        </div>
      )
    }
    return hold
  }
  const renderRatings = () => {
    if (firestoreData && firestoreData.length > 0) {
      let hold = []
      let index = 0;
      let check, lowerCheck, filterCheck, sortedOreos;
      sortedOreos = sortOreos(firestoreData)
      for (let oreo of sortedOreos) {

        if (oreoFilter && oreo) {
          console.log(":)")
          check = oreo.name
          lowerCheck = check.toLowerCase()
          filterCheck = lowerCheck.includes(oreoFilter.toLowerCase())
          console.log(oreo.name)
          console.log(filterCheck)
          console.log(lowerCheck)
          console.log(oreoFilter)
          if (filterCheck === false) {
            continue
          }
        }
        console.log(`OREO: ${oreo.name}`)
        let oreorating = getRatings("oreo", oreo.id)

        console.log(oreorating)
        let oreoAVG = (oreorating.reduce((total, item) => total + item.score, 0) / oreorating.length).toFixed(2);
        hold.push({
          name: oreo.name,
          rating: oreoAVG,
          image: oreo.image,
          default: index

        })
        index = index + 1
      }
      sortedOreos = renderOreos(hold)
      return sortedOreos
    }
  }
  return (
    <div id="rating-component">
      <h2>Oreo Ratings List</h2>
      <div id='ratings-controls'>
        <div id='rating-sort-select'>
          <label htmlFor="sortSelect" style={{ marginRight: '10px' }}>Sort by:</label>
          <select
            id="sortSelect"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="default">Default</option>
            <option value="numeric_asc">Rating (asc)</option>
            <option value="numeric_des">Rating (dsc)</option>
            <option value="alpha">Name (asc)</option>
            <option value="alpha_rev">Name (dsc)</option>
            <option value="unrated">Unrated</option>
          </select>
        </div>
        <input
          type="text"
          className="filter-input"
          placeholder="Search..."
          value={oreoFilter}
          onChange={(e) => setOreoFilter(e.target.value)}
          align="left"
        />
      </div>
      {renderRatings()}
      {/* Add more content here */}
    </div>
  );
};
export default RatingsComponent;
