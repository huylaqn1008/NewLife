import arrowright from '../../assets/arrow-right.png';
import backgroundImg from '../../assets/img1.jpg'; // Nhập ảnh nền

const Body = () => {
    return (
        <div 
            className="relative min-h-screen bg-cover bg-center text-white" 
            style={{ backgroundImage: `url(${backgroundImg})` }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center max-w-2xl p-8">
                    <h1 className="text-6xl font-semibold">Chào mừng quý khách đã đến với công ty tổ chức sự kiện NewLife</h1>
                    <p className="max-w-xl mx-auto my-4 text-lg leading-6">
                        Đến với công ty chúng tôi bạn sẽ có được 1 sự kiện tuyệt vời với những
                        phong cách khác biệt, chúng tôi có thể dựng bất kỳ mô phỏng nào mà khách
                        hàng yêu cầu.
                    </p>
                    <div className="flex justify-center">
                        <button className="flex items-center text-[#fff] bg-[#f1a485] font-bold text-sm px-4 py-2 rounded-2xl hover:shadow-md transition-all duration-300">
                            <p className='text-2xl'>Chi tiết</p> <img src={arrowright} alt="" className="ml-4 h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Body;
