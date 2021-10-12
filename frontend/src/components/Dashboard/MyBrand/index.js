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
        }, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } })
            .then(res => {
                updateList();
            })

        setPopupOpen(false);
    }

    const handleRemove = (id) => {
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/remove-network', {
            id
        }, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } })
            .then(res => {
                updateList();
            })
    }

    const updateList = () => {
        // Grab all the review networks
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/get-all-review-networks', {}, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } })
            .then(res => {
                setAllNetworks(res.data);
            })

        // Grab all the review networks the user is actually using
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/get-my-review-networks', {}, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } })
            .then(res => {
                setMyNetworks(res.data);
            })
    }

    return (
        <div className="container-fluid">
            <h3>My Brand</h3>

            <h5>My Review Networks</h5>
            <h6 className="text-muted">Below is a list of all the places customers can leave you a review.</h6>
            {
                myNetworks &&
                myNetworks.map((network) => (
                    <div className="row g-0 mb-3 border-top border-bottom py-3">
                        <div className="col-1"><img src={network.icon} className="img-fluid" alt="" /></div>
                        <div className="col-5 col-md-4 px-3 align-items-center d-flex"><h5>{network.name}</h5></div>
                        <div className="col-3 col-md-2 col-lg-1 align-items-center d-flex"><a href={network.link} target="_blank" className="btn btn-success bg-primary">Preview</a></div>
                        <div className="col-3 col-md-2 col-lg-2 align-items-center d-flex"><button onClick={() => { handleRemove(network.id) }} className="btn btn-danger">Remove</button></div>
                    </div>
                ))
            }

            <h5 className="mt-5">All Review Networks</h5>
            <h6 className="text-muted">Below is a list of all the review networks you are currently not using.</h6>
            {
                allNetworks &&
                allNetworks.map((network) => (
                    <div className="row g-0 mb-3 border-top border-bottom py-3">
                        <div className="col-1"><img src={network.icon} className="img-fluid" alt="" /></div>
                        <div className="col-5 col-md-4 px-3 align-items-center d-flex"><h5>{network.name}</h5></div>
                        <div className="col-6 align-items-center d-flex"><button onClick={() => { handleUse(network.id, network.name) }} className="btn btn-success bg-primary">Use {network.name}</button></div>
                    </div>
                ))
            }

            {
                popupOpen &&
                <Popup networkName={selectedNetworkName} setPopupOpen={setPopupOpen} setNetwork={setNetwork}></Popup>
            }
        </div>
    );
}

export default MyBrand;