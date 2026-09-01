import { deletePost } from '../api/posts.js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'

DeletePost.propTypes = {
	id: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
}

export function DeletePost({ id, value }) {
	const queryClient = useQueryClient()

	const deletePostMutation = useMutation({
		mutationFn: () => deletePost(id),
		onSuccess: () => {
			queryClient.invalidateQueries(['posts'])
		},
	})

	const onClick = (e) => {
		e.preventDefault()
		deletePostMutation.mutate()
	}

	return (
		<button className="btn btn-danger" onClick={onClick}>
			{value}
		</button>
	)
}
