import React from "react";
import { FaFacebookF, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Logo from "../../assets/logo.jpg"

const Footer = () => {
    const services = ["In Ấn", "Tổ Chức Sự Kiện", "Xây Dựng Nhà",
        "Lắp Đặt Hệ Thống", "Lắp Đặt Sân Khấu", "Quảng Cáo", "Dựng Booth",
        "Cho thuê máy móc, thiết bị, đồ dùng cá nhân và gia đình", "Gia công hộp đèn", "Các yêu cầu khác ..."];

    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <img
                            src={Logo}
                            alt="Company Logo"
                            className="h-12 w-auto"
                        />
                        <h2 className="text-xl font-bold">CÔNG TY TNHH SÂN KHẤU VÀ QUẢNG CÁO NEW LIFE PRODUCTION</h2>
                        <p className="text-sm text-gray-400">Tổ chức các sự kiện và dựng các sân khấu từ năm 2019.</p>
                        <div className="flex flex-row">
                            <p className="text-sm font-bold">Mã số thuế:</p>
                            <p className="text-sm ml-2">0315904217</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Liên Hệ</h3>
                        <div className="flex items-center space-x-2">
                            <FaPhoneAlt className="text-blue-400" />
                            <span>+84 (0) 938 588 980</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaEnvelope className="text-blue-400" />
                            <span>dangnhung.newlife@gmail.com</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaMapMarkerAlt className="text-blue-400" />
                            <span>432A Đường Liên Ấp 4-5, Ấp 5, Xã Đa Phước, Huyện Bình Chánh, Thành phố Hồ Chí Minh, Việt Nam</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Dịch vụ</h3>
                        <ul className="space-y-2">
                            {services.map((service, index) => (
                                <li key={index} className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
                                    {service}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Thông tin</h3>
                        <div className="h-48 w-full rounded-lg overflow-hidden shadow-lg">
                            <iframe
                                title="Google Maps"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245.04917723267673!2d106.63920571338934!3d10.673647347080628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317531a07603456d%3A0x5df09fe4c52025a!2zRmFybSAmIENvZmZlZSBCYSBDaMawxqFuZw!5e0!3m2!1svi!2s!4v1729658912686!5m2!1svi!2s"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                        <a
                            href="https://www.facebook.com/people/NewLife-Production/100051976998221/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 flex items-center space-x-2"
                        >
                            <FaFacebookF />
                            <span>Follow us on Facebook</span>
                        </a>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-800 text-center">
                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} CÔNG TY TNHH SÂN KHẤU VÀ QUẢNG CÁO NEW LIFE PRODUCTION. HÂN HẠNH ĐƯỢC PHỤC VỤ.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;