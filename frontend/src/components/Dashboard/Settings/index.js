import axios from "axios";
import { useEffect, useState } from "react";

const Settings = () => {

    const [smsMessage, setSmsMessage] = useState('');
    const [successMsg, setSuccessMsg] = useState();

    useEffect(() => {
        // Load the user's SMS message
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/load-sms', {}, { withCredentials: true })
            .then(res => {
                setSmsMessage(res.data.sms_message);
            })
    }, []);

    const handleUpdate = () => {
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/update-sms', {
            sms_message: smsMessage
        }, { withCredentials: true })
            .then(res => {
                if (!res.data.error) {
                    setSuccessMsg(res.data.message);
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
                successMsg &&
                <div className="alert alert-success my-2">{successMsg}</div>
            }

            <button onClick={handleUpdate} className="btn btn-primary my-2">Update</button>
        </div>
    );
}

export default Settings;