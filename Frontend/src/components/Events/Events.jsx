import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../../../tailwind.css";

const Card = ({ image, name, description }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out w-64 h-80 transform hover:scale-105`}
      style={{ aspectRatio: "3/4" }}
    >
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-white text-lg font-semibold mb-1">{name}</h3>
        <p className="text-white text-sm">{description}</p>
      </div>
    </div>
  );
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // Lấy dữ liệu sự kiện từ backend
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/event");
        setEvents(response.data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === events.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Chuyển đổi sau mỗi 5 giây

    return () => clearInterval(intervalId);
  }, [events]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === events.length - 1 ? 0 : prevIndex + 1
    );
  };

  const getVisibleCards = () => {
    if (isSmallScreen) {
      return events[currentIndex] ? [events[currentIndex]] : [];
    }
    const visibleCards = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + events.length) % events.length;
      if (
        events[index] &&
        events[index].images &&
        events[index].images.length > 0
      ) {
        visibleCards.push(events[index]);
      }
    }
    return visibleCards;
  };

  return (
    <div className="relative w-full mx-auto px-4 py-8">
      <div className="flex items-center justify-center space-x-4 overflow-hidden">
        {getVisibleCards().map((event) => (
          <Card
            key={event._id} // Sử dụng _id từ MongoDB
            image={
              event.images && event.images.length > 0
                ? `http://localhost:4000/${event.images[0]}`
                : ""
            }
            // Đường dẫn hình ảnh đầu tiên
            name={event.eventName}
            description={event.description}
          />
        ))}
      </div>
      <button
        onClick={handlePrev}
        className="absolute left-10 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        aria-label="Previous card"
      >
        <FaChevronLeft className="text-gray-800 text-2xl" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-10 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        aria-label="Next card"
      >
        <FaChevronRight className="text-gray-800 text-2xl" />
      </button>
    </div>
  );
};

export default Events;
