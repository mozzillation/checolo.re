import { motion } from 'framer-motion'
import React from 'react'
import styles from './Page.module.sass'

const V = {
	initial: {
		opacity: 0,
		transition: {
			staggerChildren: 0.15, staggerDirection: -1, when: 'beforeChildren'
		}
	},
	animate: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15
		}
	},
	exit: {
		opacity: 0,
		transition: {
			staggerChildren: 0.15, staggerDirection: -1, when: 'afterChildren'
		}
	}
}

const Page = ({ children }: { pageKey?: any, children?: React.ReactNode }) => {

	return (
		<motion.div
			className={styles.Page}
			initial='initial'
			animate='animate'
			exit='exit'
			variants={V}
		>
			{children}
		</motion.div>
	)
}

export default Page
