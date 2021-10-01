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
    // params:
    // name, phone, time (when they want to schedule the review)

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

    // Check if the user is logged in
    if (typeof req.session.user_id === 'undefined') {
        res.json({ error: true, message: 'You must be logged in first' });
        return;
    }

    // Create customer using the provided values
    con.query('INSERT INTO customers (name, phone, remind_time, reminder_sent) VALUES (?, ?, NOW() + INTERVAL ? HOUR, 0)', [req.body.name, req.body.phone, req.body.time], (err, results) => {
        if (err) throw err;

        res.json({ error: false, message: 'Success' });
        return;
    });

})

app.listen(8080, () => {
    console.log('RepTree API running on port 8080')
});