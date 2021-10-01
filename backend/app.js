require('dotenv').config();

const express = require('express')
const cors = require('cors');
const mysql = require('mysql');
const session = require('express-session');

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

    // Check if parameters were sent
    if (
        typeof req.body.email !== 'string' ||
        typeof req.body.password !== 'string' ||
        typeof req.body.companyname !== 'string'
    ) {
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

    // Does the provided email exist in the database?
    con.query('SELECT COUNT(*) AS c FROM users WHERE email=?', [req.body.email], (err, results) => {
        if (err) throw err;

        if (results[0].c > 0) {
            // User with this email address already exists
            res.json({ error: true, message: 'User with that email address already exists' });
            return;
        }

        // Provided email doesn't exist, create it
        con.query('INSERT INTO users (email, password, companyname) VALUES (?, ?, ?)', [req.body.email, req.body.password, req.body.companyname], (err, results) => {
            if (err) throw err;

            res.json({ error: false });
            return;
        });
    });
})

app.post('/login', (req, res) => {
    // Return json object with property "error", which will be either true or false

    // Check if parameters were sent
    if (
        typeof req.body.email !== 'string' ||
        typeof req.body.password !== 'string'
    ) {
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

    // Create customer using the provided values
    con.query('INSERT INTO customers (owner_id, name, phone, remind_time, reminder_sent, create_time) VALUES (?, ?, ?, NOW() + INTERVAL ? HOUR, 0, NOW())', [req.session.user_id, req.body.name, req.body.phone, req.body.time], (err, results) => {
        if (err) throw err;

        res.json({ error: false, message: 'Successfully created customer' });
        return;
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

    // Delete the customer from the database, if this user actually owns the id of the customer they sent
    con.query('DELETE FROM customers WHERE id=? AND owner_id=?', [req.body.id, req.session.user_id], (err, results) => {
        if (err) throw err;

        res.json({ error: false, message: 'Deleted customer' });
    });
})

app.post('/get-all-review-networks', (req, res) => {
    // Check if the user is logged in
    if (typeof req.session.user_id === 'undefined') {
        res.json({ error: true, message: 'You must be logged in first' });
        return;
    }

    // Get a list of all the review networks
    con.query('SELECT id, name, icon FROM review_network_list', (err, results) => {
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

app.listen(8080, () => {
    console.log('RepTree API running on port 8080')
});