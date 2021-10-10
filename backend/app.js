require('dotenv').config();

const express = require('express')
const cors = require('cors');
const mysql = require('mysql');
const session = require('express-session');

const twilio = require('twilio');
const twilio_accountSid = process.env.twilio_accountSid;
const twilio_authToken = process.env.twilio_authToken;
const twilio_client = new twilio(twilio_accountSid, twilio_authToken);
const bitly = require('./bitly.js');

const app = express();

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'reptree'
});

con.connect();

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true
}

app.use(cors(corsOptions));
app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
app.use(express.json());

app.post('/register', (req, res) => {
    // Return json object with property "error", which will be either true or false

    // Check params
    const check = [
        req.body.email,
        req.body.password,
        req.body.companyname
    ];

    if (check.includes(undefined)) {
        res.json({ error: true, message: 'Please provide an email, password, and company name' });
        return;
    }

    // Check param lengths
    if (
        req.body.email.length === 0 ||
        req.body.password.length === 0 ||
        req.body.companyname.length === 0
    ) {
        res.json({ error: true, message: 'Email, password or company name is too short.' });
        return;
    }

    // Check valid email
    if (!validateEmail(req.body.email)) {
        res.json({ error: true, message: 'Please provide a valid email address.' });
        return;
    }

    // Does the provided email exist in the database?
    con.query('SELECT COUNT(*) AS c FROM users WHERE email=?', [req.body.email], (err, results) => {
        if (err) throw err;

        if (results[0].c > 0) {
            // User with this email address already exists
            res.json({ error: true, message: 'User with that email address already exists' });
            return;
        }

        // Provided email doesn't exist, create it (account will have an SMS balance of 3 by default)
        con.query(`INSERT INTO users
                    (email, password, companyname, sms_balance, sms_message)
                    VALUES (?, ?, ?, 3, "Hey ((name)), thanks for visiting ((company)). If you would like, please leave us a review")
                    `, [req.body.email, req.body.password, req.body.companyname], (err, results) => {
            if (err) throw err;

            // Get ID of this new user
            con.query('SELECT users.id AS user_id FROM users WHERE email=?', [req.body.email], (err, results) => {
                if (err) throw err;

                // Make the user logged in right after registration
                console.log('Logged in ' + results[0].user_id)
                req.session.user_id = results[0].user_id;
                res.json({ error: false });
                return;
            });
        });
    });
})

app.post('/login', (req, res) => {
    // Return json object with property "error", which will be either true or false

    // Check params
    const check = [
        req.body.email,
        req.body.password
    ];

    if (check.includes(undefined)) {
        res.json({ error: true, message: 'Please provide an email and password' });
        return;
    }

    // Check param lengths
    if (
        req.body.email.length === 0 ||
        req.body.password.length === 0
    ) {
        res.json({ error: true, message: 'Email or password is too short.' });
        return;
    }

    // Validate login
    con.query('SELECT password, id FROM users WHERE email=?', [req.body.email], (err, results) => {
        if (err) throw err;

        if ((results.length === 0) || results[0].password !== req.body.password) {
            // No user with that email found, or the password provided doesn't match
            res.json({ error: true, message: 'Incorrect email or password' });
            return;
        }
        else {
            // Successful login
            req.session.user_id = results[0].id;
            res.json({ error: false });
            return;
        }
    });
})

app.post('/create-customer', (req, res) => {
    // Check if the user is logged in
    if (typeof req.session.user_id === 'undefined') {
        res.json({ error: true, message: 'You must be logged in first' });
        return;
    }

    // Check params
    const check = [
        req.body.name,
        req.body.phone,
        req.body.time
    ];

    if (check.includes(undefined)) {
        res.json({ error: true, message: 'Please include all the required values' });
        return;
    }

    // Name, phone and time should be more than 0 chars
    if (
        req.body.name.length === 0 ||
        req.body.phone.length === 0 ||
        req.body.time.length === 0
    ) {
        res.json({ error: true, message: 'Please enter a value in each field' });
        return;
    }

    // Check user's sms balance
    con.query('SELECT users.sms_balance FROM users WHERE users.id=?', [req.session.user_id], (err, results) => {
        if (err) throw err;

        if (results[0].sms_balance < 1) {
            // User cannot add this customer because their balance is too low
            res.json({ error: true, message: 'You cannot create this customer because your balance is too low.' });
            return;
        }

        // Create customer using the provided values
        con.query('INSERT INTO customers (owner_id, name, phone, remind_time, reminder_sent, create_time) VALUES (?, ?, ?, NOW() + INTERVAL ? HOUR, 0, NOW())', [req.session.user_id, req.body.name, req.body.phone, req.body.time], (err, results) => {
            if (err) throw err;

            // Subtract one from user's SMS balance
            con.query('UPDATE users SET sms_balance=(sms_balance - 1) WHERE users.id=?', [req.session.user_id], (err, results) => {
                if (err) throw err;

                res.json({ error: false, message: 'Successfully created customer' });
                return;
            });
        });
    });
})

