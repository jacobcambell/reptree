import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Lander = () => {

    const { id } = useParams();
    const [reviewNetworks, setReviewNetworks] = useState([]);
    const [customerInfo, setCustomerInfo] = useState();

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
            <h3>Leave review for Business</h3>
        </div>
    );
}

export default Lander;