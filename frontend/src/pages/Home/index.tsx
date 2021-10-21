import { Link } from 'react-router-dom';
import MainNavbar from '../../components/MainNavbar/MainNavbar'
import Jumbo from './Jumbo';

const Home = () => {
    return (
        <div>
            <MainNavbar></MainNavbar>
            <Jumbo></Jumbo>

            <div className="container my-5">
                <div className="row">
                    <div className="col d-flex align-items-center px-5 px-lg-0 pe-lg-3 text-center text-lg-start">
                        <div>
                            <h2>Increase your sales</h2>
                            <h5 className="fw-normal">People buy from the company that has the most 5-Star reviews. Your number of online reviews is the #1 purchasing factor in the modern world.</h5>
                            <Link to="/register" className="btn btn-primary fs-5 mt-3">Try Free</Link>
                        </div>
                    </div>
                    <div className="col-6 d-none d-lg-block">
                        <img src="https://imgur.com/QeCGmdV.jpg" alt="" className="img-fluid" />
                    </div>
                </div>
            </div>
            <div className="container my-5">
                <div className="row">
                    <div className="col-4 d-none d-lg-block">
                        <img src="https://imgur.com/hAHRrvx.jpg" alt="" className="img-fluid" />
                    </div>
                    <div className="col d-flex align-items-center px-5 text-center text-lg-start">
                        <div>
                            <h2>Build your brand authority</h2>
                            <h5 className="fw-normal">Your company's online presence is crucial in this age of smartphones and the internet.</h5>
                            <Link to="/register" className="btn btn-primary fs-5 mt-3">Try Free</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid g-0 bg-dark text-white text-center py-5">
                <h1>Turn your customers into Reputation <i className="fas fa-medal" style={{ color: '#FFD700' }}></i></h1>
                <h5 className="fw-normal">RepTree turns customers into valuable online reviews. You already have happy customers, why not help them leave a review?</h5>
                <Link to="/register" className="btn btn-primary fs-5 mt-3">Try Free</Link>
            </div>
        </div>
    );
}

export default Home;