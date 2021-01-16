import React from 'react'
import { motion } from 'framer-motion'

import styles from './Page.module.sass'

const Page = ({ children }: { router?: any, children?: React.ReactNode }) => {

	return (
		<motion.main
			className={styles.Page}
			initial='initial'
			animate='animate'
			exit='exit'
		>
			{children}
		</motion.main>
	)
}

export default Page
