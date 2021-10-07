import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const CreateCustomer = () => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [time, setTime] = useState(0);

    const [successMsg, setSuccessMsg] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const history = useHistory();

    const handleForm = () => {
        setErrorMsg(null);
        setSuccessMsg(null);

        axios.post(process.env.REACT_APP_API_ENDPOINT + '/create-customer', {
            name,
            phone,
            time
        }, { withCredentials: true })
            .then((res) => {
                if (res.data.error) {
                    setErrorMsg(res.data.message);
                }
                else {
                    setSuccessMsg(res.data.message);

                    setTimeout(() => {
                        history.push('/dashboard/all');
                    }, 1500);
                }
            })
    }

    return (
        <div className="container-fluid">
            <h3>Create Customer</h3>

            <div className="row">
                <div className="col col-md-8 col-xl-6 col-xxl-4">
                    <label>Customer's Name</label>
                    <input onChange={(e) => { setName(e.target.value) }} type="text" className="form-control mb-3" />

                    <label>Phone Number</label>
                    <input onChange={(e) => { setPhone(e.target.value) }} type="phone" className="form-control mb-3" />

                    <label>Reminder Time</label>

                    <div className="col-5">
                        <select onChange={(e) => { setTime(e.target.value) }} className="d-block form-select">
                            <option value="0">Now</option>
                            <option value="1">In 1 Hour</option>
                            <option value="3">In 3 Hours</option>
                            <option value="24">In 24 Hours</option>
                            <option value="168">In 1 Week</option>
                        </select>
                    </div>

                    <button onClick={handleForm} className="btn btn-success my-3">Create Customer</button>

                    {
                        successMsg &&
                        <div className="alert alert-success">{successMsg}</div>
                    }
                    {
                        errorMsg &&
                        <div className="alert alert-danger">{errorMsg}</div>
                    }
                </div>
            </div>
        </div>
    );
}

export default CreateCustomer;