app.post('/get-my-customers', (req, res) => {
    // Check if the user is logged in
    if (typeof req.session.user_id === 'undefined') {
        res.json({ error: true, message: 'You must be logged in first' });
        return;
    }

    // Grab all customers belonging to this user by their id
    con.query('SELECT id, name, phone, TIMESTAMPDIFF(MINUTE, NOW(), remind_time) AS time, reminder_sent FROM customers WHERE owner_id=? ORDER BY create_time DESC', [req.session.user_id], (err, results) => {
        if (err) throw err;

        let customers = [];

        for (let i = 0; i < results.length; i++) {
            customers.push({
                id: results[i].id,
                name: results[i].name,
                phone: results[i].phone,
                time: results[i].time,
                reminder_sent: results[i].reminder_sent
            });
        }

        res.json(customers);
    });
})

app.post('/cancel-customer', (req, res) => {
    // Check if the user is logged in
    if (typeof req.session.user_id === 'undefined') {
        res.json({ error: true, message: 'You must be logged in first' });
        return;
    }

    // Check params
    const check = [
        req.body.id
    ];

    if (check.includes(undefined)) {
        res.json({ error: true, message: 'Please include all the required values' });
        return;
    }

    // Delete the customer from the database, if this user actually owns the id of the customer they sent and the reminder hasn't been sent yet
    con.query('DELETE FROM customers WHERE id=? AND owner_id=? AND reminder_sent=0', [req.body.id, req.session.user_id], (err, results) => {
        if (err) throw err;

        // Add 1 to this user's sms balance since they deleted a customer
        con.query('UPDATE users SET sms_balance=(sms_balance + 1) WHERE users.id=?', [req.session.user_id], (err, results) => {
            if (err) throw err;

            res.json({ error: false, message: 'Deleted customer' });
        });
    });
})

app.post('/get-all-review-networks', (req, res) => {
    // Check if the user is logged in
    if (typeof req.session.user_id === 'undefined') {
        res.json({ error: true, message: 'You must be logged in first' });
        return;
    }

    // Get a list of all the review networks, without any the user is currently using
    con.query(`SELECT
                review_network_list.id AS id,
                review_network_list.name AS name,
                review_network_list.icon AS icon
                FROM review_network_list
                WHERE
                review_network_list.id NOT IN (
                    SELECT review_networks.network_id FROM review_networks
                    WHERE
                    review_networks.owner_id=?
                )
                `,
        [req.session.user_id],
        (err, results) => {
            if (err) throw err;

            let networks = [];

            for (let i = 0; i < results.length; i++) {
                networks.push({
                    id: results[i].id,
                    name: results[i].name,
                    icon: results[i].icon
                });
            }

            res.json(networks);
        });
})

app.post('/get-my-review-networks', (req, res) => {
    // Check if the user is logged in
    if (typeof req.session.user_id === 'undefined') {
        res.json({ error: true, message: 'You must be logged in first' });
        return;
    }

    // Get a list of all the review networks belonging to the user
    con.query(`SELECT
                review_network_list.id AS id,
                review_network_list.name AS name,
                review_network_list.icon AS icon,
                review_networks.link AS link
                FROM review_network_list, review_networks
                WHERE review_network_list.id=review_networks.network_id AND
                review_networks.owner_id=?`,
        [req.session.user_id],
        (err, results) => {
            if (err) throw err;

            let networks = [];

            for (let i = 0; i < results.length; i++) {
                networks.push({
                    id: results[i].id,
                    name: results[i].name,
                    icon: results[i].icon,
                    link: results[i].link
                });
            }

            res.json(networks);
        });
})

