import React, { useContext, useEffect, useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { AnimatePresence, motion } from 'framer-motion'
import { Back, Power4 } from 'gsap'
import { ArrowLineUpRight, CaretDoubleDown, ChatDots, IconProps } from 'phosphor-react'
import Head from 'next/head'

import { GlobalContext } from '@component/GlobalContext'
import { DatePicker } from '@component/DatePicker'
import { Toolbar } from '@component/Toolbar/Toolbar'
import { Footer } from '@component/Footer/Footer'
import { DATE_FORMAT, ZONES_PROPERTIES } from '@/utils/const'

import styles from './region.module.sass'

import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

require('dayjs/locale/it')
dayjs.locale('it')

dayjs.extend(customParseFormat)
dayjs.extend(isBetween)
dayjs.extend(isSameOrBefore)

function getDates(today, startDate, stopDate) {
	const dateArray = new Array()
	const emptyDates = new Array()
	let currentDate = startDate

	while (currentDate.isSameOrBefore(stopDate)) {
		if (currentDate.isBetween(today, stopDate, 'day', '[]')) {
			dateArray.push({ currentDate, empty: false })
		}
		currentDate = dayjs(currentDate).add(1, 'day')
	}

	[...Array(14).keys()].map(el => {
		emptyDates.push({ currentDate, empty: true })
		currentDate = dayjs(currentDate).add(1, 'day')
	})

	return [...dateArray, ...emptyDates]
}


const SingleRegion = ({ content, rules, data }: AppProps): JSX.Element => {
	const [{ appState }, dispatch] = useContext(GlobalContext)

	const today = dayjs()

	const lastIndex = data.length - 1

	const [timerangeIndex, setTimerangeIndex] = useState(lastIndex)
	const [currentDate, setCurrentDate] = useState(today)

	const timeRangeZoneCode = data[timerangeIndex].code


	const zoneProps = ZONES_PROPERTIES[timeRangeZoneCode]

	const rangeStart = dayjs(data[0].date_start, DATE_FORMAT)
	const rangeEnd = dayjs(data[lastIndex].date_end, DATE_FORMAT)

	const range = getDates(today, rangeStart, rangeEnd)

	const completeDate = currentDate.format('dddd D MMMM YYYY')

	useEffect(() => {
		// done this way because for loop is
		// fucking faster than array methods
		for (let i = 0; i < data.length; i++) {
			const currentRange = data[i]
			const currentRangeStart = dayjs(currentRange.date_start, DATE_FORMAT)
			const currentRangeEnd = dayjs(currentRange.date_end, DATE_FORMAT)
			const d = currentDate.isBetween(currentRangeStart, currentRangeEnd, 'day', '[]')

			if (d === true) setTimerangeIndex(i)
		}
	}, [currentDate])

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
			<Head>
				<title>CheColore è {content.seo}?</title>
			</Head>
			<motion.div>
				<motion.div
					className={styles.hero}
					animate={zoneProps.style}
				>
					<Toolbar />
					<DatePicker days={range} current={currentDate} onSetDate={setCurrentDate} />

					<AnimatePresence exitBeforeEnter={true}>
						<Message key={completeDate}>
							<div className={styles.dateFormatted}>
								{completeDate}
							</div>
							<span>{content.declarative}</span> in zona <span>{zoneProps.zoneName}</span>
						</Message>
					</AnimatePresence>

					<FurtherContentIndicator>
						Cosa si può fare?
					</FurtherContentIndicator>
				</motion.div>

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
			{currentRules?.map((rule, index) => (
				<ActivityCard rule={rule} key={index} />
			))}

		</>
	)

}


const ActivityCard = ({ rule }) => {

	return (
		<div className={styles.activityCard}>
			<span className={styles.emoji}>{rule?.emoji}</span>
			<span className={styles.title}>{rule?.title}</span>
			<span className={styles.subtitle}>{rule?.subtitle}</span>
		</div>
	)
}

const Message = ({ children }) => {

	return (
		<motion.div className={styles.messageWrapper} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ ease: Power4.easeInOut }}>
			<h1>{children}</h1>
		</motion.div >
	)

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

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const id: string = params.id.toString()
	const { data } = dataset[id]

	const pathName = path.join(process.cwd(), 'data/content.yaml')

	const yml = yaml.load(fs.readFileSync(pathName, 'utf8')).it

	const content = yml.regions[id]
	const rules = yml.rules

	return {
		props: {
			data,
			content,
			rules
		}
	}
}
