import styles from './Popup.module.css';

const Popup = ({ networkName, setPopupOpen }) => {

    const closePopup = () => {
        setPopupOpen(false);
    }

    return (
        <div className={styles.popup}>
            <div className="card p-3">
                <button onClick={closePopup} type="button" class="btn-close align-self-end"></button>
                <h4>Paste link for {networkName}</h4>
            </div>
        </div>
    );
}

export default Popup;