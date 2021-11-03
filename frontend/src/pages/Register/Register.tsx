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

    const [errormessage, setErrormessage] = useState<string | null>(null);

    const handleForm = async () => {
        setErrormessage(null);

        if (password !== cpassword) {
            setErrormessage('Your passwords do not match');
            return;
        }

        axios.post(`${process.env.REACT_APP_API_ENDPOINT}/register`, {
            email,
            password,
            companyname
        }).then((res) => {
            console.log(res.data)
            if (res.data.error) {
                setErrormessage(res.data.message)
                return;
            }

            localStorage.setItem('access_token', res.data.access_token)
            history.push('/dashboard')
        })
            .catch(() => { })
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