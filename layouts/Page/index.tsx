import { motion } from 'framer-motion'
import React from 'react'
import styles from './Page.module.sass'

const v = {
	initial: { opacity: 0, transition: { staggerChildren: 0.15, staggerDirection: -1, when: 'beforeChildren' } },
	animate: { opacity: 1, transition: { staggerChildren: 0.15 } },
	exit: { opacity: 0, transition: { staggerChildren: 0.15, staggerDirection: -1, when: 'afterChildren' } }
}

const Page = ({ children }: { router?: any, children?: React.ReactNode }) => {

	return (
		<motion.main className={styles.Page}
			initial='initial'
			animate='animate'
			exit='exit'
			variants={v}
		>
			{children}
		</motion.main>
	)
}

export default Page
