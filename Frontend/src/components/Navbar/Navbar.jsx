import './Navbar.css'
import logo from '../../assets/logo1.png'

const Navbar = () => {
    return (
        <nav className='container'>
            <img src={logo} alt='' className='logo' />
            <ul>
                <li>Trang chủ</li>
                <li>Thông tin</li>
                <li>Các sự kiện</li>
                <li>Phản hổi của khách hàng</li>
                <li>
                    <button className='btn'>Liên hệ</button>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar