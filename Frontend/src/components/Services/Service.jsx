import React from "react";
import "./Service.css";

const services = [
  {
    name: "Sân khấu",
    description:
      "Thiết kế và lắp đặt sân khấu chuyên nghiệp cho các sự kiện, hội nghị và biểu diễn.",
    icon: "🎤",
  },
  {
    name: "Sự kiện",
    description:
      "Tổ chức sự kiện từ quy mô nhỏ đến lớn, bao gồm hội thảo, triển lãm và lễ kỷ niệm.",
    icon: "🎉",
  },
  {
    name: "BackDrop & POSM",
    description:
      "Cung cấp backdrop và các vật phẩm quảng cáo tại điểm bán, giúp nâng cao hiệu quả truyền thông.",
    icon: "🖼️",
  },
  {
    name: "Decor & Mockup",
    description:
      "Trang trí và tạo mẫu mô phỏng không gian, mang đến sự chuyên nghiệp và thu hút cho mọi sự kiện.",
    icon: '🎨',
  },
  {
    name: "Hộp đèn",
    description:
      "Thiết kế và sản xuất hộp đèn quảng cáo sáng tạo, giúp tăng sự nhận diện thương hiệu.",
    icon: "💡",
  },
  {
    name: "Nội thất",
    description:
      "Thiết kế và thi công nội thất hiện đại, tối ưu không gian làm việc và sinh hoạt.",
    icon: "🛋️",
  },
  {
    name: "Nhà tiền chế",
    description:
      "Cung cấp giải pháp nhà tiền chế chất lượng, lắp đặt nhanh chóng và tiết kiệm chi phí.",
    icon: "🏠",
  },
  {
    name: "Khu giải trí",
    description:
      "Thiết kế và xây dựng khu vui chơi, giải trí sáng tạo, đáp ứng mọi nhu cầu của khách hàng.",
    icon: "🎪",
  },
];

const Service = () => {
  return (
    <div id="service" className="service-section">
      <h1 className="service-title">Các dịch vụ</h1>
      <div className="service-container">
        {services.map((service, index) => (
          <div key={index} className="service-box">
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-name">{service.name}</h3>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
