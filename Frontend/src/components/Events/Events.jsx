import './Events.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Events = () => {
    const [eventData, setEventData] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/event');
            setEventData(response.data.events);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    return (
        <div className='events'>
            {eventData.map(event => (
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
        </div>
    );
};

export default Events;
