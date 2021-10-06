const Portal = () => {
    return (
        <div>
            <h3>Dashboard</h3>

            <div className="row">
                <div className="card col mx-4 align-items-center bg-primary text-light p-2">
                    <h6>Number of Customers</h6>
                    <h2>12</h2>
                </div>
                <div className="card col mx-4 align-items-center bg-secondary text-light p-2">
                    <h6 className="align-self-center">Reminders Sent</h6>
                    <h2>18</h2>
                </div>
                <div className="card col mx-4 align-items-center bg-light text-dark p-2">
                    <h6>Reminders Opened</h6>
                    <h2>7 (39%)</h2>
                </div>
            </div>
        </div>
    );
}

export default Portal;