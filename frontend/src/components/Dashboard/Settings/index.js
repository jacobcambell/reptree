const Settings = () => {
    return (
        <div>
            <h3>Settings</h3>

            <h5 className="pt-3">My Reminder Message</h5>
            <h6 className="text-muted">Enter the message your customers will get when they are sent a text message.</h6>
            <h6 className="text-muted">Tip: You can use the <b>((name))</b> flag to insert the customer's name, and use the ((company)) flag to insert your company's name.</h6>
            <h6 className="text-muted">Note: Your review link will automatically be placed at the end of the message.</h6>


            <textarea rows="7" className="form-control"></textarea>

            <h5 className="pt-3">Message Preview:</h5>
        </div>
    );
}

export default Settings;