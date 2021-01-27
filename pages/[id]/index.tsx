import React, { useContext, useEffect, useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { motion } from 'framer-motion'
import { Back } from 'gsap'
import { ArrowLineUpRight, CaretDoubleDown, ChatDots, IconProps } from 'phosphor-react'
import Head from 'next/head'

import { GlobalContext } from '@component/GlobalContext'
import { DatePicker } from '@component/DatePicker'
import { Toolbar } from '@component/Toolbar/Toolbar'
import { Footer } from '@component/Footer/Footer'
import { ZONES_PROPERTIES } from '@/utils/const'

import styles from './region.module.sass'

import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(customParseFormat)
dayjs.extend(isBetween)
dayjs.extend(isSameOrBefore)

function getDates(today, startDate, stopDate) {
	const dateArray = new Array()
	let currentDate = startDate

	while (currentDate.isSameOrBefore(stopDate)) {
		if (currentDate.isBetween(today, stopDate, 'day', '[]')) {
			dateArray.push(currentDate)
		}
		currentDate = dayjs(currentDate).add(1, 'day')
	}

	return dateArray
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

	const today = dayjs()

	const currentRangeStart = dayjs(data[0].date_start, 'DD/MM/YYYY')
	const currentRangeEnd = dayjs(data[lastIndex].date_end, 'DD/MM/YYYY')

	const range = getDates(today, currentRangeStart, currentRangeEnd)

	return (
		<>
			<Head>
				<title>CheColore è {content.seo}?</title>
			</Head>
			<motion.div>
				<div
					className={styles.hero}
					style={zoneProps.style}
				>
					<Toolbar />
					<DatePicker days={range} properties={ZONES_PROPERTIES} current={today} />
					<Message>
						<span>{content.declarative}</span> in zona <span>{zoneProps.zoneName}</span>
					</Message>
					<FurtherContentIndicator>
						Cosa si può fare?
				</FurtherContentIndicator>
				</div>

				<div className={styles.activities} >
					<ActivityList zoneProps={zoneProps} rules={rules} />
				</div>

				<Disclaimer weight={'bold'} href={content.website} />
				<Footer />
			</motion.div>
		</>
	)
}

const Disclaimer = ({ weight = 'regular', href }: { weight?: IconProps['weight'], href?: string }) => {

	return (
		<a href={href} target='_blank'>
			<div className={styles.disclaimer}>
				<div className={styles.disclaimerIcon}>
					{/* <ChatDots size={32} weight={weight} mirrored={true} /> */}
				</div>
				<div className={styles.disclaimerText} >
					<div className={styles.primaryLabel}>
						Hai bisogno di altre info?
					</div>
					<div className={styles.secondaryLabel}>
						Clicca qui per consultare il sito della tua regione
					</div>
				</div>
				<div className={styles.disclaimerIcon}>
					<ArrowLineUpRight size={32} weight={weight} />
				</div>
			</div>
		</a>
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
			<span className={styles.emoji}>{rule ?.emoji}</span>
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
				repeatDelay: 1,
				duration: 1.5,
				ease: Back.easeInOut
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
import Link, { LinkProps } from 'next/link'
import { Url } from 'url'

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
