import styles from './Dashboard.module.css';

import CreateCustomer from './CreateCustomer';
import MyBrand from './MyBrand';
import Settings from './Settings';
import AllCustomers from './AllCustomers';
import Portal from './Portal';
import { useEffect } from 'react';
import { useHistory, Route, Link } from 'react-router-dom';
import Nav from './Nav';

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
            <Nav></Nav>

            <div className={`${styles.main} col-12 col-lg-10 p-3`}>
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