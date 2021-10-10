import { useState } from 'react';
import { Link } from 'react-router-dom'
import styles from '../Dashboard.module.css';

const Nav = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const clickMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const closeMenu = () => {
        setMenuOpen(false);
    }

    return (
        <div className="col-12 col-lg-2 bg-dark d-flex d-lg-block align-items-center justify-content-start p-1 p-lg-3">
            <div className="d-block d-lg-none">
                <i onClick={clickMenu} className="fas fa-bars text-white fs-4 p-2 btn mx-1"></i>
            </div>

            <Link to="/dashboard" className="d-block text-white text-decoration-none mb-lg-3" href="#"><i className="fas fa-seedling" style={{ color: '#0BD533' }}></i> RepTree</Link>

            <div className="d-none d-lg-block">
                <Link to="/dashboard" className="d-block mb-1 text-decoration-none text-white" aria-current="page"><i className="fas fa-signal pe-2"></i>Dashboard</Link>
                <Link to="/dashboard/all" className="d-block mb-1 text-decoration-none text-white"><i className="fas fa-users pe-2"></i>All Customers</Link>
                <Link to="/dashboard/create-customer" className="d-block mb-1  text-decoration-none text-white"><i className="far fa-plus-square pe-2"></i>Create Customer</Link>
                <Link to="/dashboard/my-brand" className="d-block mb-1 text-decoration-none text-white"><i className="fas fa-star pe-2"></i>My Brand</Link>
                <Link to="/dashboard/settings" className="d-block mb-1  text-decoration-none text-white"><i className="fas fa-cog pe-2"></i>Settings</Link>
            </div>

            {
                menuOpen &&
                <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 47,
                    width: '100%',
                    height: '100%',
                    zIndex: 100
                }} className="bg-dark p-3">
                    <Link onClick={closeMenu} to="/dashboard" className="d-block py-3 border-top border-bottom col-12 mb-1 text-decoration-none text-white" aria-current="page"><i className="fas fa-signal pe-2"></i>Dashboard</Link>
                    <Link onClick={closeMenu} to="/dashboard/all" className="d-block py-3 border-bottom mb-1 text-decoration-none text-white"><i className="fas fa-users pe-2"></i>All Customers</Link>
                    <Link onClick={closeMenu} to="/dashboard/create-customer" className="d-block py-3 border-bottom mb-1 text-decoration-none text-white"><i className="far fa-plus-square pe-2"></i>Create Customer</Link>
                    <Link onClick={closeMenu} to="/dashboard/my-brand" className="d-block py-3 border-bottom mb-1 text-decoration-none text-white"><i className="fas fa-star pe-2"></i>My Brand</Link>
                    <Link onClick={closeMenu} to="/dashboard/settings" className="d-block py-3 border-bottom mb-1 text-decoration-none text-white"><i className="fas fa-cog pe-2"></i>Settings</Link>
                </div>
            }
        </div>
    );
}

export default Nav;