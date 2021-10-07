import styles from './Popup.module.css';

const Popup = ({ networkName, setPopupOpen }) => {

    const closePopup = () => {
        setPopupOpen(false);
    }

    return (
        <div className={styles.popup}>
            <div className="card p-3 col-3">
                <button onClick={closePopup} type="button" class="btn-close align-self-end"></button>
                <h4>Enter {networkName} Link</h4>
                <h5 className="text-muted fw-normal">This is the link your customers will be sent to when they click your {networkName} button.</h5>
                <input type="text" className="form-control my-3" placeholder={`${networkName} Link`} />
                <button className="btn btn-primary">Submit</button>
            </div>
        </div>
    );
}

export default Popup;