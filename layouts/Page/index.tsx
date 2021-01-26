import { motion } from 'framer-motion'
import React from 'react'
import styles from './Page.module.sass'
import { GLOBAL_PAGE_VARIANT } from '@/utils/const'


const Page = ({ children }: { children?: React.ReactNode }) => {

	return (
		<motion.div
			className={styles.Page}
			initial='initial'
			animate='animate'
			exit='exit'
			variants={GLOBAL_PAGE_VARIANT}
		>
			{children}
		</motion.div>
	)
}

export default Page
