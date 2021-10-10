import { Link } from 'react-router-dom';
import styles from './Jumbo.module.css';

const Jumbo = () => {
    return (
        <div className={styles.jumbo} style={{ backgroundImage: 'url(https://imgur.com/8M4XxPM.jpg)' }}>
            <div className={styles.overlay}>
                <div className="d-flex h-100 align-items-center text-center text-lg-start">
                    <div className="container text-white">
                        <h1 className="d-block">Grow your reputation. Grow your business</h1>
                        <h4 className="d-block">Online reviews are the #1 purchasing decision made online.</h4>

                        <Link to="/register" className="btn btn-primary fs-5 mt-3">Try Free</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Jumbo;