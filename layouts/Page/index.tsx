import { motion } from 'framer-motion'
import React from 'react'

import { GLOBAL_PAGE_VARIANT } from '@/utils/const'

import styles from './Page.module.sass'


const Page = ({ router, children }: { router?: any, children?: React.ReactNode }) => {

	return (
		<motion.div
			className={styles.Page}
			initial='initial'
			animate='animate'
			exit='exit'
			variants={GLOBAL_PAGE_VARIANT}
			key={router.route}
		>
			{children}
		</motion.div>
	)
}

export default Page