app.post('/use-network', (req, res) => {
    // Check if the user is logged in
    if (typeof req.session.user_id === 'undefined') {
        res.json({ error: true, message: 'You must be logged in first' });
        return;
    }

    // Check params
    const check = [
        req.body.id,
        req.body.link
    ];

    if (check.includes(undefined)) {
        res.json({ error: true, message: 'Please include all the required values' });
        return;
    }

    // Check if user is already using this review network
    con.query('SELECT COUNT(*) AS c FROM review_networks WHERE owner_id=? AND network_id=?', [req.session.user_id, req.body.id], (err, results) => {
        if (results[0].c > 0) {
            // User is already using this review network
            res.json({ error: true, message: 'You are already using this review network' });
            return;
        }

        // Not using this network yet, add to table
        con.query('INSERT INTO review_networks (network_id, owner_id, link) VALUES (?, ?, ?)', [req.body.id, req.session.user_id, req.body.link], (err, results) => {
            if (err) throw err;

            res.json({ error: false, message: 'Started using this review network' });
        });
    })
})

app.post('/remove-network', (req, res) => {
    // Check if the user is logged in
    if (typeof req.session.user_id === 'undefined') {
        res.json({ error: true, message: 'You must be logged in first' });
        return;
    }

    // Check params
    const check = [
        req.body.id
    ];

    if (check.includes(undefined)) {
        res.json({ error: true, message: 'Please include all the required values' });
        return;
    }

    // Remove from table if user is actually using the provided network id
    con.query('DELETE FROM review_networks WHERE owner_id=? AND network_id=?', [req.session.user_id, req.body.id], (err, results) => {
        if (err) throw err;

        res.json({ error: false, message: 'Stopped using this network' });
    });
})

app.post('/load-sms', (req, res) => {
    // Check if the user is logged in
    if (typeof req.session.user_id === 'undefined') {
        res.json({ error: true, message: 'You must be logged in first' });
        return;
    }

    // Get this user's sms message
    con.query('SELECT sms_message FROM users WHERE users.id=?', [req.session.user_id], (err, results) => {
        if (err) throw err;

        res.json({
            sms_message: results[0].sms_message
        });
        return;
    });
})

app.post('/update-sms', (req, res) => {
    // Check if the user is logged in
    if (typeof req.session.user_id === 'undefined') {
        res.json({ error: true, message: 'You must be logged in first' });
        return;
    }

    // Check params
    const check = [
        req.body.sms_message
    ];

    if (check.includes(undefined)) {
        res.json({ error: true, message: 'Please include all the required values' });
        return;
    }

    // Update the user's sms message with the one they sent
    con.query('UPDATE users SET users.sms_message=? WHERE users.id=?', [req.body.sms_message, req.session.user_id], (err, results) => {
        res.json({ error: false, message: 'Updated SMS message' });
        return;
    });
})

app.post('/edit-companyname', (req, res) => {
    // Check if the user is logged in
    if (typeof req.session.user_id === 'undefined') {
        res.json({ error: true, message: 'You must be logged in first' });
        return;
    }

    // Check params
    const check = [
        req.body.companyname
    ];

    if (check.includes(undefined)) {
        res.json({ error: true, message: 'Please include all the required values' });
        return;
    }

    con.query('UPDATE users SET users.companyname=? WHERE users.id=?', [req.body.companyname, req.session.user_id], (err, results) => {
        if (err) throw err;

        res.json({ error: false, message: 'Updated your company name' });
        return;
    });
})

app.post('/get-companyname', (req, res) => {
    // Check if the user is logged in
    if (typeof req.session.user_id === 'undefined') {
        res.json({ error: true, message: 'You must be logged in first' });
        return;
    }

    // Get this user's company name
    con.query('SELECT users.companyname FROM users WHERE users.id=?', [req.session.user_id], (err, results) => {
        if (err) throw err;

        res.json({ companyname: results[0].companyname });
        return;
    });
})

app.listen(8080, () => {
    console.log('RepTree API running on port 8080')
});

app.post('/open-reminder', (req, res) => {
    // Called when a customer opens the link they were texted, will update the customer as having
    // opened the link and update open time

    // Check params
    const check = [
        req.body.customer_id
    ];

    if (check.includes(undefined)) {
        res.json({ error: true, message: 'Please include all the required values' });
        return;
    }

    // Mark as opened - Note: currently there is no form of authentication, anyone could send a customer id and mark as opened
    con.query('UPDATE customers SET reminder_opened=1, reminder_open_time=NOW() WHERE customers.id=?', [req.body.customer_id], (err, results) => {
        if (err) throw err;

        res.json({ error: false, message: 'Marked as open' });
        return;
    });
})

