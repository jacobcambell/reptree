import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    return (
        <div>
            <div className={`${styles.nav} d-flex flex-column navbar-dark bg-dark p-3`}>
                <Link className="navbar-brand mb-3" to="/dashboard">RepTree</Link>

                <ul class="nav nav-pills flex-column">
                    <li class="nav-item">
                        <Link to="/dashboard" class="nav-link active" aria-current="page"><i class="fas fa-signal"></i>Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/dashboard/all" class="nav-link text-white"><i class="fas fa-users"></i>All Customers</Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/dashboard/create-customer" class="nav-link text-white"><i class="far fa-plus-square"></i>Create Customer</Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/dashboard/my-brand" class="nav-link text-white"><i class="fas fa-star"></i>My Brand</Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/dashboard/settings" class="nav-link text-white"><i class="fas fa-cog"></i>Settings</Link>
                    </li>
                </ul>
            </div>
            <div className={styles.main}>

            </div>
        </div>
    );
}

export default Dashboard;