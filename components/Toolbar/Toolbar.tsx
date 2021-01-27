import Link from 'next/link'
import { motion } from 'framer-motion'
import { Back, Power4 } from 'gsap'
import { CaretLeft, Info } from 'phosphor-react'

import styles from './Toolbar.module.sass'

const delay = 0.15
const duration = 0.5
const transition = { type: 'tween', ease: 'easeOut', delay, duration }

const V = {
	initial: { opacity: 0, y: -200, transition },
	animate: { opacity: 1, y: 0, transition },
	exit: { opacity: 0, y: -200, transition }
}

export function Toolbar() {
	return <motion.div className={styles.wrapper}>
		<Link href='/italia'>
			<motion.div
				className={styles.selectorWrapper}
				whileHover={{ scale: 1.1, transition: { ease: Back.easeOut } }}
				whileTap={{ scale: 0.9, transition: { ease: Power4.easeOut } }}
				transition={{ duration: 0.25 }}
			>
				<div className={styles.dropdownIcon}>
					<CaretLeft size={24} weight={'bold'} />
				</div>
				<div className={styles.currentRegion}>
					Regioni
			</div>
			</motion.div>
		</Link>
		<Link href='/about'>
			<Info size={24} weight={'bold'} />
		</Link>
	</motion.div>
}
