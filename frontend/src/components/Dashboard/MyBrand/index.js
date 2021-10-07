import axios from "axios";
import { useEffect, useState } from "react";
import Popup from './Popup/';

const MyBrand = () => {

    const [myNetworks, setMyNetworks] = useState(null);
    const [allNetworks, setAllNetworks] = useState(null);
    const [popupOpen, setPopupOpen] = useState(false);

    const [selectedNetworkId, setSelectedNetworkId] = useState();
    const [selectedNetworkName, setSelectedNetworkName] = useState('');

    useEffect(() => {
        updateList();
    }, []);

    const handleUse = (id, networkName) => {
        setSelectedNetworkId(id);
        setSelectedNetworkName(networkName);
        setPopupOpen(true);
    }

    const setNetwork = (link) => {
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/use-network', {
            id: selectedNetworkId,
            link: link
        }, { withCredentials: true })
            .then(res => {
                updateList();
            })

        setPopupOpen(false);
    }

    const handleRemove = (id) => {
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/remove-network', {
            id
        }, { withCredentials: true })
            .then(res => {
                updateList();
            })
    }

    const updateList = () => {
        // Grab all the review networks
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/get-all-review-networks', {}, { withCredentials: true })
            .then(res => {
                setAllNetworks(res.data);
            })

        // Grab all the review networks the user is actually using
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/get-my-review-networks', {}, { withCredentials: true })
            .then(res => {
                setMyNetworks(res.data);
            })
    }

    return (
        <div>
            <h3>My Brand</h3>

            <h5>My Review Networks</h5>
            <h6 className="text-muted">Below is a list of all the places customers can leave you a review.</h6>
            <table className="table">
                <thead>
                    <tr className="fw-bold">
                        <td className="col-2"></td>
                        <td className="col-8"></td>
                        <td className="col"></td>
                        <td className="col"></td>
                    </tr>
                </thead>
                <tbody>
                    {
                        myNetworks &&
                        myNetworks.map((network) => (
                            <tr key={network.id}>
                                <td className="align-middle"><img className="img-fluid" src={network.icon} /></td>
                                <td className="align-middle"><h5 className="fw-normal">{network.name}</h5></td>
                                <td className="align-middle"><a href={network.link} target="_blank" className="btn btn-success bg-primary">Preview</a></td>
                                <td className="align-middle"><button onClick={() => { handleRemove(network.id) }} className="btn btn-danger">Remove</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <h5 className="mt-5">All Review Networks</h5>
            <h6 className="text-muted">Below is a list of all the review networks you are currently not using.</h6>
            <table className="table">
                <thead>
                    <tr className="fw-bold">
                        <td className="col-2"></td>
                        <td className="col-6"></td>
                        <td className="col"></td>
                    </tr>
                </thead>
                <tbody>
                    {
                        allNetworks &&
                        allNetworks.map((network) => (
                            <tr key={network.id}>
                                <td className="align-middle"><img className="img-fluid" src={network.icon} /></td>
                                <td className="align-middle"><h5 className="fw-normal">{network.name}</h5></td>
                                <td className="align-middle"><button onClick={() => { handleUse(network.id, network.name) }} className="btn btn-success bg-primary">Use {network.name}</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {
                popupOpen &&
                <Popup networkName={selectedNetworkName} setPopupOpen={setPopupOpen} setNetwork={setNetwork}></Popup>
            }
        </div>
    );
}

export default MyBrand;