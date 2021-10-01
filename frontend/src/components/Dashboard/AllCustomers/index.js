import axios from "axios";
import { useEffect, useState } from "react";

const AllCustomers = () => {

    // Array of objects with properties:
    // name, phone, time, reminder_sent
    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/get-my-customers',
            {},
            { withCredentials: true })
            .then(res => {
                setCustomers(res.data);
            })
    }, []);

    return (
        <div>
            <h3>All Customers</h3>

            <table className="table">
                <thead>
                    <tr className="fw-bold">
                        <td>Name</td>
                        <td>Phone</td>
                        <td>Remind In</td>
                        <td>Reminder Sent?</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        customers &&
                        customers.map((customer, i) => (
                            <tr key={i}>
                                <td>{customer.name}</td>
                                <td>{customer.phone}</td>
                                <td>{customer.time} Minutes</td>
                                <td>{customer.reminder_sent ? `Sent` : `Not Sent`}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default AllCustomers;