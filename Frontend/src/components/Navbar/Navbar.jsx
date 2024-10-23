import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/logo1.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Hàm để cuộn đến phần tử có id tương ứng
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="w-full bg-[#f1a485] text-white p-4 fixed top-0 left-0 flex items-center justify-between z-10 shadow-md">
      <img src={logo} alt="Logo" className="w-52" />

      {/* Icon để mở menu trên thiết bị di động */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleDropdown} className="focus:outline-none">
          {isOpen ? (
            <FaTimes className="w-8 h-8" />
          ) : (
            <FaBars className="w-8 h-8" />
          )}
        </button>
      </div>

      {/* Danh sách menu, chỉ hiển thị trên thiết bị di động */}
      {isOpen && (
        <div
          className="absolute w-full bg-[#f1a485] left-0 top-full transition-all duration-300 ease-in-out z-10"
          ref={dropdownRef}
        >
          <a
            onClick={() => scrollToSection("home")}
            className="block hover:bg-[#d58a70] p-2 rounded-md text-2xl transition duration-300"
          >
            Trang chủ
          </a>
          <a
            onClick={() => scrollToSection("about")}
            className="block hover:bg-[#d58a70] p-2 rounded-md text-2xl transition duration-300"
          >
            Thông tin
          </a>
          <a
            onClick={() => scrollToSection("events")}
            className="block hover:bg-[#d58a70] p-2 rounded-md text-2xl transition duration-300"
          >
            Sự kiện
          </a>
          <a
            onClick={() => scrollToSection("service")}
            className="block hover:bg-[#d58a70] p-2 rounded-md text-2xl transition duration-300"
          >
            Dịch vụ
          </a>
          <a
            onClick={() => scrollToSection("partner")}
            className="block hover:bg-[#d58a70] p-2 rounded-md text-2xl transition duration-300"
          >
            Đối tác
          </a>
          <a
            onClick={() => scrollToSection("customer")}
            className="block hover:bg-[#d58a70] p-2 rounded-md text-2xl transition duration-300"
          >
            Khách hàng
          </a>
          <div className="border-t border-gray-200 my-2"></div>
          <a
            onClick={() => scrollToSection("contact")}
            className="block hover:bg-[#d58a70] p-2 rounded-md text-2xl transition duration-300 text-white"
          >
            Liên hệ
          </a>
        </div>
      )}

      {/* Danh sách menu trên thiết bị lớn */}
      <div className="hidden md:flex space-x-6 items-center">
        <a
          onClick={() => scrollToSection("home")}
          className="block hover:bg-[#d58a70] p-2 rounded-md text-2xl transition duration-300"
        >
          Trang chủ
        </a>
        <a
          onClick={() => scrollToSection("about")}
          className="block hover:bg-[#d58a70] p-2 rounded-md text-2xl transition duration-300"
        >
          Thông tin
        </a>
        <a
          onClick={() => scrollToSection("events")}
          className="block hover:bg-[#d58a70] p-2 rounded-md text-2xl transition duration-300"
        >
          Sự kiện
        </a>
        <a
          onClick={() => scrollToSection("service")}
          className="block hover:bg-[#d58a70] p-2 rounded-md text-2xl transition duration-300"
        >
          Dịch vụ
        </a>
        <a
          onClick={() => scrollToSection("partner")}
          className="block hover:bg-[#d58a70] p-2 rounded-md text-2xl transition duration-300"
        >
          Đối tác
        </a>
        <a
          onClick={() => scrollToSection("customer")}
          className="block hover:bg-[#d58a70] p-2 rounded-md text-2xl transition duration-300"
        >
          Khách hàng
        </a>
        <button
          onClick={() => scrollToSection("contact")}
          className="bg-white text-[#f1a485] font-bold text-lg px-4 py-2 rounded-md transition-transform transform hover:scale-105"
        >
          Liên hệ
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
