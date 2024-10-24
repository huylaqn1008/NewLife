import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/logo1.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const dropdownRef = useRef(null);

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
    const sections = ["home", "about", "events", "service", "partner", "customer", "contact"];
    let currentSection = "home"; // Mặc định là phần "home"
  
    // Tìm phần đang nằm trong vùng nhìn của màn hình
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
  
        // Kiểm tra xem phần tử có nằm trong vùng giữa của viewport không
        if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
          currentSection = section; // Cập nhật phần hiện tại
          break;
        }
      }
    }
  
    // Kiểm tra nếu đã cuộn gần cuối trang thì chọn luôn phần cuối cùng
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
    if (nearBottom) {
      currentSection = "customer"; // Xác định phần cuối cùng là "customer" nếu ở gần cuối
    }
  
    // Cập nhật activeSection chỉ khi nó thay đổi
    if (currentSection !== activeSection) {
      setActiveSection(currentSection);
    }
  };  

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id) => {
    if (id === "home" && activeSection === "home") return; 
    const element = document.getElementById(id);
    if (element) {
      // Tính toán vị trí cuộn sao cho phần tử ở giữa màn hình
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - (window.innerHeight / 2 - element.clientHeight / 2);
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
  
      setActiveSection(id); // Cập nhật activeSection khi cuộn
    }
  };  
  
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
          {["home", "about", "events", "service", "partner", "customer", "contact"].map((section) => (
            <a
              key={section}
              onClick={() => scrollToSection(section)}
              className={`block hover:bg-[#d58a70] p-2 rounded-md text-2xl transition duration-300 ${
                activeSection === section ? "border-b-2 border-white text-white" : ""
              }`}
            >
              {section === "home" ? "Trang chủ" : section === "about" ? "Thông Tin" : section === "events" ? "Sự Kiện" : section === "service" ? "Dịch Vụ" : section === "partner" ? "Đối Tác" : section === "customer" ? "Khách Hàng" : "Liên Hệ"}
            </a>
          ))}
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
            {section === "home" ? "Trang chủ" : section === "about" ? "Thông Tin" : section === "events" ? "Sự Kiện" : section === "service" ? "Dịch Vụ" : section === "partner" ? "Đối Tác" : section === "customer" ? "Khách Hàng" : "Liên Hệ"}
          </a>
        ))}
        <button
          onClick={() => scrollToSection("contact")}
          className={`bg-white text-[#f1a485] font-bold text-lg px-4 py-2 rounded-md transition-transform transform hover:scale-105 ${
            activeSection === "contact" ? "border-b-2 border-[#f1a485]" : ""
          }`}
        >
          Liên hệ
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
