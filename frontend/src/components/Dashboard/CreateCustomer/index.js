const CreateCustomer = () => {
    return (
        <div>
            <h3>Create Customer</h3>

            <div className="row">
                <div className="col col-lg-8">
                    <label>Customer's Name</label>
                    <input type="text" className="form-control mb-3" />

                    <label>Phone Number</label>
                    <input type="phone" className="form-control mb-3" />

                    <label>Reminder Time</label>
                    <input type="datetime-local" className="d-flex"></input>

                    <button className="btn btn-success my-3">Create Customer</button>
                </div>
            </div>
        </div>
    );
}

export default CreateCustomer;