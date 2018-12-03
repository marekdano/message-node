const { validationResult } = require('express-validator/check');
const Post = require('../models/post');

const errorHandlingInPromiseCatch = (err, next) => {
	if (!err.statusCode) {
		err.statusCode = 500;
	}
	// using next(err) instead of throw err in the async function
	// to reach error handling middleware
	next(err);
}

exports.getPosts = (req, res, next) => {
	Post
		.find()
		.then(posts => {
			res.status(200).json({ posts });
		})
		.catch(err => {
			errorHandlingInPromiseCatch(err, next);
		});
};

exports.createPost = (req, res, next) => {
	const error = validationResult(req);
	if (!error.isEmpty()) {
		const error = new Error('Validation failed, entered data is incorrect.');
		error.statusCode = 422;
		throw error;
	}
	if (!req.file) {
		const error = new Error('No image provided.');
		error.statusCode = 422;
		throw error;
	}
	const title = req.body.title;
	const content = req.body.content;
	const imageUrl = req.file.path;
	const post = new Post({
		title: title, 
		content,
		imageUrl,
		creator: {
			name: 'Marek'
		},
	});
	// create post in db
	post
		.save()
		.then(result => {
			res.status(201).json({
				message: 'Post created successfully!',
				post: result
			});
		})
		.catch(err => {
			errorHandlingInPromiseCatch(err, next);
		});
};

exports.getPost = (req, res, next) => {
	const id = req.params.id;
	Post
		.findById(id)
		.then(post => {
			if (!post) {
				const error = new Error('Could not find post.');
				error.statusCode = 404;
				throw error;
			}
			res.status(200).json({ post });
		})
		.catch(error => {
			errorHandlingInPromiseCatch(error, next);
		})
}
