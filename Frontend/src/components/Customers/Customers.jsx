import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CustomerComments = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "John Doe",
      company: "Tech Innovators Inc.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      content: "The product exceeded our expectations. It's intuitive, efficient, and has significantly improved our workflow."
    },
    {
      id: 2,
      name: "Jane Smith",
      company: "Global Solutions Ltd.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      content: "Customer support is top-notch. They were always available to address our concerns and guide us through the implementation process."
    },
    {
      id: 3,
      name: "Mike Johnson",
      company: "Innovative Startups Co.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      content: "The scalability of this solution is impressive. It has grown with our business, adapting to our changing needs seamlessly."
    },
    {
      id: 4,
      name: "Emily Brown",
      company: "Creative Designs LLC",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      content: "The user interface is sleek and modern. It's a joy to use daily, and it has streamlined our design process significantly."
    },
    {
      id: 5,
      name: "Alex Lee",
      company: "Finance Wizards Inc.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      content: "The analytics features have provided invaluable insights for our financial projections. It's been a game-changer for our strategic planning."
    }
  ]);

  const [currentCommentIndex, setCurrentCommentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulating API call to fetch comments
    const fetchComments = async () => {
      try {
        // Simulated delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
      } catch (error) {
        setError("Failed to load comments. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchComments();
  }, []);

  const handleDotClick = (index) => {
    setCurrentCommentIndex(index);
  };

  const handleKeyPress = (event, index) => {
    if (event.key === "Enter" || event.key === " ") {
      handleDotClick(index);
    }
  };

  const currentComment = comments[currentCommentIndex];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div id="customer" className="relative bg-white flex flex-col items-center justify-center p-4">
      <h1 className="text-[48px] font-bold text-[#fc5916] mb-4 mt-5">Ý KIẾN KHÁCH HÀNG</h1>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105">
        <div className="p-8">
          <div className="flex items-center mb-6">
            <img
              src={currentComment.avatar}
              alt={`${currentComment.name}'s avatar`}
              className="rounded-full mr-4 w-20 h-20 object-cover transition-all duration-300 ease-in-out"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{currentComment.name}</h2>
              <p className="text-gray-600">{currentComment.company}</p>
            </div>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">"{currentComment.content}"</p>
        </div>
      </div>

      <div className="flex justify-center mt-6 space-x-2 mb-5">
        {comments.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            onKeyPress={(event) => handleKeyPress(event, index)}
            className={`w-3 h-3 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out ${index === currentCommentIndex ? "bg-blue-500" : "bg-gray-300"}`}
            aria-label={`View comment ${index + 1}`}
            tabIndex="0"
          ></button>
        ))}
      </div>
    </div>
  );
};

export default CustomerComments;
