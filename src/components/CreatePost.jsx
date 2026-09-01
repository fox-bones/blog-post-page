import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createPost } from '../api/posts.js'

export function CreatePost() {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [contents, setContents] = useState('')
	const [tag, setTag] = useState('')
	const [tagList, setTagList] = useState([])
	const [tagError, setTagError] = useState('')

	// Adding tags and handling tag input errors
	function addTag(tag) {
		const normalizedTag = tag.trim().toLowerCase()

		if (!normalizedTag) {
			setTagError('tag cannot be empty')
			return
		}

		if (tagList.includes(normalizedTag)) {
			setTagError('tags must be unique')
			return
		}

		setTagList((currentTags) => [...currentTags, normalizedTag])
		setTag('')
		setTagError('')
	}

	const queryClient = useQueryClient()
	const createPostMutation = useMutation({
		mutationFn: () =>
			createPost({ title, author, contents, tags: tagList }),
		onSuccess: () => {
			queryClient.invalidateQueries(['posts'])
			setTitle('')
			setAuthor('')
			setContents('')
			setTag('')
			setTagList([])
		},
	})

	const handleSubmit = (e) => {
		e.preventDefault()
		createPostMutation.mutate()
	}

	return (
		<form className="create-post-form" onSubmit={handleSubmit}>
			<h2 className="form-heading">Write something</h2>
			<div className="field">
				<label htmlFor="create-title">Title: </label>
				<input
					type="text"
					name="create-title"
					id="create-title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<div className="field">
				<label htmlFor="create-author">Author: </label>
				<input
					type="text"
					name="create-author"
					id="create-author"
					value={author}
					onChange={(e) => setAuthor(e.target.value)}
				/>
			</div>
			<textarea
				className="post-textarea"
				value={contents}
				onChange={(e) => setContents(e.target.value)}
			/>
			<div className="field tag-row">
				<label htmlFor="create-tag">Tags: </label>
				<input
					type="text"
					name="create-tag"
					id="create-tag"
					value={tag}
					onChange={(e) => {
						setTag(e.target.value)
						setTagError('')
					}}
				/>
				<button
					type="button"
					className="btn btn-ghost"
					onClick={() => addTag(tag)}
				>
					Add Tag
				</button>
			</div>
			<div>
				{tagList.map((tag) => (
					<span key={tag} className="edit-post-tags">
						{tag}
						<button
							className="edit-post-tags-x"
							type="button"
							onClick={() =>
								setTagList((currentTags) =>
									currentTags.filter((item) => item !== tag),
								)
							}
						>
							x
						</button>
					</span>
				))}
			</div>
			<div>{tagError && <p className="field-error">{tagError}</p>}</div>
			<input
				type="submit"
				className="btn btn-primary"
				value={createPostMutation.isPending ? 'Creating...' : 'Create'}
				disabled={!title || createPostMutation.isPending}
			/>
			{createPostMutation.isSuccess ? (
				<p className="success-note">Post created successfully!</p>
			) : null}
		</form>
	)
}
