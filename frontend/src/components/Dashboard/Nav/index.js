import { Link } from 'react-router-dom'
import styles from '../Dashboard.module.css';

const Nav = () => {

    const clickMenu = () => {
        alert();
    }

    return (
        <div className={`${styles.nav} navbar-dark bg-dark py-1`}>
            <i onClick={clickMenu} className="fas fa-bars text-white fs-4 p-2 btn mx-1"></i>
            <Link to="/dashboard" className="text-white text-decoration-none mx-3" href="#"><i className="fas fa-seedling" style={{ color: '#0BD533' }}></i> RepTree</Link>

            <div className="row g-0">
                <div className="col-2 d-none">
                    <Link className="d-inline-block" to="/dashboard">RepTree</Link>
                </div>
                <div className="col-10 d-none">
                    <Link to="/dashboard" className="p-3 text-decoration-none text-white" aria-current="page"><i className="fas fa-signal pe-2"></i>Dashboard</Link>
                    <Link to="/dashboard/all" className="text-decoration-none text-white"><i className="fas fa-users pe-2"></i>All Customers</Link>
                    <Link to="/dashboard/create-customer" className="text-decoration-none text-white"><i className="far fa-plus-square pe-2"></i>Create Customer</Link>
                    <Link to="/dashboard/my-brand" className="text-decoration-none text-white"><i className="fas fa-star pe-2"></i>My Brand</Link>
                    <Link to="/dashboard/settings" className="text-decoration-none text-white"><i className="fas fa-cog pe-2"></i>Settings</Link>
                </div>
            </div>


        </div>
    );
}

export default Nav;