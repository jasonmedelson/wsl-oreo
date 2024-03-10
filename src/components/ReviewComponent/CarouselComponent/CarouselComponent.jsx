import React, { useState, useEffect } from 'react';
import './CarouselComponent.css';
import { useLocation, useNavigate } from 'react-router-dom';
const CarouselComponent = ({ images, onImageChange }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [clicked, setClicked] = useState({ left: false, right: false });
    let location = useLocation();
    let navigate = useNavigate();
    useEffect(() => {
        if (onImageChange) {
            onImageChange(images[currentIndex].key);
        }
    }, [currentIndex, images, onImageChange]);
    useEffect(() => {
        let check = location.pathname.replace(/^\/+|\/+$/g, '');
        for (let [index, item] of images.entries()) {
            let oreoNameCheck = item.name.toLowerCase().replace(/\s+/g, '');
            console.log(oreoNameCheck)
            console.log(check)
            console.log(oreoNameCheck === check)
            if (oreoNameCheck === check) {
                onImageChange(item.key);
                setCurrentIndex(index)
                console.log("match ==", item)
                return
            }
        }
    }, [])

    const goToPrevious = () => {
        setClicked({ ...clicked, left: true });
        setTimeout(() => setClicked({ ...clicked, left: false }), 100);
        const isFirstImage = currentIndex === 0;
        const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
        let name = images[newIndex].name.toLowerCase().replace(/\s+/g, '');
        navigate(`/${name}`)
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        setClicked({ ...clicked, right: true });
        setTimeout(() => setClicked({ ...clicked, right: false }), 100);
        const isLastImage = currentIndex === images.length - 1;
        const newIndex = isLastImage ? 0 : currentIndex + 1;
        let name = images[newIndex].name.toLowerCase().replace(/\s+/g, '');
        navigate(`/${name}`)
        setCurrentIndex(newIndex);
    };

    return (
        <div>
            <div className="carousel">
                <button className={`left-arrow ${clicked.left ? 'clicked' : ''}`} onClick={goToPrevious}>&lt;</button>
                <div className="image-container">
                    {images.map((image, index) => (
                        <div
                            key={image.key}
                            className={index === currentIndex ? "carouselhold active" : "carouselhold inactive"}
                        >
                            <img
                                src={image.image}
                                alt={image.name}
                            />
                            <p className="image-title">{image.name}</p>
                        </div>
                    ))}
                </div>
                <button className={`right-arrow ${clicked.right ? 'clicked' : ''}`} onClick={goToNext}>&gt;</button>
            </div>
        </div>
    );
};

export default CarouselComponent;
