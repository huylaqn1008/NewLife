import React, { useState, useRef, useEffect } from "react";
import "./Partners.css"; // Đảm bảo bạn đã tạo tệp này

import PS from "../../assets/PS.png";
import Dove from "../../assets/Dove.png";
import Viettel from "../../assets/Viettel.png";
import Diana from "../../assets/Diana.png";
import Toyota from "../../assets/Toyota.png";
import Unilever from "../../assets/Unilever.png";
import Uniben from "../../assets/Uniben.png";
import Clear from "../../assets/Clear.png";
import Nestle from "../../assets/Nestle.png";
import TPBank from "../../assets/TPBank.png";
import Carlsberg from "../../assets/Carlsberg.png";
import Vinfast from "../../assets/Vinfast.png";
import Mercedes from "../../assets/Mercedes.png";
import Samsung from "../../assets/Samsung.png";
import Colgate from "../../assets/Colgate.png";

const Partners = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const partners = [
    {
      id: 1,
      logo: PS,
    },
    {
      id: 2,
      logo: Dove,
    },
    {
      id: 3,
      logo: Viettel,
    },
    {
      id: 4,
      logo: Diana,
    },
    {
      id: 5,
      logo: Toyota,
    },
    {
      id: 6,
      logo: Unilever,
    },
    {
      id: 7,
      logo: Uniben,
    },
    {
      id: 8,
      logo: Clear,
    },
    {
      id: 9,
      logo: Nestle,
    },
    {
      id: 10,
      logo: TPBank,
    },
    {
      id: 11,
      logo: Carlsberg,
    },
    {
      id: 12,
      logo: Vinfast,
    },
    {
      id: 13,
      logo: Mercedes,
    },
    {
      id: 14,
      logo: Samsung,
    },
    {
      id: 15,
      logo: Colgate,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === partners.length - 5 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.style.transform = `translateX(-${currentIndex * 20}%)`;
    }
  }, [currentIndex]);

  return (
    <div id="partner" className="partners-slider-container">
      <h2 className="slider-title">Đối tác</h2>
      <div className="partners-slider" ref={sliderRef}>
        {partners.map((partner) => (
          <div key={partner.id} className="partner-card">
            <img
              src={partner.logo}
              alt={`Logo ${partner.id}`}
              className="partner-logo"
            />
            {/* Đã xóa phần hiển thị tên */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
