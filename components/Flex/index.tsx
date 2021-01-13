import React from 'react'
import styles from './Flex.module.sass'

interface FlexProps {
	backgroundColor?: string,
	children?: React.ReactNode
}

const Flex = (
	{ backgroundColor, children }: FlexProps) => {

	return (
		<div className={styles.Flex} style={{ backgroundColor }}>
			{children}
		</div>
	)
}

export default Flex
