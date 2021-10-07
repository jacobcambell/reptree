import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Lander = () => {

    const { id } = useParams();
    const [reviewNetworks, setReviewNetworks] = useState([]);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        companyname: ''
    });

    useEffect(() => {
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/open-reminder', {
            customer_id: id
        })

        axios.post(process.env.REACT_APP_API_ENDPOINT + '/list-review-networks', {
            customer_id: id
        })
            .then(results => {
                setReviewNetworks(results.data);
            })

        axios.post(process.env.REACT_APP_API_ENDPOINT + '/get-customer-info', {
            customer_id: id
        })
            .then(results => {
                setCustomerInfo(results.data);
            })

    }, []);

    return (
        <div className="container">
            <h4 className="text-center m-3">Hi, {customerInfo.name}</h4>
            <h6 className="text-center text-muted m-0">Thanks for your recent visit to {customerInfo.companyname}</h6>
            <h6 className="text-center text-muted m-0">If you wouldn't mind, please leave us a review on one of the below platforms.</h6>

            <div className="row justify-content-center mt-3">
                {
                    reviewNetworks &&
                    reviewNetworks.map((network) => (
                        <a href={network.link} target="_blank" className="card col-4 col-lg-1 m-3 p-3 d-flex text-decoration-none">
                            <img src={network.icon} className="img-fluid" />
                            <h6 className="align-self-center mt-3">{network.name}</h6>
                        </a>
                    ))
                }
            </div>
        </div >
    );
}

export default Lander;