import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav class="navbar navbar-dark bg-dark">
            <Link to="/" class="navbar-brand mx-3" href="#">RepTree</Link>
            <div className="form-inline mx-3">
                <Link to="/login" className="btn btn-secondary mx-2">Log In</Link>
                <Link to="/register" className="btn btn-success">Register</Link>
            </div>
        </nav>

    );
}

export default Navbar;