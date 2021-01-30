import React from 'react'
import { GetStaticProps } from 'next'
import { getMarkdownBySlug } from '@api'
import Document from '@layout/Document'
import ReactMarkdown from 'react-markdown'
import { Footer } from '@/components/Footer/Footer'

const Legal = ({ data, content }: { data: any, content: any }) => {

	return (
		<>
			<Document title={data.title}>
				<ReactMarkdown source={content} />
			</Document>
			<Footer />
		</>
	)
}

export default Legal



export const getStaticProps: GetStaticProps = async () => {
	const md = await getMarkdownBySlug('legal')

	return {
		props: {
			data: md.data,
			content: md.content
		}
	}
}
