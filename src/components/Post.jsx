import PropTypes from 'prop-types'

Post.propTypes = {
	title: PropTypes.string.isRequired,
	contents: PropTypes.string,
	author: PropTypes.string,
	tags: PropTypes.arrayOf(PropTypes.string),
}

export function Post({ title, contents, author, tags = [] }) {
	return (
		<article className="post-card">
			<h3 className="post-title">{title}</h3>
			<div className="post-contents">{contents}</div>
			{author && (
				<em className="post-byline">
					Written by <strong>{author}</strong>
				</em>
			)}
			{tags.length > 0 && (
				<ul className="post-tags">
					{tags.map((tag) => (
						<li key={tag} className="post-tag">
							{tag}
						</li>
					))}
				</ul>
			)}
		</article>
	)
}
