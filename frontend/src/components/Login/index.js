import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Login = () => {

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errormessage, setErrormessage] = useState(null);
    const [successmessage, setSuccessmessage] = useState(null);

    const handleForm = () => {
        // Clear messages at the start of every form submit
        setErrormessage(null);
        setSuccessmessage(null);

        if (
            email.length === 0 ||
            password.length === 0
        ) {
            setErrormessage('Please fill out the entire form');
            return;
        }

        axios.post(process.env.REACT_APP_API_ENDPOINT + '/login', {
            email,
            password
        }, { withCredentials: true })
            .then((res) => {
                if (res.data.error) {
                    setErrormessage(res.data.message);
                }
                else {
                    setSuccessmessage('Successfully logged in, redirecting...');
                    sessionStorage.setItem('logged_in', 'true');

                    setTimeout(() => {
                        history.push('/dashboard');
                    }, 1500);
                }
            })
    }

    return (
        <div className="container d-flex justify-content-center">
            <div className="col-10 col-lg-6 my-5">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title mb-3">Login</h3>

                        <label>Email Address</label>
                        <input onChange={(e) => { setEmail(e.target.value) }} type="text" className="form-control mb-3"></input>

                        <label>Password</label>
                        <input onChange={(e) => { setPassword(e.target.value) }} type="password" className="form-control mb-3"></input>

                        {
                            (errormessage !== null) &&
                            <div className="alert alert-danger" role="alert">
                                {errormessage}
                            </div>
                        }
                        {
                            (successmessage !== null) &&
                            <div className="alert alert-success" role="alert">
                                {successmessage}
                            </div>
                        }

                        <div className="row">
                            <div className="col-2">
                                <button onClick={handleForm} className="btn btn-success">Login</button>
                            </div>
                            <div className="col-10 align-items-center d-flex justify-content-end">
                                <Link to="/register" className="text-muted">New to RepTree?</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;