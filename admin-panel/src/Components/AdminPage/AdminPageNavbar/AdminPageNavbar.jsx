import './AdminPageNavbar.css';
import logo from './logo.png';

export function AdminPageNavbar(props) {
    return (
        <nav className="admin-page-navbar">
            <img alt='logo' src={logo}></img>
            <div>
                <a href="/">Admin page</a>
            </div>
        </nav>
    );
}