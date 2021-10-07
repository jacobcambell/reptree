import styles from './Dashboard.module.css';

import CreateCustomer from './CreateCustomer';
import MyBrand from './MyBrand';
import Settings from './Settings';
import AllCustomers from './AllCustomers';
import Portal from './Portal';
import { useEffect } from 'react';
import { useHistory, Route, Link } from 'react-router-dom';

const Dashboard = () => {

    const history = useHistory();

    useEffect(() => {
        // Check if user has logged in status saved to their session
        if (sessionStorage.getItem('logged_in') === null) {
            history.push('/login');
        }
    });

    return (
        <div className="row g-0">
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
            <div className={`${styles.main} col-12 col-xxl p-3`}>
                <Route exact path="/dashboard">
                    <Portal></Portal>
                </Route>
                <Route path="/dashboard/all">
                    <AllCustomers></AllCustomers>
                </Route>
                <Route path="/dashboard/create-customer">
                    <CreateCustomer></CreateCustomer>
                </Route>
                <Route path="/dashboard/my-brand">
                    <MyBrand></MyBrand>
                </Route>
                <Route path="/dashboard/settings">
                    <Settings></Settings>
                </Route>
            </div>
        </div >
    );
}

export default Dashboard;