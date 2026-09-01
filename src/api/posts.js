export const getPosts = async (queryParams) => {
	const res = await fetch(
		`${import.meta.env.VITE_BACKEND_URL}/posts?` +
			new URLSearchParams(queryParams),
	)

	return await res.json()
}

export const createPost = async (post) => {
	const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(post),
	})

	return await res.json()
}

export const editPost = async (postId, post) => {
	const res = await fetch(
		`${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`,
		{
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(post),
		},
	)

	return await res.json()
}

export const deletePost = async (postId) => {
	const res = await fetch(
		`${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`,
		{
			method: 'DELETE',
		},
	)

	if (!res.ok) {
		throw new Error(`Failed to delete post: ${res.status}`)
	}
}
