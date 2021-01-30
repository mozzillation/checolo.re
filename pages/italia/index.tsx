import React, { useContext } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Link from 'next/link'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { motion } from 'framer-motion'

import { GlobalContext } from '@component/GlobalContext'
import { DATASET_ADDRESS, ZONES_PROPERTIES } from '@/utils/const'

import styles from './italia.module.sass'

const AllRegions = ({ dataset, content }: AppProps): JSX.Element => {

	const [globalContext, dispatch] = useContext(GlobalContext)

	const regions = Object.entries(content)

	function handleLocationClick() {
		getLocation(null, dispatch, Router, { force: true })
	}

	return (
		<>
			<Head>
				<title>CheColore è l'Italia?</title>
			</Head>
			<motion.div>
				<Header>
					<div className={styles.label}>
						Scegli una regione:
					</div>
					<motion.div
						className={styles.button}
						onClick={handleLocationClick}
						whileHover={{ scale: 1.1, transition: { ease: Back.easeOut } }}
						whileTap={{ scale: 0.9, transition: { ease: Power4.easeOut } }}
						transition={{ duration: 0.25 }}
					>
						<NavigationArrow
							size={24}
							weight='fill'
							mirrored={true}
							style={{ alignSelf: 'center' }}
						/>
					</motion.div>
				</Header>
				<div>
					{regions.map(([name, props]: any) => {
						const { data } = dataset[name]
						const actualCode = data[data.length - 1].code
						const { backgroundColor } = ZONES_PROPERTIES[actualCode].style

						return (
							<Link href={`/${props.url_name}`} key={name}>
								<motion.div
									className={styles.entry}
									style={{ backgroundColor }}
									whileHover={{ height: '10vh' }}
								>
									<span>{props.name}</span>
								</motion.div>
							</Link>
						)
					})}
				</div>

			</motion.div>
			<Footer />
		</>
	)
}

export default AllRegions

const Header = ({ children }) => {
	return (
		<div className={styles.header}>
			{children}
		</div>
	)
}

// ————————————————————————————————————————————————————————————————————————————


import fs from 'fs'
import path from 'path'
import process from 'process'
import * as yaml from 'js-yaml'
import { GetStaticProps } from 'next'
import { NavigationArrow } from 'phosphor-react'
import { getLocation } from '../api'
import { Back, Power4 } from 'gsap'
import { Footer } from '@/components/Footer/Footer'

export const getStaticProps: GetStaticProps = async () => {

	const pathName = path.join(process.cwd(), 'data/content.yaml')

	const yml = yaml.load(fs.readFileSync(pathName, 'utf8')).it

	const content = yml.regions

	const dataset = await fetch(DATASET_ADDRESS)
		.then(r => r.json())

	return {
		props: {
			dataset,
			content
		},
		// revalidate every 12 hours
		revalidate: 43200
	}
}
