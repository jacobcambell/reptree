import axios from "axios";
import { useEffect, useState } from "react";

const Portal = () => {

    const [analytics, setAnalytics] = useState({
        totalCustomers: 0,
        remindersSent: 0,
        remindersOpened: 0
    });

    useEffect(() => {
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/get-analytics', {}, { withCredentials: true })
            .then((res) => {
                setAnalytics(res.data);
            })
    }, []);

    return (

        <div className="row g-0 justify-content-center">
            <h3>Dashboard</h3>

            <div className="card my-1 col-10 col-md-7 col-lg-4 col-xxl-3 mx-lg-2 bg-primary text-light text-center py-3">
                <h6>Number of Customers</h6>
                <h2>{analytics.totalCustomers}</h2>
            </div>
            <div className="card my-1 col-10 col-md-7 col-lg-4 col-xxl-3 mx-lg-2 bg-secondary text-light text-center py-3">
                <h6 className="align-self-center">Reminders Sent</h6>
                <h2>{analytics.remindersSent}</h2>
            </div>
            <div className="card my-1 col-10 col-md-7 col-lg-4 col-xxl-3 mx-lg-2 bg-light text-dark text-center py-3">
                <h6>Reminders Opened</h6>
                <h2>{analytics.remindersOpened}</h2>
            </div>
        </div>

    );
}

export default Portal;