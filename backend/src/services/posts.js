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
	return await listsPosts(
		{
			author: {
				$regex: author,
				$options: 'i',
			},
		},
		options,
	)
}

export async function listPostsByTag(tags, options) {
	return await listsPosts(
		{
			tags: {
				$regex: tags,
				$options: 'i',
			},
		},
		options,
	)
}

export async function getPostById(postId) {
	return await Post.findById(postId)
}

export async function updatePost(postId, updates) {
	return await Post.findOneAndUpdate(
		{ _id: postId },
		{ $set: updates },
		{ new: true },
	)
}

export async function deletePost(postId) {
	return await Post.deleteOne({ _id: postId })
}
