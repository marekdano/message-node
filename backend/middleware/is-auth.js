const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const authHeader = req.get('Authorization');
	if (!authHeader) {
		getAuthError();
	}
	const token = authHeader.split(' ')[1];
	let decodedToken;
	try {
		decodedToken = jwt.verify(token, 'thisissupersecret');
	} catch (err) {
		err.statusCode = 500;
		throw err;
	}
	if (!decodedToken) {
		getAuthError();
	}
	req.userId = decodedToken.userId;
	next();
}

function getAuthError() {
	const error = new Error('Not authenticated.');
	error.statusCode = 401;
	throw error;
}
