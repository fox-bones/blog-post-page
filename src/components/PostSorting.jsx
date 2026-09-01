import PropTypes from 'prop-types'

PostSorting.propTypes = {
	fields: PropTypes.arrayOf(PropTypes.string).isRequierd,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	orderValue: PropTypes.string.isRequired,
	onOrderChange: PropTypes.func.isRequired,
}

export function PostSorting({
	fields = [],
	value,
	onChange,
	orderValue,
	onOrderChange,
}) {
	return (
		<div className="sort-bar">
			<label htmlFor="sortBy">Sort By: </label>
			<select
				name="sortBy"
				id="sortBy"
				value={value}
				onChange={(e) => onChange(e.target.value)}
			>
				{fields.map((field) => (
					<option key={field} value={field}>
						{field}
					</option>
				))}
			</select>
			<span className="sort-divider">/</span>
			<label htmlFor="sortOrder">Sort Order: </label>
			<select
				name="sortOrder"
				id="sortOrder"
				value={orderValue}
				onChange={(e) => onOrderChange(e.target.value)}
			>
				<option value={'ascending'}>ascending</option>
				<option value={'descending'}>descending</option>
			</select>
		</div>
	)
}
