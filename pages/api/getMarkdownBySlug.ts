import matter from 'gray-matter'

const getMarkdownBySlug = async slug => {
	const content = await import(`../../data/md/${slug}.md`)

	const data = matter(content.default)
	return { ...data }
}


export default getMarkdownBySlug
