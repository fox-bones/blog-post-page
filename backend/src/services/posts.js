import { Post } from '../db/models/post.js'

export async function createPost({ title, author, contents, tags }) {
	const post = new Post({ title, author, contents, tags })
	return await post.save()
}

// helper function for user-accessible functions listAllPosts, listPostsByAuthor, listPostsByTag
async function listsPosts(
	query = {},
	{ sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
	return await Post.find(query).sort({ [sortBy]: sortOrder })
}

export async function listAllPosts(options) {
	return await listsPosts({}, options)
}

export async function listPostsByAuthor(author, options) {
	return await listsPosts({ author }, options)
}

export async function listPostsByTag(tags, options) {
	return await listsPosts({ tags }, options)
}

export async function getPostById(postId) {
	return await Post.findById(postId)
}

export async function updatePost(postId, { title, author, contents, tags }) {
	return await Post.findOneAndUpdate(
		{ _id: postId },
		{ $set: { title, author, contents, tags } },
		{ new: true },
	)
}

export async function deletePost(postId) {
	return await Post.deleteOne({ _id: postId })
}
