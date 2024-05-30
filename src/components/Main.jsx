import React, { useContext, useState, useEffect, useRef } from 'react';
import DataContext from '../context/DataContext.jsx';
import "./Main.css"
import ReviewComponent from './ReviewComponent/ReviewComponent.jsx';
import RatingsComponent from './RatingComponent/RatingComponent.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import NewOreo from './NewOreo/NewOreo.jsx';
const MainComponent = () => {
    const [showAdmin, setShowAdmin] = useState(false);
    const { firestoreData, currentPage, changePage } = useContext(DataContext);
    const [keysPressed, setKeysPressed] = useState({});
    // const [currentPage, setCurrentPage] = useState('review');
    const reviewButtonRef = useRef(null);
    const ratingsButtonRef = useRef(null);
    const indicatorRef = useRef(null);
    let location = useLocation();
    let navigate = useNavigate();
    console.log(firestoreData)
    const handleKeyDown = (event) => {
        console.log(event.key?.toLowerCase())
        try {
            if (showAdmin) { return }
            setKeysPressed(prev => ({ ...prev, [event.key?.toLowerCase()]: true }));
            let instantCheck = { ...keysPressed, [event.key?.toLowerCase()]: true }
            // Check if A, D, M, I, N are all pressed
            if (instantCheck['a'] && instantCheck['d'] && instantCheck['m'] && instantCheck['i'] && instantCheck['n']) {
                console.log("A, D, M, I, N keys were pressed together!");
                setShowAdmin(true)
                // You can also trigger any action here
            }

        } catch (error) {
            console.error(error)
        }
    };

    const handleKeyUp = (event) => {
        try {
            setKeysPressed(prev => ({ ...prev, [event.key?.toLowerCase()]: false }));
        } catch (error) {
            console.error(error)
        }
    };
    useEffect(() => {
        if (location.pathname === '/ratings') {
            changePage("ratings")
        }
    })
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [keysPressed]);
    const onClose = () => {
        setShowAdmin(false)
    }
    const renderModal = () => {
        if (showAdmin) {
            return (
                <div id="modal-container">
                    <div id="modal-content">
                        <div id="modal-close" onClick={onClose}>X</div>
                        <NewOreo></NewOreo>
                    </div>
                </div>
            )
        }
    }
    const renderCurrentPage = () => {
        if (currentPage === 'review') {
            return <ReviewComponent />;
        } else if (currentPage === 'ratings') {
            return <RatingsComponent />;
        }
    };
    //   console.log(data)
    //   const sample = (items) => {
    //     if(items.length){
    //         console.log(items)
    //         console.log(typeof items)
    //         console.log(items[0])
    //         console.log(items[0].id)
    //         let hold = []
    //         for(let item of items){
    //             console.log(item)
    //             hold.push(<h1 key={item.id}>{item.id}</h1>)
    //         }
    //         return hold
    //     }
    //   }
    useEffect(() => {
        const activeButtonRef = currentPage === 'review' ? reviewButtonRef : ratingsButtonRef;
        const indicator = indicatorRef.current;
        const activeButton = activeButtonRef.current;

        if (indicator && activeButton) {
            indicator.style.width = `${activeButton.offsetWidth}px`;
            indicator.style.transform = `translateX(${activeButton.offsetLeft}px)`;
        }
    }, [currentPage]);
    // Use the data from context
    return (
        <div id="app-container">
            {renderModal()}
            {/* Render Main data here */}
            <div className="top-bar">
                <button
                    ref={reviewButtonRef}
                    className={`left-button ${currentPage === 'review' ? 'active' : ''}`}
                    onClick={() => {
                        if(location.pathname == '/ratings'){
                            navigate("/")
                        }
                        changePage('review')
                    }}>
                    Review
                </button>
                <button
                    ref={ratingsButtonRef}
                    className={`right-button ${currentPage === 'ratings' ? 'active' : ''}`}
                    onClick={() => changePage('ratings')}>
                    Ratings
                </button>
                <span className="indicator" ref={indicatorRef}></span>
            </div>
            <div className="content-section">
                {renderCurrentPage()}
            </div>
        </div>
    );
};

export default MainComponent;
