const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error('Validation failed.');
		error.statusCode = 422;
		error.data = errors.array();
		throw error;
	}
	const email = req.body.email;
	const name = req.body.name;
	const password = req.body.password;
	bcrypt
		.hash(password, 12)
		.then(hashedPwd => {
			const user = new User({
				email,
				password: hashedPwd,
				name
			});
			return user.save();
		})
		.then(result => {
			res.status(201).json({ message: 'User successfully created!', userId: result._id });
		})
		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.login = (req, res, next) => {
	const email = req.body.email;
	const password = req.body. password;
	User
		.findOne({ email })
		.then(user => {
			handleUserNotExist(user);
			loadedUser = user;
			return bcrypt.compare(password, user.password);
		})
		.then(isEqual => {
			if (!isEqual) {
				const error = new Error('Wrong password!');
				error.statusCode = 401;
				throw error;
			}
			const token = jwt.sign(
				{
					email: loadedUser.email,
					userId: loadedUser._id.toString()
				},
				'thisissupersecret',
				{ expiresIn: '1h'}
			);
			res.status(200).json({ token, userId: loadedUser._id.toString() });
		})
		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
}

exports.getUserStatus = async(req, res, next) => {
	try {
		const user = await User.findById(req.userId);
		handleUserNotExist(user);

		res.status(200).json({ status: user.status });
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
}

exports.updateUserStatus = async(req, res, next) =>{
	try {
		const user = await User.findById(req.userId);
		handleUserNotExist(user);

		user.status = req.body.status;
		const savedUser = await user.save();

		res.status(200).json({ message: 'User status updated.' });
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
}

// PRIVATE

function handleUserNotExist(user) {
	if (!user) {
		const error = new Error('A user with this email could not be found.');
		error.statusCode = 401;
		throw error;
	}
}