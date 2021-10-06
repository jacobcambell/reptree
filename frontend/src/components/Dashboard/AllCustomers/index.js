import axios from "axios";
import { useEffect, useState } from "react";

const AllCustomers = () => {

    // Array of objects with properties:
    // name, phone, time, reminder_sent
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        getCustomers();
    }, []);

    const handleCancel = (id) => {
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/cancel-customer', {
            id
        }, { withCredentials: true })
            .then(res => {
                getCustomers();
            })
    }

    const getCustomers = () => {
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/get-my-customers',
            {},
            { withCredentials: true })
            .then(res => {
                setCustomers(res.data);
            })
    }

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
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {
                        customers &&
                        customers.map((customer, i) => (
                            <tr key={i}>
                                <td>{customer.name}</td>
                                <td>{customer.phone}</td>

                                {
                                    customer.reminder_sent ?
                                        <td></td> :
                                        <td>{(customer.time > 60) ? `${Math.round(customer.time / 60)} Hours` : `${customer.time} Minutes`}</td>
                                }

                                <td>{customer.reminder_sent ? `Sent` : `Not Sent`}</td>

                                {
                                    customer.reminder_sent ?
                                        <td></td> :
                                        <td><button onClick={() => { handleCancel(customer.id) }} className="btn btn-danger">Cancel</button></td>
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default AllCustomers;