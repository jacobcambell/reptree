import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import MainNavbar from '../../components/MainNavbar/MainNavbar'

const Register = () => {

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [companyname, setCompanyname] = useState('');

    const [errormessage, setErrormessage] = useState(null);
    const [successmessage, setSuccessmessage] = useState(null);

    const handleForm = () => {
        // Clear messages at the start of every form submit
        setErrormessage(null);
        setSuccessmessage(null);

        if (
            email.length === 0 ||
            password.length === 0 ||
            cpassword.length === 0 ||
            companyname.length === 0
        ) {
            setErrormessage('Please fill out the entire form');
            return;
        }

        if (password !== cpassword) {
            setErrormessage('Your passwords do not match');
            return;
        }

        axios.post(process.env.REACT_APP_API_ENDPOINT + '/register', {
            email,
            password,
            companyname
        }, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } })
            .then((res) => {
                if (res.data.error) {
                    setErrormessage(res.data.message);
                }
                else {
                    setSuccessmessage('Successfully created an account, redirecting to dashboard');
                    localStorage.setItem('access_token', res.data.access_token);
                    setTimeout(() => {
                        history.push('/dashboard');
                    }, 1500);
                }
            })
    }

    return (
        <div>
            <MainNavbar></MainNavbar>

            <div className="container d-flex justify-content-center">
                <div className="col-10 col-lg-6 my-5">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title mb-3">Sign Up for RepTree</h3>

                            <label>Email Address</label>
                            <input onChange={(e) => { setEmail(e.target.value) }} type="text" className="form-control form-control mb-3"></input>

                            <label>Password</label>
                            <input onChange={(e) => { setPassword(e.target.value) }} type="password" className="form-control form-control mb-3"></input>

                            <label>Confirm Password</label>
                            <input onChange={(e) => { setCpassword(e.target.value) }} type="password" className="form-controller form-control mb-3"></input>

                            <label>Your Company's Name</label>
                            <input onChange={(e) => { setCompanyname(e.target.value) }} type="text" className="form-controller form-control mb-3"></input>

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
                                <div className="col-4">
                                    <button onClick={handleForm} className="btn btn-success">Sign Up</button>
                                </div>
                                <div className="col-8 d-flex align-items-center justify-content-end">
                                    <Link to="/login" className="text-muted">Already have an account?</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;