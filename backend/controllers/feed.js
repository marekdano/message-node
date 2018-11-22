exports.getPosts = (req, res, next) => {
	res.json({
		posts: [{ title: 'My First Post', content: 'This is my first post.' }]
	});
};
