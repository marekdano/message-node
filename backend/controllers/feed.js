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
		return res
			.status(422)
			.json({
				message: 'Validation failed, entered data is icorrect.',
				errors: errors.array(),
			})
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
			console.log(err);
		});
};
