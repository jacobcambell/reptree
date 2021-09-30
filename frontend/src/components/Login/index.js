import styles from './Login.module.css';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div>
            <div className="container my-3">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title mb-3">Login</h3>

                        <label>Email Address</label>
                        <input type="text" className="form-control form-control mb-3"></input>

                        <label>Password</label>
                        <input type="text" className="form-control form-control mb-3"></input>

                        <div className="row">
                            <div className="col-6 col-lg-3 mb-3 mb-lg-0">
                                <button className="btn btn-success">Login</button>
                            </div>
                            <div className="col-6 col-lg-9 d-flex align-items-center">
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