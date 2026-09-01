import { PostList } from './components/PostList.jsx'
import { CreatePost } from './components/CreatePost.jsx'
import { PostFilter } from './components/PostFilter.jsx'
import { PostSorting } from './components/PostSorting.jsx'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from './api/posts.js'
import { useState } from 'react'

export function Blog() {
	const [author, setAuthor] = useState('')
	const [tag, setTag] = useState('')
	const [sortBy, setSortBy] = useState('createdAt')
	const [sortOrder, setSortOrder] = useState('descending')

	const postsQuery = useQuery({
		queryKey: ['posts', { author, sortBy, sortOrder, tag }],
		queryFn: () => {
			console.log('author query:', author)
			return getPosts({ author, sortBy, sortOrder, tag })
		},
	})

	const posts = postsQuery.data ?? []

	return (
		<div className="blog">
			<CreatePost />
			<hr />
			<div className="filter-bar">
				<span className="filter-bar-label">Filter By:</span>
				<PostFilter
					field="author"
					value={author}
					onChange={(value) => setAuthor(value)}
				/>
				<PostFilter
					field="tag"
					value={tag}
					onChange={(value) => setTag(value)}
				/>
			</div>
			<PostSorting
				fields={['createdAt', 'updatedAt']}
				value={sortBy}
				onChange={(value) => setSortBy(value)}
				orderValue={sortOrder}
				onOrderChange={(orderValue) => setSortOrder(orderValue)}
			/>
			<hr />
			<PostList posts={posts} />
		</div>
	)
}
