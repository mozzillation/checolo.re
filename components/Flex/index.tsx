import React from 'react'
import styles from './Flex.module.sass'

const Flex = ({ backgroundColor, children }: { backgroundColor?: string, children?: React.ReactNode }) => {

	return (
		<div className={styles.Flex} style={{ backgroundColor }}>
			{children}
		</div>
	)
}

export default Flex
