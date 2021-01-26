import React, { useContext, useEffect, useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { CaretDoubleDown } from 'phosphor-react'
import Page from '@layout/Page'

import { GlobalContext } from '@component/GlobalContext'
import { DatePicker } from '@component/DatePicker'
import { Toolbar } from '@component/Toolbar/Toolbar'
import { Footer } from '@component/Footer/Footer'


import styles from '@/styles/[id].module.sass'

const ZONES_PROPERTIES = {
	1: {
		style: {
			backgroundColor: '#ffd602',
			color: 'black'
		},
		zoneName: 'gialla'
	},
	2: {
		style: {
			backgroundColor: '#ff8200',
			color: 'black'
		},
		zoneName: 'arancione'
	},
	3: {
		style: {
			backgroundColor: '#f03f22',
			color: 'white'
		},
		zoneName: 'rossa'
	}
}

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
		<>
			<div className={styles.hero}
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
			</div>

			<div className={styles.activities} style={{ backgroundColor: 'white' }}>
				<ActivityList zoneProps={zoneProps} rules={rules} />
			</div>

			<Footer />
		</>
	)
}


const ActivityList = ({ zoneProps, rules }: { zoneProps: any, rules: any }) => {

	const currentRules = Object.values(rules).filter((el: any) => el.zona.includes(zoneProps.zoneName))

	return (
		<>
			{currentRules ?.map((rule, index) => (
				<ActivityCard rule={rule} key={index} />
			))}

		</>
	)

}


const ActivityCard = ({ rule }) => {

	return (
		<div className={styles.activityCard}>
			<span className={styles.title}>{rule ?.title}</span>
			<span className={styles.subtitle}>{rule ?.subtitle}</span>
		</div>
	)
}

const Message = ({ children }) => {

	return <div className={styles.messageWrapper}>
		<h1>{children}</h1>
	</div>
}

const FurtherContentIndicator = ({ children }) => {
	return <div className={styles.furtherIndicator}>
		<span className={styles.furtherMessage}>{children}</span>
		<motion.div animate={{
			y: [0, 10, 5, 10, 0],
			transition: {
				repeat: Infinity,
				repeatDelay: 1
			}
		}}>
			<CaretDoubleDown size={24} weight='bold' />
		</motion.div>
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
import { motion } from 'framer-motion'
import { GLOBAL_PAGE_VARIANT } from '@/utils/const'

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
