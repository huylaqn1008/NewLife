import './Events.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Events = () => {
    const [allEvents, setAllEvents] = useState([]); // Tất cả sự kiện
    const [currentIndex, setCurrentIndex] = useState(0); // Chỉ số bắt đầu của slide hiện tại
    const [isPaused, setIsPaused] = useState(false); // Trạng thái tạm dừng slide

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        if (isPaused) return; // Không thiết lập interval khi đang tạm dừng

        const interval = setInterval(() => {
            handleShiftRight();
        }, 5000);

        // Dọn dẹp interval khi component unmount hoặc khi isPaused thay đổi
        return () => clearInterval(interval);
    }, [allEvents, currentIndex, isPaused]);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/event');
            const events = response.data.events;

            // Sắp xếp theo ngày gần hiện tại
            const currentDate = new Date();
            const sortedEvents = events.sort((a, b) => {
                const dateA = new Date(a.eventDate);
                const dateB = new Date(b.eventDate);
                return Math.abs(dateA - currentDate) - Math.abs(dateB - currentDate);
            });

            // Lấy 6 sự kiện đầu tiên
            setAllEvents(sortedEvents.slice(0, 6));
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    // Hàm lấy 5 sự kiện hiện tại dựa trên currentIndex
    const getCurrentEvents = () => {
        if (allEvents.length === 0) return [];

        let current = [];
        for (let i = 0; i < 5; i++) {
            current.push(allEvents[(currentIndex + i) % allEvents.length]);
        }
        return current;
    };

    const currentEvents = getCurrentEvents();

    // Hàm chuyển slide sang trái (hiển thị sự kiện trước đó)
    const handleShiftLeft = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + allEvents.length) % allEvents.length);
    };

    // Hàm chuyển slide sang phải (hiển thị sự kiện tiếp theo)
    const handleShiftRight = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % allEvents.length);
    };

    return (
        <div className='slider-container'>
            <button className='nav-button left-button' onClick={handleShiftLeft}>
                &#8592;
            </button>
            <div className='events'>
                {currentEvents.map((event, index) => {
                    // Xác định lớp dựa trên vị trí
                    let positionClass = '';
                    switch(index) {
                        case 0:
                            positionClass = 'left-small';
                            break;
                        case 1:
                            positionClass = 'left-medium';
                            break;
                        case 2:
                            positionClass = 'center-large';
                            break;
                        case 3:
                            positionClass = 'right-medium';
                            break;
                        case 4:
                            positionClass = 'right-small';
                            break;
                        default:
                            positionClass = '';
                    }

                    const isCenter = index === 2; // Xác định sự kiện ở giữa

                    return (
                        <div
                            key={event._id}
                            className={`event ${positionClass}`}
                            onMouseEnter={isCenter ? () => setIsPaused(true) : undefined}
                            onMouseLeave={isCenter ? () => setIsPaused(false) : undefined}
                        >
                            {event.images.length > 0 ? (
                                <img
                                    src={`http://localhost:4000/${event.images[0]}`}
                                    alt={event.eventName}
                                    loading="lazy"
                                />
                            ) : (
                                <p>No image available</p>
                            )}
                            <div className='event-info'>
                                <h2>{event.eventName}</h2>
                                <p>{event.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <button className='nav-button right-button' onClick={handleShiftRight}>
                &#8594;
            </button>

            {/* Nút xem thêm nằm dưới các sự kiện */}
            <div className='show-more-container'>
                <button className='show-more-button'>
                    Xem thêm
                </button>
            </div>
        </div>
    );
};

export default Events;
