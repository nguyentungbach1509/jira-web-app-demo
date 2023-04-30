/**
 * Service to generate JWT8? */

var jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
	'sign': function(payload) {
		return jwt.sign({
			data: payload
		},  process.env.JWT_SECRET, {expiresIn: 300});
	},
	'verify': function(token, callback) {
		jwt.verify(token, process.env.JWT_SECRET, callback);
	}
}; 