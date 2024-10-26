import { useState } from "react";
import { FiUser, FiMail, FiBriefcase, FiPhone, FiFileText } from "react-icons/fi";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        phone: "",
        title: "",
        content: ""
    });

    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePhone = (phone) => {
        const re = /^(03[2-9]|05[2-9]|07[0-9]|08[1-9]|09[0-3|5-9])[0-9]{7}$/; // Regex cho các đầu số điện thoại Việt Nam
        return re.test(phone);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        const newErrors = { ...errors };
        if (name === "email" && value && !validateEmail(value)) {
            newErrors.email = "Please enter a valid email address";
        } else if (name === "phone" && value && !validatePhone(value)) {
            newErrors.phone = "Please enter a valid phone number (e.g., 039, 098)";
        } else {
            delete newErrors[name];
        }
        setErrors(newErrors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!validateEmail(formData.email)) newErrors.email = "Please enter a valid email address";
        if (!formData.phone) newErrors.phone = "Phone is required"; // Yêu cầu số điện thoại
        if (formData.phone && !validatePhone(formData.phone)) newErrors.phone = "Please enter a valid phone number (e.g., 039, 098)";
        if (!formData.content) newErrors.content = "Message is required";

        if (Object.keys(newErrors).length === 0) {
            setShowSuccess(true);
            setFormData({
                name: "",
                email: "",
                company: "",
                phone: "",
                title: "",
                content: ""
            });
            setTimeout(() => setShowSuccess(false), 5000);
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
                        Thank you for your message! We'll get back to you soon.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                                Name *
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
                                Company
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
                                Phone *
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
                                Title
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
                                Message *
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                rows="4"
                                className={`block w-full px-3 py-2 text-black rounded-lg border ${errors.content ? "border-red-500" : "border-gray-500"} focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                            />
                            {errors.content && <p className="mt-1 text-sm text-red-400">{errors.content}</p>}
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-8 py-3 bg-orange-500 text-black font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transform transition duration-150 ease-in-out hover:scale-105"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactForm
