import './Events.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Events = () => {
    const [eventData, setEventData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 6; // Số sự kiện mỗi trang

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/event');
            const events = response.data.events;
    
            // Lấy ngày hiện tại
            const currentDate = new Date();
    
            // Sắp xếp các sự kiện theo ngày gần với ngày hiện tại nhất
            const sortedEvents = events.sort((a, b) => {
                const dateA = new Date(a.eventDate); // Chuyển đổi chuỗi ngày thành đối tượng Date
                const dateB = new Date(b.eventDate);
                return Math.abs(dateA - currentDate) - Math.abs(dateB - currentDate); // Sắp xếp theo khoảng cách đến ngày hiện tại
            });
    
            setEventData(sortedEvents);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };    

    // Tính toán các sự kiện cho trang hiện tại
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = eventData.slice(indexOfFirstEvent, indexOfLastEvent);

    // Tính toán tổng số trang
    const totalPages = Math.ceil(eventData.length / eventsPerPage);

    return (
        <div className='events'>
            {currentEvents.map(event => (
                <div key={event._id} className='event'>
                    {event.images.length > 0 ? (
                        <img 
                            src={`http://localhost:4000/${event.images[0]}`} 
                            alt={event.eventName} 
                        />
                    ) : (
                        <p>No image available</p>
                    )}
                    <div className='event-info'>
                        <h2>{event.eventName}</h2>
                        <p>{event.description}</p> 
                    </div>
                </div>
            ))}
            <div className='pagination-container'>
                <div className='pagination'>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={currentPage === index + 1 ? 'active' : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Events;
