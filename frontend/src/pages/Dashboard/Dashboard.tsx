import styles from './Dashboard.module.css';

import CreateCustomer from './CreateCustomer/CreateCustomer';
import MyBrand from './MyBrand/MyBrand';
import Settings from './Settings/Settings';
import AllCustomers from './AllCustomers/AllCustomers';
import Portal from './Portal/Portal';
import { useEffect } from 'react';
import { useHistory, Route } from 'react-router-dom';
import Nav from './Nav/Nav';
import { auth } from '../../Firebase/config';

const Dashboard = () => {

    const history = useHistory();

    useEffect(() => {
        auth.currentUser?.getIdToken(true).then((idToken) => {
            if (idToken === null) {
                history.push('/');
            }
            else {
                // User is logged in, send a ping to the server
            }
        });
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