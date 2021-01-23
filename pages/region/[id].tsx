import React, { useContext, useEffect } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { motion } from 'framer-motion'
import { CaretDoubleDown } from 'phosphor-react'

import { GlobalContext } from '@component/GlobalContext'
import { DatePicker } from '@component/DatePicker'
import { Toolbar } from '@component/Toolbar/Toolbar'
import { Footer } from '@component/Footer/Footer'

import styles from '@/styles/[id].module.sass'

const HERO_VARIANTS = {
	initial: { opacity: 0 },
	animate: { opacity: 1, transition: { when: 'beforeChildren' } },
	exit: { opacity: 0 }
}

const MESSAGE_VARIANTS = {
	initial: { opacity: 0, y: 50, transition: { delay: 0.5 } },
	animate: { opacity: 1, y: 0, transition: { delay: 0.5 } },
	exit: { opacity: 0, y: -50 }
}

const SingleRegion = ({ region, data }: AppProps): JSX.Element => {
	const [{ selectedRegion }, dispatch] = useContext(GlobalContext)

	useEffect(() => {
		// console.log(region, data)
	}, [])

	return (
		<div className={styles.wrapper}>
			<motion.div className={styles.hero}
				initial='initial'
				animate='animate'
				exit='exit'
				variants={HERO_VARIANTS}
			>
				<Toolbar currentRegion={region} />
				<DatePicker />
				<Message>
					<span>{region}</span> è in zona gialla
				</Message>
				<FurtherContentIndicator>
					Cosa puoi fare?
				</FurtherContentIndicator>
			</motion.div>
			<div>
				Lista di cose
			</div>
			<Footer />
		</div>
	)
}

const Message = ({ children }) => {

	return <motion.div
		className={styles.messageWrapper}
		initial='initial'
		animate='animate'
		exit='exit'
		variants={MESSAGE_VARIANTS}
	>
		<h2>{children}</h2>
	</motion.div>
}

const FurtherContentIndicator = ({ children }) => {
	return <div className={styles.furtherIndicator}>
		<span className={styles.furtherMessage}>{children}</span>
		<CaretDoubleDown size={21} weight='bold' />
	</div>

}

export default SingleRegion

// ————————————————————————————————————————————————————————————————————————————

import dataset from '@data/dataset.json'

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = Object.entries(dataset).map(([name]) => {
		const id = name
		return {
			params: { id }
		}
	})

	return {
		paths,
		fallback: false
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const id: string = params.id.toString()
	const data = dataset[id]

	return {
		props: {
			region: id,
			data
		}
	}
}
