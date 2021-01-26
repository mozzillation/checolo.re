import React from 'react'
import { GetStaticProps } from 'next'
import { getMarkdownBySlug } from '@api'
import Flex from '@component/Flex'
import Document from '@layout/Document'
import ReactMarkdown from 'react-markdown'

const Legal = ({ data, content }: { data: any, content: any }) => {


	return (
		<Flex>
			<Document title={data.title}>
				<ReactMarkdown source={content} />
			</Document>
		</Flex>
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
