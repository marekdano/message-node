const { validationResult } = require('express-validator/check');

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
	// create post in db
	res.status(201).json({
		message: 'Post created successfully!',
		post: { 
			_id: new Date().toISOString(), 
			title: title, 
			content: content,
			creator: {
				name: 'Marek'
			},
			createdAt: new Date()
		}
	});
};
