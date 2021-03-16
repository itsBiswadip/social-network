const postModel = require("./postModel");
const postController = {};

postController.createPost = async(req, res, next) => {
	try {
		let attributes = ['postID', 'title', 'content', 'likes', 'dislikes'];
		let newPostId = await postModel.createPost(
				req.user.userID, 
				req.body.title,
				req.body.content);

		let newPost = await postModel.findPostByPostId(newPostId, attributes);

		let response = {
			message: 'Success',
			post: newPost,
		}
		res.status(201).json(response);
	} catch (error) {
		next(error);
	}
}

postController.getPosts = async(req, res, next)=> {
	try {
		let posts = await postModel.findLatestPosts(req.query.limit, req.query.offset)
		res.json({posts})
	} catch (error) {
		next(error);
	}

}

postController.likePost = async(req, res, next) => {
	try {
		await postModel.updatePostLike(req.params.postID);

		let post = await postModel.findPostByPostId(req.params.postID);

		let response = {
			message: 'Success',
			post: post,
		}
		res.json(response);
	} catch (error) {
		next(error);
	}
}

module.exports = postController;