import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import MainNavbar from '../../components/MainNavbar/MainNavbar'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errormessage, setErrormessage] = useState<string | null>(null);

    const handleForm = async () => {
        // Clear messages at the start of every form submit
        setErrormessage(null);


        const auth = getAuth();

        try {
            await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                history.push('/dashboard');
            })
        }
        catch (e: any) {
            setErrormessage(e.message);
        }
    }

    return (
        <div>
            <MainNavbar></MainNavbar>

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
        </div>
    );
}

export default Login;