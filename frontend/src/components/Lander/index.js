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
        <div className="container-sm">
            <h4 className="text-center m-3">Hi, {customerInfo.name}</h4>
            <h6 className="text-center text-muted m-0">Thanks for your recent visit to {customerInfo.companyname}</h6>
            <h6 className="text-center text-muted m-0">If you wouldn't mind, please leave us a review on one of the below platforms.</h6>
        </div>
    );
}

export default Lander;