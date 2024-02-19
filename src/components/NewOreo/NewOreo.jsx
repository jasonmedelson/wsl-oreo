import React, { useState, useContext } from 'react';
import './NewOreo.css'; // Import CSS for styling
import DataContext from '../../context/DataContext';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const NewOreo = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadStatus, setUploadStatus] = useState({ image: false, oreo: false });

    const {storageData, newData} = useContext(DataContext);
    console.log(storageData)
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const createOreo = async (oreoURL) => {
        console.log("Creating Oreo")
        let CreatedOreo = await newData({
            name: name,
            image: oreoURL
        })
        console.log("Created Oreo: ", CreatedOreo)
        setUploadStatus({ ...uploadStatus,image: true, oreo: true });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        if (image) {
            let fileExtension = image.name.slice(image.name.lastIndexOf('.'));
            const storageRef = ref(storageData, 'oreos/' + name + fileExtension);
            uploadBytes(storageRef, image).then((snapshot) => {
                console.log('Uploaded a blob or file!');
                return getDownloadURL(snapshot.ref);
            }).then((downloadURL) => {
                console.log('File available at', downloadURL);
                setUploadStatus({ ...uploadStatus, image: true });
                createOreo(downloadURL)
            }).catch((error) => {
                console.error('Error uploading file:', error);
            });
        }
            // const storageRef = ref(storage, 'some-child/' + name + fileExtension);
        // // Simulate asynchronous upload task
        // setTimeout(() => {
        //     setUploadStatus({ ...uploadStatus, name: true });
        // }, 2000); // Simulate name upload

        // setTimeout(() => {
        //     setUploadStatus({ ...uploadStatus, image: true });
        // }, 4000); // Simulate image upload
    };
    const isFormValid = () => {
        return name !== '' && image !== null;
    };

    const renderSpinner = () => {
        return <div className="spinner"></div>;
    };
    if (isSubmitting) {
        return (
            <div className="checklist">
                <div className={`checklist-item ${uploadStatus.image ? 'done' : ''}`}>
                    Uploading image <span className="spacer"></span>{uploadStatus.image ? '✅' : renderSpinner()}
                </div>
                <div className={`checklist-item ${uploadStatus.oreo ? 'done' : ''}`}>
                    Creating Oreo <span className="spacer"></span>{uploadStatus.oreo ? '✅' : renderSpinner()}
                </div>
            </div>
        );
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={handleNameChange} />
                </label>
                <label>
                    Image:
                    <input type="file" onChange={handleImageChange} accept="image/*" />
                </label>
                {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" className="image-preview" />}
                <button type="submit" disabled={!isFormValid()}>Submit</button>
            </form>
        </div>
    );
};

export default NewOreo;
