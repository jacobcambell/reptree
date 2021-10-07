import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="container-fluid bg-dark g-0 py-2">
            <div className="container-xxl">
                <div className="row g-0">
                    <div className="col px-3 d-flex align-items-center">
                        <Link to="/" className="fs-4 text-white text-decoration-none" href="#"><i class="fas fa-seedling" style={{ color: '#0BD533' }}></i> RepTree</Link>
                    </div>
                    <div className="col-5 col-md-4 col-lg-3 col-xl-2 col-2 d-flex align-items-center justify-content-evenly">
                        <Link to="/register" className="btn btn-primary">Try Free</Link>
                        <Link to="/login" className="btn border border-light text-white text-decoration-none">Log In</Link>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Navbar;