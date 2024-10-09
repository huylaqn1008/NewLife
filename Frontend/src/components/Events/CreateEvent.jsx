// src/components/CreateEvent.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './CreateEvent.css'; // We'll create this CSS file next

const CreateEvent = () => {
    const [formData, setFormData] = useState({
        eventName: '',
        companyName: '',
        description: '',
        eventDate: '',
    });
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle file selection
    const handleFileChange = (e) => {
        setImages(e.target.files);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');

        // Validate form data
        if (!formData.eventName || !formData.companyName || !formData.description || !formData.eventDate || images.length === 0) {
            setErrorMessage('Please fill in all fields and upload at least one image.');
            setLoading(false);
            return;
        }

        try {
            const data = new FormData();
            data.append('eventName', formData.eventName);
            data.append('companyName', formData.companyName);
            data.append('description', formData.description);
            data.append('eventDate', formData.eventDate);

            // Append each image file
            for (let i = 0; i < images.length; i++) {
                data.append('images', images[i]);
            }

            // Replace with your backend URL if different
            const response = await axios.post('http://localhost:4000/api/event/create', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setSuccessMessage('Event created successfully!');
            setFormData({
                eventName: '',
                companyName: '',
                description: '',
                eventDate: '',
            });
            setImages([]);
        } catch (error) {
            console.error('Error creating event:', error);
            setErrorMessage(error.response?.data?.message || 'Failed to create event.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-event-container">
            <h2>Create New Event</h2>
            <form onSubmit={handleSubmit} className="create-event-form">
                <div className="form-group">
                    <label htmlFor="eventName">Event Name:</label>
                    <input
                        type="text"
                        id="eventName"
                        name="eventName"
                        value={formData.eventName}
                        onChange={handleChange}
                        required
                        minLength={5}
                        placeholder="Enter event name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="companyName">Company Name:</label>
                    <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        minLength={5}
                        placeholder="Enter company name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        minLength={10}
                        placeholder="Enter event description"
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="eventDate">Event Date:</label>
                    <input
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="images">Upload Images:</label>
                    <input
                        type="file"
                        id="images"
                        name="images"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                    />
                </div>

                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Event'}
                </button>
            </form>
        </div>
    );
};

export default CreateEvent;
