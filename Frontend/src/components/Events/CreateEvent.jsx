// CreateEvent.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './CreateEvent.css';

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');
    
        if (!formData.eventName || !formData.companyName || !formData.description || !formData.eventDate || images.length === 0) {
            setErrorMessage('Vui lòng điền vào tất cả các trường và tải lên ít nhất một hình ảnh.');
            setLoading(false);
            return;
        }
    
        // Chuyển đổi ngày nếu cần
        const [day, month, year] = formData.eventDate.split('/');
        const formattedDate = `${year}-${month}-${day}`; // Chuyển đổi thành yyyy-mm-dd
    
        try {
            const data = new FormData();
            data.append('eventName', formData.eventName);
            data.append('companyName', formData.companyName);
            data.append('description', formData.description);
            data.append('eventDate', formattedDate); // Sử dụng ngày đã được chuyển đổi
    
            for (let i = 0; i < images.length; i++) {
                data.append('images', images[i]);
            }
    
            const response = await axios.post('http://localhost:4000/api/event/create', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            setSuccessMessage('Sự kiện đã được tạo thành công!');
            
            setFormData({
                eventName: '',
                companyName: '',
                description: '',
                eventDate: '',
            });
            setImages([]);
            
            setTimeout(() => {
                window.location.reload();
            }, 3000);
    
        } catch (error) {
            console.error('Error creating event:', error);
            setErrorMessage(error.response?.data?.message || 'Khởi tạo sự kiện thất bại.');
        } finally {
            setLoading(false);
        }
    };       

    return (
        <div className="create-event-container">
            <h2>Create New Event</h2>
            <form onSubmit={handleSubmit} className="create-event-form">
                <div className="form-group">
                    <label htmlFor="eventName">Tên sự kiện:</label>
                    <input
                        type="text"
                        id="eventName"
                        name="eventName"
                        value={formData.eventName}
                        onChange={handleChange}
                        required
                        minLength={5}
                        placeholder="Nhập tên sự kiện..."
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="companyName">Tên công ty:</label>
                    <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        minLength={5}
                        placeholder="Nhập tên công ty..."
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Mô tả sự kiện:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        minLength={10}
                        placeholder="Nhập mô tả..."
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="eventDate">Ngày tổ chức:</label>
                    <input
                        type="date" // Thay đổi từ "text" sang "date"
                        id="eventDate"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        required
                        placeholder="Nhập ngày tổ chức..."
                        // Không cần pattern và title khi sử dụng type="date"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="images">Tải ảnh lên:</label>
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
                    {loading ? 'Đang tạo...' : 'Tạo sự kiện'}
                </button>
            </form>
        </div>
    );
};

export default CreateEvent;
