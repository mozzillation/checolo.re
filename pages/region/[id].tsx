import React, { useContext, useEffect, useState } from 'react'
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

const ZONES_PROPERTIES = {
	1: {
		style: {
			backgroundColor: '#F0CE79',
			color: 'black'
		},
		zoneName: 'gialla'
	},
	2: {
		style: {
			backgroundColor: '#DF9D5E',
			color: 'black'
		},
		zoneName: 'arancione'
	},
	3: {
		style: {
			backgroundColor: '#C2594E',
			color: 'white'
		},
		zoneName: 'rossa'
	}
}

const SingleRegion = ({ region, content, rules, data }: AppProps): JSX.Element => {
	const [{ appState, selectedRegion }, dispatch] = useContext(GlobalContext)

	const lastIndex = data.length - 1
	const totalTimeRange = [data[0].date_start, data[lastIndex].date_end]

	const timeframeIndex = data[lastIndex]
	const zoneIndex = timeframeIndex.code

	const [zoneProps, setZoneProps] = useState(ZONES_PROPERTIES[zoneIndex])

	useEffect(() => {
		if (appState.loading) {
			dispatch(prev => ({
				appState: {
					...prev.appState,
					loading: false
				}
			}))
		}

	}, [])

	return (
		<div className={styles.wrapper}>
			<motion.div className={styles.hero}
				initial='initial'
				animate='animate'
				exit='exit'
				variants={HERO_VARIANTS}
				style={zoneProps.style}
			>
				<Toolbar currentRegion={region} />
				<DatePicker />
				<Message>
					<span>{content.declarative}</span> in zona <span>{zoneProps.zoneName}</span>
				</Message>
				<FurtherContentIndicator>
					Cosa si può fare?
				</FurtherContentIndicator>
			</motion.div>

			<div className={styles.activities} style={{ backgroundColor: 'white', height: '100vh' }}>
				<ActivityCard content={null} />
				<ActivityCard content={null} />
				<ActivityCard content={null} />
			</div>

			<Footer />
		</div>
	)
}

const ActivityCard = ({ content }) => {

	const c = {
		symbol: '🏎',
		title: "Puoi accompagnare un'altra persona che non puo\' usare un mezzo proprio",
		subtitle: "Porta l'autocertificazione"
	}

	return <div className={styles.activityCard}>
		<span role='img' className={styles.emoji}>{c.symbol}</span>
		<span className={styles.title}>{c.title}</span>
		<span className={styles.subtitle}>{c.subtitle}</span>
	</div>
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

import fs from 'fs'
import path from 'path'
import process from 'process'
import * as yaml from 'js-yaml'

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const id: string = params.id.toString()
	const { data } = dataset[id]

	const pathName = path.join(process.cwd(), 'data/content.yaml')

	const yml = yaml.load(fs.readFileSync(pathName, 'utf8')).it

	const content = yml.regions[id]
	const rules = yml.rules

	return {
		props: {
			region: id,
			data,
			content,
			rules
		}
	}
}
