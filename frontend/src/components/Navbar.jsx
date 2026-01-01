import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const location = useLocation();
    const pathname = location.pathname;
    const [user, setUser] = useState(null);


    useEffect(() => {
        const updateUser = () => {
            const userData = localStorage.getItem('mm_user');
            if (userData) setUser(JSON.parse(userData));
            else setUser(null);
        };
        updateUser();

        window.addEventListener('storage', updateUser);
        window.addEventListener('focus', updateUser);

        return () => {
            window.removeEventListener('storage', updateUser);
            window.removeEventListener('focus', updateUser);
        };
    }, []);

    if (pathname === "/login" || pathname === "/signup") return null;
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-logo" style={{ display: 'flex', alignItems: 'center', height: '54px', paddingRight: '1.2rem' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src="/mm-logo3.png"
                            alt="MM Lawsite Logo"
                            style={{ height: '44px', width: 'auto', objectFit: 'contain', display: 'block' }}
                        />
                    </Link>
                </div>

                <div className="navbar-tabs">
                    <Link to="/" className={(pathname === '/') ? 'navbar-tab active' : 'navbar-tab'}>Home</Link>

                    <Link to="/about" className={(pathname === '/about' || pathname.startsWith('/about/')) ? 'navbar-tab active' : 'navbar-tab'}>About Us </Link>

                    <Link to="/documents" className={(pathname === '/documents' || pathname.startsWith('/documents/')) ? 'navbar-tab active' : 'navbar-tab'}>Documents</Link>
                </div>

                <div className="navbar-auth-action">
                    <button
                        className="navbar-auth-btn"
                        onClick={() => {
                            const current = location.pathname;
                            const target = current === "/login" ? "/signup" : "/login";
                            window.history.pushState({}, "", target);
                            window.dispatchEvent(new PopStateEvent("popstate"));
                        }}
                    >
                        {pathname === "/login" ? "Sign Up" : "Login or Signup"}
                    </button>
                </div>

            </div>
        </nav>
    );
}
