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
      name: "Kem đánh răng PS",
      logo: PS,
    },
    {
      id: 2,
      name: "Dầu gội Dove",
      logo: Dove,
    },
    {
      id: 3,
      name: "Viettel",
      logo: Viettel,
    },
    {
      id: 4,
      name: "Băng vệ sing Diana",
      logo: Diana,
    },
    {
      id: 5,
      name: "Xe hơi Toyota",
      logo: Toyota,
    },
    {
      id: 6,
      name: "Unilever Group",
      logo: Unilever,
    },
    {
      id: 7,
      name: "Công ty cổ phần Uniben",
      logo: Uniben,
    },
    {
      id: 8,
      name: "Dầu gọi Clear",
      logo: Clear,
    },
    {
      id: 9,
      name: "Công ty TNHH Nestlé Việt Nam",
      logo: Nestle,
    },
    {
      id: 10,
      name: "Ngân hàng tiên phong TPBank",
      logo: TPBank,
    },
    {
      id: 11,
      name: "Bia Carlsberg",
      logo: Carlsberg,
    },
    {
      id: 12,
      name: "Xe hơi Vinfast",
      logo: Vinfast,
    },
    {
      id: 13,
      name: "Xe hơi Mercedes",
      logo: Mercedes,
    },
    {
      id: 14,
      name: "Điện thoại SAMSUNG",
      logo: Samsung,
    },
    {
      id: 15,
      name: "Công ty TNHH Colgate-Palmolive Việt Nam",
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
    <div className="partners-slider-container">
      <h2 className="slider-title">Đối tác</h2>
      <div className="partners-slider" ref={sliderRef}>
        {partners.map((partner) => (
          <div key={partner.id} className="partner-card">
            <img
              src={partner.logo}
              alt={partner.name}
              className="partner-logo"
            />
            <p className="partner-name">{partner.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
