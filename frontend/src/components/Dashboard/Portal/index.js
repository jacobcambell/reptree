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
        <div>
            <h3>Dashboard</h3>

            <div className="row">
                <div className="card col mx-4 align-items-center bg-primary text-light p-2">
                    <h6>Number of Customers</h6>
                    <h2>{analytics.totalCustomers}</h2>
                </div>
                <div className="card col mx-4 align-items-center bg-secondary text-light p-2">
                    <h6 className="align-self-center">Reminders Sent</h6>
                    <h2>{analytics.remindersSent}</h2>
                </div>
                <div className="card col mx-4 align-items-center bg-light text-dark p-2">
                    <h6>Reminders Opened</h6>
                    <h2>{analytics.remindersOpened}</h2>
                </div>
            </div>
        </div>
    );
}

export default Portal;