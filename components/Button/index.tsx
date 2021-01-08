import React from 'react'
import styles from './Button.module.sass'

const PrimaryBtn = ({ children, onClick }: { children?: React.ReactNode, onClick?: () => void }) => {

	return (
		<button onClick={onClick} className={styles.Primary}>
			{children}
		</button>
	)
}

export { PrimaryBtn }
