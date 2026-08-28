import PropTypes from 'prop-types'

PostFilter.propTypes = {
	field: PropTypes.string.isRequired,
}

export function PostFilter({ field }) {
	return (
		<div>
			<label htmlFor={`filter-${field}`}>{field}: </label>
			<input
				type="text"
				name={`filter-${field}`}
				id={`filter-${field}`}
			/>
		</div>
	)
}
