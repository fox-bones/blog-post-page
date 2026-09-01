import PropTypes from 'prop-types'
import { Post } from './Post.jsx'
import { DeletePost } from './DeletePost.jsx'
import { EditPost } from './EditPost.jsx'

PostList.propTypes = {
	posts: PropTypes.arrayOf(PropTypes.shape(Post.propTypes)).isRequired,
}

export function PostList({ posts = [] }) {
	return (
		<div className="post-list">
			{posts.map((post) => (
				<div className="post-item" key={post._id}>
					<Post {...post} />
					<div className="post-actions">
						<DeletePost value="Delete" id={post._id} />
						<EditPost post={post} />
					</div>
				</div>
			))}
		</div>
	)
}
