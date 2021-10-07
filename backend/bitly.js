const axios = require('axios');

module.exports.createShortLink = (link) => {
    return new Promise((resolve, reject) => {
        axios.post(process.env.bitly_API_ENDPOINT + '/v4/shorten', {
            'long_url': link,
        }, {
            headers: { Authorization: `Bearer ${process.env.bitly_accessToken}` }
        })
            .then(res => {
                resolve(res.data.link);
            })
            .catch((e) => {
                reject(e);
            })
    })
}