import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo1.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScroll = () => {
    const sections = ["home", "about", "events", "service", "partner", "customer"];
    let currentSection = "home";

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
          currentSection = section;
          break;
        }
      }
    }

    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
    if (nearBottom) {
      currentSection = "customer";
    }

    if (currentSection !== activeSection) {
      setActiveSection(currentSection);
    } else if (window.scrollY === 0) {
      setActiveSection("home"); // Set Trang chủ active at the top of the page
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id) => {
    const scrollToElement = () => {
      const element = document.getElementById(id);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - (window.innerHeight / 2 - element.clientHeight / 2);
  
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    };
  
    if (id === "home") {
      if (location.pathname === "/") {
        // Cuộn lên đầu trang nếu đang ở Trang Chủ và nhấn vào Trang Chủ
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Điều hướng về Trang Chủ nếu ở trang khác
        navigate("/");
      }
      return;
    }
  
    if (location.pathname !== "/") {
      // Nếu không ở trang chủ, điều hướng về trang chủ trước
      navigate("/");
      // Sau khi điều hướng về trang chủ, đợi một chút rồi cuộn đến phần mong muốn
      setTimeout(scrollToElement, 100); // Thời gian chờ có thể điều chỉnh nếu cần
    } else {
      // Nếu đang ở trang chủ, chỉ cần cuộn đến phần mong muốn
      scrollToElement();
    }
  
    setActiveSection(id);
  };  

  useEffect(() => {
    // Scroll to top when location changes
    window.scrollTo({ top: 0, behavior: "auto" });
    
    if (location.pathname === "/contact") {
      setActiveSection("contact");
    } else {
      setActiveSection("home");
    }
  }, [location]);

  return (
    <nav className="w-full bg-[#f1a485] text-white p-4 fixed top-0 left-0 flex items-center justify-between z-10 shadow-md">
      <img src={logo} alt="Logo" className="w-52" />

      <div className="md:hidden flex items-center">
        <button onClick={toggleDropdown} className="focus:outline-none">
          {isOpen ? (
            <FaTimes className="w-8 h-8" />
          ) : (
            <FaBars className="w-8 h-8" />
          )}
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute w-full bg-[#f1a485] left-0 top-full transition-all duration-300 ease-in-out z-10"
          ref={dropdownRef}
        >
          {["home", "about", "events", "service", "partner", "customer"].map((section) => (
            <a
              key={section}
              onClick={() => scrollToSection(section)}
              className={`block hover:bg-[#d58a70] p-2 rounded-md text-2xl transition duration-300 ${
                activeSection === section ? "border-b-2 border-white text-white" : ""
              }`}
            >
              {section === "home"
                ? "Trang chủ"
                : section === "about"
                ? "Thông Tin"
                : section === "events"
                ? "Sự Kiện"
                : section === "service"
                ? "Dịch Vụ"
                : section === "partner"
                ? "Đối Tác"
                : section === "customer"
                ? "Khách Hàng"
                : ""}
            </a>
          ))}
          <Link
            to="/contact"
            className={`block hover:bg-[#d58a70] p-2 rounded-md text-2xl transition duration-300 ${
              activeSection === "contact" ? "border-b-2 border-white text-white" : ""
            }`}
          >
            Liên Hệ
          </Link>
        </div>
      )}

      <div className="hidden md:flex space-x-6 items-center">
        {["home", "about", "events", "service", "partner", "customer"].map((section) => (
          <a
            key={section}
            onClick={() => scrollToSection(section)}
            className={`block hover:bg-[#d58a70] p-2 rounded-md text-2xl transition duration-300 ${
              activeSection === section ? "border-b-2 border-white text-white" : ""
            }`}
          >
            {section === "home"
              ? "Trang chủ"
              : section === "about"
              ? "Thông Tin"
              : section === "events"
              ? "Sự Kiện"
              : section === "service"
              ? "Dịch Vụ"
              : section === "partner"
              ? "Đối Tác"
              : section === "customer"
              ? "Khách Hàng"
              : ""}
          </a>
        ))}
        <Link
          to="/contact"
          className={`bg-white text-[#f1a485] font-bold text-lg px-4 py-2 rounded-md transition-transform transform hover:scale-105 ${
            activeSection === "contact" ? "border-b-2 border-[#f1a485]" : ""
          }`}
        >
          Liên Hệ
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
