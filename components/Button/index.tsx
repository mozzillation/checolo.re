import React from 'react'
import { motion } from 'framer-motion'
import styles from './Button.module.sass'
import { Power4, Back } from 'gsap'

const PrimaryBtn = ({ children, onClick }: { children?: React.ReactNode, onClick?: () => void }) => {

	return (
		<motion.button onClick={onClick} className={styles.Primary} whileHover={{ scale: 1.1, transition: { ease: Back.easeOut } }} whileTap={{ scale: 0.9, transition: { ease: Power4.easeOut } }} transition={{ duration: 0.25 }}>
			{children}
		</motion.button>
	)
}

const SecondaryBtn = ({ children, onClick }: { children?: React.ReactNode, onClick?: () => void }) => {

	return (
		<motion.button onClick={onClick} className={styles.Secondary} whileHover={{ scale: 1.1, transition: { ease: Back.easeOut } }} whileTap={{ scale: 0.9, transition: { ease: Power4.easeOut } }} transition={{ duration: 0.25 }}>
			{children}
		</motion.button>
	)
}

export { PrimaryBtn, SecondaryBtn }
