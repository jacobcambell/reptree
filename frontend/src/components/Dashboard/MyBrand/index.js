import axios from "axios";
import { useEffect, useState } from "react";

const MyBrand = () => {

    const [myNetworks, setMyNetworks] = useState(null);
    const [allNetworks, setAllNetworks] = useState(null);

    useEffect(() => {
        // Grab all the review networks
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/get-all-review-networks', {}, { withCredentials: true })
            .then(res => {
                setAllNetworks(res.data);
            })
    }, []);

    return (
        <div>
            <h3>My Brand</h3>

            <h5>My Review Networks</h5>
            <h6 className="text-muted">Below is a list of all the places customers can leave you a review.</h6>

            <h5 className="mt-5">All Review Networks</h5>
            <h6 className="text-muted">Below is a list of all the review networks you are currently not using.</h6>
            <table className="table">
                <thead>
                    <tr className="fw-bold">
                        <td className="col-1"></td>
                        <td className="col-6"></td>
                        <td className="col"></td>
                    </tr>
                </thead>
                <tbody>
                    {
                        allNetworks &&
                        allNetworks.map((network) => (
                            <tr>
                                <td><img className="img-fluid img-thumbnail" src={network.icon} /></td>
                                <td className="align-middle"><h5 className="fw-normal">{network.name}</h5></td>
                                <td className="align-middle"><button className="btn btn-success bg-primary">Use {network.name}</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default MyBrand;