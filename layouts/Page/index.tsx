import React, { useEffect, useContext } from 'react'
import { motion } from 'framer-motion'
import { GlobalContext } from '@component/GlobalContext'

import styles from './Page.module.sass'

const Page = ({ router, children }: { router: any, children?: React.ReactNode }) => {

	const [globalContext, dispatch] = useContext(GlobalContext)

	useEffect(() => {

		dispatch(prev => ({
			...prev,
			appState: {
				...prev.appState,
				loading: false,
				error: false
			}
		}))

	}, [router])

	return (
		<motion.main className={styles.Page} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }} key={router}>
			{children}
		</motion.main>
	)
}

export default Page
