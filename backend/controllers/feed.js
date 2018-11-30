const { validationResult } = require('express-validator/check');
const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
	res.json({
		posts: [
			{ 
				_id: new Date().toISOString(),
				title: 'My First Post', 
				content: 'This is my first post.',
				imageUrl: 'images/sample.jpg',
				creator: {
					name: 'Marek',
				},
				createdAt: new Date(),
			},
		]
	});
};

exports.createPost = (req, res, next) => {
	const error = validationResult(req);
	if (!error.isEmpty()) {
		const error = new Error('Validation failed, entered data is incorrect.');
		error.statusCode = 422;
		throw error;
	}
	const title = req.body.title;
	const content = req.body.content;
	const post = new Post({
		title: title, 
		content: content,
		imageUrl: 'images/sample.jpg',
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
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			// using next(err) instead of throw err in the async function
			// to reach error handling middleware
			next(err);
		});
};
