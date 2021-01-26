import React from 'react'
import styles from './Document.module.sass'


const Document = ({ title, children }: { title?: string, children?: React.ReactNode }) => {

	return (
		<div
			className={styles.Document}
		>
			<h1>
				{title}
			</h1>
			<div className={styles.Content}>
				{children}
			</div>
		</div>
	)
}

export default Document
