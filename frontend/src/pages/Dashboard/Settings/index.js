import axios from "axios";
import { useEffect, useState } from "react";

const Settings = () => {

    const [smsMessage, setSmsMessage] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [successSMSMsg, setSuccessSMSMsg] = useState();
    const [successCompanyMsg, setSuccessCompanyMsg] = useState();

    useEffect(() => {
        // Load the user's SMS message
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/load-sms', {}, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } })
            .then(res => {
                setSmsMessage(res.data.sms_message);
            })

        // Load the user's company name
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/get-companyname', {}, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } })
            .then(res => {
                setCompanyName(res.data.companyname);
            })
    }, []);

    const handleSMSUpdate = () => {
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/update-sms', {
            sms_message: smsMessage
        }, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } })
            .then(res => {
                if (!res.data.error) {
                    setSuccessSMSMsg(res.data.message);
                }
            })
    }

    const handleCompanyUpdate = () => {
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/edit-companyname', {
            companyname: companyName
        }, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } })
            .then(res => {
                if (!res.data.error) {
                    setSuccessCompanyMsg(res.data.message);
                }
            })
    }

    return (
        <div>
            <h3>Settings</h3>

            <h5 className="pt-3">My Reminder Message</h5>
            <h6 className="text-muted">Enter the message your customers will get when they are sent a text message.</h6>
            <h6 className="text-muted">Tip: You can use the <b>((name))</b> flag to insert the customer's name, and use the ((company)) flag to insert your company's name.</h6>
            <h6 className="text-muted">Note: Your review link will automatically be placed at the end of the message.</h6>

            <textarea rows="7" className="form-control" onChange={(e) => { setSmsMessage(e.target.value) }} value={smsMessage}></textarea>

            {
                successSMSMsg &&
                <div className="alert alert-success my-2">{successSMSMsg}</div>
            }

            <button onClick={handleSMSUpdate} className="btn btn-primary my-2">Update</button>

            <h5 className="pt-5">Company Name</h5>
            <input onChange={(e) => { setCompanyName(e.target.value) }} type="text" className="form-control" value={companyName} />
            {
                successCompanyMsg &&
                <div className="alert alert-success my-2">{successCompanyMsg}</div>
            }
            <button onClick={handleCompanyUpdate} className="btn btn-primary my-2">Change</button>
        </div>
    );
}

export default Settings;