import { useState } from "react";
import axios from "axios";
import { FiUser, FiMail, FiBriefcase, FiPhone, FiFileText } from "react-icons/fi";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        phone: "",
        title: "",
        content: "",
        files: []
    });

    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone) => /^(03[2-9]|05[2-9]|07[0-9]|08[1-9]|09[0-3|5-9])[0-9]{7}$/.test(phone);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "files") {
            const selectedFiles = Array.from(files);
            const totalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);

            if (totalSize > 2 * 1024 * 1024) {
                alert("Total file size exceeds 2MB.");
                return;
            }
            setFormData({ ...formData, files: selectedFiles });
            return;
        }

        setFormData({ ...formData, [name]: value });

        const newErrors = { ...errors };
        if (name === "email" && value && !validateEmail(value)) {
            newErrors.email = "Vui lòng nhập đúng định dạng email";
        } else if (name === "phone" && value && !validatePhone(value)) {
            newErrors.phone = "Vui lòng nhập đúng định dạng đầu số Việt Nam (e.g., 039, 098)";
        } else {
            delete newErrors[name];
        }
        setErrors(newErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
    
        if (!formData.name) newErrors.name = "Vui lòng nhập Họ và Tên";
        if (!formData.email) newErrors.email = "Vui lòng nhập email của bạn";
        if (formData.email && !validateEmail(formData.email)) newErrors.email = "Vui lòng nhập đúng định dạng email";
        if (!formData.phone) newErrors.phone = "Vui lòng nhập số ddienj thoại của bạn";
        if (formData.phone && !validatePhone(formData.phone)) newErrors.phone = "Vui lòng nhập đúng định dạng đầu số Việt Nam (e.g., 039, 098)";
        if (!formData.content) newErrors.content = "Vui lòng nhập thông tin bạn muốn yêu cầu";
    
        if (Object.keys(newErrors).length === 0) {
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("email", formData.email);
            formDataToSend.append("company", formData.company);
            formDataToSend.append("phone", formData.phone);
            formDataToSend.append("title", formData.title);
            formDataToSend.append("content", formData.content);
            formData.files.forEach((file) => formDataToSend.append("files", file));
    
            try {
                const response = await axios.post("http://localhost:4000/api/send-email", formDataToSend, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                if (response.data.success) {
                    setShowSuccess(true);
                    setFormData({
                        name: "",
                        email: "",
                        company: "",
                        phone: "",
                        title: "",
                        content: "",
                        files: []
                    });
    
                    // Reset file input value after successful submission
                    document.getElementById("files").value = ""; // This will reset the file input field
    
                    setTimeout(() => setShowSuccess(false), 5000);
                }
            } catch (error) {
                console.error("Email send failed:", error);
            }
        } else {
            setErrors(newErrors);
        }
    };    

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-blue-200 flex items-center justify-center p-4 md:p-8">
            <div className="max-w-4xl w-full bg-black text-white rounded-xl shadow-lg p-6 md:p-8">
                <h2 className="text-3xl font-bold text-orange-500 mb-6 text-center">Contact Us</h2>

                {showSuccess && (
                    <div className="mb-6 p-4 bg-blue-500 text-black rounded-lg">
                        Cảm ơn bạn đã gửi thông tin! Chúng tôi sẽ sớm phản hồi bạn.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                                Họ và tên *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiUser className="h-5 w-5 text-blue-400" />
                                </div>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`block w-full pl-10 pr-3 py-2 text-black rounded-lg border ${errors.name ? "border-red-500" : "border-gray-500"} focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                                />
                            </div>
                            {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                                Email *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiMail className="h-5 w-5 text-blue-400" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`block w-full pl-10 pr-3 py-2 text-black rounded-lg border ${errors.email ? "border-red-500" : "border-gray-500"} focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                                />
                            </div>
                            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="company" className="block text-sm font-medium text-white mb-1">
                                Tên công ty
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiBriefcase className="h-5 w-5 text-blue-400" />
                                </div>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-2 text-black rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">
                                Số điện thoại *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiPhone className="h-5 w-5 text-blue-400" />
                                </div>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`block w-full pl-10 pr-3 py-2 text-black rounded-lg border ${errors.phone ? "border-red-500" : "border-gray-500"} focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                                />
                            </div>
                            {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="title" className="block text-sm font-medium text-white mb-1">
                                Tiêu đề
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiFileText className="h-5 w-5 text-blue-400" />
                                </div>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-2 text-black rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="content" className="block text-sm font-medium text-white mb-1">
                                Thông tin yêu cầu *
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                rows="4"
                                className={`block w-full p-3 text-black rounded-lg border ${errors.content ? "border-red-500" : "border-gray-500"} focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                            />
                            {errors.content && <p className="mt-1 text-sm text-red-400">{errors.content}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="files" className="block text-sm font-medium text-white mb-1">
                                Upload Files
                            </label>
                            <input
                                type="file"
                                id="files"
                                name="files"
                                onChange={handleChange}
                                multiple
                                className="block w-full text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 transition duration-300"
                    >
                        Gửi yêu cầu
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
