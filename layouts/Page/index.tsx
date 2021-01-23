import React from 'react'
import { motion } from 'framer-motion'

import styles from './Page.module.sass'

const variants = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 }
}

const Page = ({ children }: { router?: any, children?: React.ReactNode }) => {

	return (
		<motion.main
			className={styles.Page}
			initial='initial'
			animate='animate'
			exit='exit'
			variants={variants}
		>
			{children}
		</motion.main>
	)
}

export default Page