app.post('/list-review-networks', (req, res) => {
    // Gets a list of all the review network info and links that belong to the owner of the provided customer id

    // Check params
    const check = [
        req.body.customer_id
    ];

    if (check.includes(undefined)) {
        res.json({ error: true, message: 'Please include all the required values' });
        return;
    }

    // Load all review network data
    con.query(`SELECT
                review_networks.link,
                review_network_list.icon,
                review_network_list.name

                FROM customers, review_networks, users, review_network_list
                WHERE
                customers.owner_id=review_networks.owner_id AND
                customers.owner_id=users.id AND
                customers.id=? AND
                review_networks.network_id=review_network_list.id
    `, [req.body.customer_id], (err, results) => {
        if (err) throw err;

        let review_networks = [];

        for (let i = 0; i < results.length; i++) {
            review_networks.push({
                link: results[i].link,
                icon: results[i].icon,
                name: results[i].name
            });
        }

        res.json(review_networks);
        return;
    });
})

app.post('/get-customer-info', (req, res) => {
    // Check params
    const check = [
        req.body.customer_id
    ];

    if (check.includes(undefined)) {
        res.json({ error: true, message: 'Please include all the required values' });
        return;
    }

    // Get this customer's information
    con.query(`SELECT
                customers.name,
                users.companyname
                FROM customers, users
                WHERE
                customers.owner_id=users.id AND
                customers.id=?
    `, [req.body.customer_id], (err, results) => {
        if (err) throw err;

        res.json({
            name: results[0].name,
            companyname: results[0].companyname
        });
        return;
    });
})

app.post('/get-analytics', (req, res) => {
    // total number of customers
    // total reminders sent
    // total reminders opened

    // Check if the user is logged in
    if (typeof req.session.user_id === 'undefined') {
        res.json({ error: true, message: 'You must be logged in first' });
        return;
    }

    // Get this user's analytics
    let totalCustomers = 0;
    let remindersSent = 0;
    let remindersOpened = 0;

    // Total Customers
    con.query(`SELECT
                COUNT(*) AS c
                FROM customers
                WHERE
                customers.owner_id=?
                `, [req.session.user_id], (err, results) => {
        if (err) throw err;

        totalCustomers = Number(results[0].c);

        // Total Reminders Sent
        con.query('SELECT COUNT(*) AS c FROM customers WHERE customers.owner_id=? AND customers.reminder_sent=1', [req.session.user_id], (err, results) => {
            if (err) throw err;

            remindersSent = Number(results[0].c);

            // Total Reminders Opened
            con.query('SELECT COUNT(*) AS c FROM customers WHERE customers.owner_id=? AND customers.reminder_sent=1 AND customers.reminder_opened=1', [req.session.user_id], (err, results) => {
                if (err) throw err;

                remindersOpened = Number(results[0].c);

                res.json({
                    totalCustomers,
                    remindersSent,
                    remindersOpened
                });
                return;
            })
        });
    });
})

// SMS check loop
setInterval(() => {
    con.query(`SELECT
    customers.id AS customer_id, customers.name, customers.phone,
    users.companyname, users.sms_message
    FROM customers, users
    WHERE customers.remind_time < NOW() AND
    customers.reminder_sent=0 AND
    users.id=customers.owner_id
    `, (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            // No users to send texts to
            return;
        }

        // Loop through all the customers we need to text
        for (let i = 0; i < results.length; i++) {
            // Build the SMS message from the user's settings
            let message = results[i].sms_message;

            // Replace ((name)) with the customer's name
            message = message.replace('((name))', results[i].name);

            // Replace ((company)) with the user's company name
            message = message.replace('((company))', results[i].companyname);

            // Build review link
            $reviewLink = `${process.env.FRONTEND_BASEURL}/leave-review/${results[i].customer_id}`;

            // Get Bitly short link
            $bitlyLink = bitly.createShortLink($reviewLink)
                .then((link) => {
                    // Append Bitly link to end of message
                    message += ` ${link}`;

                    // Text the customer
                    twilio_client.messages.create({
                        body: message,
                        to: results[i].phone, // Text this number
                        from: process.env.twilio_fromPhone, // From a valid Twilio number
                    })
                        .then(() => {
                            // Update the customer as having been sent the reminder
                            con.query('UPDATE customers SET reminder_sent=1 WHERE customers.id=?', [results[i].customer_id], (err, results) => {
                                if (err) throw err;
                            });
                        })
                        .catch(e => {
                            console.log(e)
                        })
                })
        }
    });
}, 10000);

// From: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}