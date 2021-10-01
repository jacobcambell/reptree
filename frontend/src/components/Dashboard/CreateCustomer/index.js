import { useState } from "react";
import axios from "axios";

const CreateCustomer = () => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [time, setTime] = useState(1);

    const handleForm = () => {
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/create-customer', {
            name,
            phone,
            time
        }, { withCredentials: true })
            .then((res) => {
                console.log(res.data)
            })
    }

    return (
        <div>
            <h3>Create Customer</h3>

            <div className="row">
                <div className="col col-lg-8">
                    <label>Customer's Name</label>
                    <input onChange={(e) => { setName(e.target.value) }} type="text" className="form-control mb-3" />

                    <label>Phone Number</label>
                    <input onChange={(e) => { setPhone(e.target.value) }} type="phone" className="form-control mb-3" />

                    <label>Reminder Time</label>

                    <div className="col-5">
                        <select onChange={(e) => { setTime(e.target.value) }} className="d-block form-select">
                            <option value="1">In 1 Hour</option>
                            <option value="3">In 3 Hours</option>
                            <option value="24">In 24 Hours</option>
                            <option value="168">In 1 Week</option>
                        </select>
                    </div>

                    <button onClick={handleForm} className="btn btn-success my-3">Create Customer</button>
                </div>
            </div>
        </div>
    );
}

export default CreateCustomer;