import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Thay đổi biểu tượng ở đây
import logo from '../../assets/logo1.png';

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

    return (
        <nav className="w-full bg-[#f1a485] text-white p-4 fixed top-0 left-0 flex items-center justify-between z-10 shadow-md">
            <img src={logo} alt="Logo" className="w-52" />

            {/* Icon để mở menu trên thiết bị di động */}
            <div className="md:hidden flex items-center">
                <button onClick={toggleDropdown} className="focus:outline-none">
                    {isOpen ? (
                        <FaTimes className="w-8 h-8" /> // Biểu tượng đóng
                    ) : (
                        <FaBars className="w-8 h-8" /> // Biểu tượng mở
                    )}
                </button>
            </div>

            {/* Danh sách menu, chỉ hiển thị trên thiết bị di động */}
            {isOpen && (
                <div className="absolute w-full bg-[#f1a485] left-0 top-full transition-all duration-300 ease-in-out z-10" ref={dropdownRef}>
                    <a className="block hover:bg-[#d58a70] p-2 rounded-md text-2xl transition duration-300" href="#">Trang chủ</a>
                    <a className="block hover:bg-[#d58a70] p-2 rounded-md text-2xl transition duration-300" href="#">Thông tin</a>
                    <a className="block hover:bg-[#d58a70] p-2 rounded-md text-2xl transition duration-300" href="#">Sự kiện</a>
                    <a className="block hover:bg-[#d58a70] p-2 rounded-md text-2xl transition duration-300" href="#">Dịch vụ</a>
                    <a className="block hover:bg-[#d58a70] p-2 rounded-md text-2xl transition duration-300" href="#">Phản hồi của khách hàng</a>
                    <div className="border-t border-gray-200 my-2"></div>
                    <a className="block hover:bg-[#d58a70] p-2 rounded-md text-2xl transition duration-300 text-white" href="#">Liên hệ</a>
                </div>
            )}

            {/* Danh sách menu trên thiết bị lớn */}
            <div className="hidden md:flex space-x-6 items-center">
                <a className="block hover:bg-[#d58a70] p-2 rounded-md text-2xl transition duration-300" href="#">Trang chủ</a>
                <a className="block hover:bg-[#d58a70] p-2 rounded-md text-2xl transition duration-300" href="#">Thông tin</a>
                <a className="block hover:bg-[#d58a70] p-2 rounded-md text-2xl transition duration-300" href="#">Sự kiện</a>
                <a className="block hover:bg-[#d58a70] p-2 rounded-md text-2xl transition duration-300" href="#">Dịch vụ</a>
                <a className="block hover:bg-[#d58a70] p-2 rounded-md text-2xl transition duration-300" href="#">Phản hồi của khách hàng</a>
                <button className="bg-white text-[#f1a485] font-bold text-lg px-4 py-2 rounded-md transition-transform transform hover:scale-105">
                    Liên hệ
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
