import React, { useContext } from 'react'
import Router from 'next/router'
import { GlobalContext } from '@component/GlobalContext'
import { getLocation } from '@api'

import { PrimaryBtn, SecondaryBtn } from '@component/Button'
import { NavigationArrow } from 'phosphor-react'

import styles from '../styles/index.module.sass'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Footer } from '@/components/Footer/Footer'
const Index = () => {

	const [globalContext, dispatch] = useContext(GlobalContext)

	const onGetLocation = () => {
		getLocation(null, dispatch, Router)
	}

	const chv = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 }
	}

	return (
		<>
			<motion.div className={styles.wrapper}>
				<motion.div className={styles.mainContent} >
					<div className={styles.logo}>
						<img src='/logo.svg' alt='CheColore Logo' />
					</div>
					<span>Scopri cosa puoi fare nella tua regione in base al colore e alle restrizioni dell'ultimo DPCM del Governo Italiano.</span>
				</motion.div>
				<motion.div
					className={styles.actionContainer}
					initial='initial'
					animate='animate'
					exit='exit'
					variants={chv}
				>
					<PrimaryBtn onClick={onGetLocation}>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<span className={styles.label} >Usa la mia posizione</span>
							<NavigationArrow
								size={24}
								weight='fill'
								mirrored={true}
								style={{ alignSelf: 'center' }} />
						</div>
					</PrimaryBtn>
					<Link href='/italia' key={2}>
						<SecondaryBtn>
							Tutte le regioni
					</SecondaryBtn>
					</Link>
				</motion.div>
			</motion.div>
			<Footer />
		</>
	)



}

export default Index
