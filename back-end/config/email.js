require('dotenv').config();

module.exports.email = {
    service: 'Gmail',
    auth: {user: 's2cuacon@gmail.com', pass: process.env.EMAIL_PASSWORD},
    
};


