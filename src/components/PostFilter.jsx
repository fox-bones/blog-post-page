import PropTypes from 'prop-types'

PostFilter.propTypes = {
	field: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
}

export function PostFilter({ field, value, onChange }) {
	return (
		<div className="filter-field">
			<label htmlFor={`filter-${field}`}>{field}: </label>
			<input
				type="text"
				name={`filter-${field}`}
				id={`filter-${field}`}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	)
}
