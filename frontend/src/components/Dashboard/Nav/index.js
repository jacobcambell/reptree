import { Link } from 'react-router-dom'
import styles from '../Dashboard.module.css';

const Nav = () => {
    return (
        <div className={`${styles.nav} d-none d-xxl-block navbar-dark bg-dark col-12 col-xxl-2`}>
            <Link className="d-table navbar-brand px-3 py-3" to="/dashboard">RepTree</Link>

            <ul className="nav nav-pills flex-column">
                <Link to="/dashboard" className="nav-link text-white" aria-current="page"><i className="fas fa-signal pe-2"></i>Dashboard</Link>
                <Link to="/dashboard/all" className="nav-link text-white"><i className="fas fa-users pe-2"></i>All Customers</Link>
                <Link to="/dashboard/create-customer" className="nav-link text-white"><i className="far fa-plus-square pe-2"></i>Create Customer</Link>
                <Link to="/dashboard/my-brand" className="nav-link text-white"><i className="fas fa-star pe-2"></i>My Brand</Link>
                <Link to="/dashboard/settings" className="nav-link text-white"><i className="fas fa-cog pe-2"></i>Settings</Link>
            </ul>
        </div>
    );
}

export default Nav;