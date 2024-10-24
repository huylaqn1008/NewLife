import React from "react";
import { FaPhone } from "react-icons/fa";
import zaloIcon from "../../assets/Zalo.png"; // Đường dẫn đến hình ảnh icon Zalo

const ContactButtons = () => {
    const handlePhoneClick = () => {
        window.open("tel:0938588980"); // Thay đổi số điện thoại thành số của bạn
    };

    const handleZaloClick = () => {
        window.open("https://zalo.me/0938588980"); // Thay đổi đường dẫn Zalo
    };

    return (
        <div className="fixed bottom-4 left-4 flex flex-col space-y-2">
            <button
                onClick={handlePhoneClick}
                className="p-4 bg-blue-500 text-white rounded-full shadow-md shake"
                aria-label="Gọi điện"
            >
                <FaPhone size={30} />
            </button>
            <button
                onClick={handleZaloClick}
                className="p-4 bg-green-500 text-white rounded-full shadow-md shake"
                aria-label="Zalo"
            >
                <img src={zaloIcon} alt="Zalo" className="w-8 h-8" />
            </button>
        </div>
    );
};

export default ContactButtons;
