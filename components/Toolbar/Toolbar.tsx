import { CaretDown, Info } from 'phosphor-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

import styles from './Toolbar.module.sass'

const delay = 0.15
const duration = 0.5
const transition = { type: 'tween', ease: 'easeOut', delay, duration }

const V = {
	initial: { opacity: 0, y: -200, transition },
	animate: { opacity: 1, y: 0, transition },
	exit: { opacity: 0, y: -200, transition }
}

export function Toolbar({ currentRegion }: { currentRegion: string | string[] }) {

	return <motion.div className={styles.wrapper}>
		<div className={styles.selectorWrapper}>
			<div className={styles.currentRegion}>
				{currentRegion}
			</div>
			<div className={styles.dropdownIcon}>
				<CaretDown size={24} weight={'bold'} />
			</div>
		</div>
		<div>
			<Link href='/about'>
				<Info size={24} weight={'bold'} />
			</Link>
		</div>
	</motion.div>

}
