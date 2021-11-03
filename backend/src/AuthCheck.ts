const jwt = require('jsonwebtoken');

const AuthCheck = (authorization) => {
    // Checks if authorization header has a valid access_token, and returns the user_id on resolve
    return new Promise((resolve, reject) => {
        if (typeof authorization === 'undefined') {
            reject('Authorization header provided was undefined');
        }

        // Get token from authorization header
        const token = authorization.split(' ')[1];

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            resolve(payload.user_id);
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = AuthCheck;