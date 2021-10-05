import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Lander = () => {

    const { id } = useParams();

    useEffect(() => {
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/open-reminder', {
            customer_id: id
        })
    }, []);

    return (
        <div></div>
    );
}

export default Lander;