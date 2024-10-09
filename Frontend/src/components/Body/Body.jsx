import './Body.css'
import arrowright from '../../assets/arrow-right.png'

const Body = () => {
    return (
        <div className='body container'>
            <div className='body-text'>
                <h1>Chào mừng quý khách đã đến với công ty tổ chức sự kiện NewLife</h1>
                <p>Đến với công ty chúng tôi bạn sẽ có được 1 sự kiện tuyệt vời với những
                    phong cách khác biệt, chúng tôi có thể dựng bất kỳ mô phỏng nào mà khách
                    hàng yêu cầu.
                </p>
                <button className='btn'>Chi tiết <img src={arrowright} alt='' /></button>
            </div>
        </div>
    )
}

export default Body