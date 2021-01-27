import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { motion } from 'framer-motion'

import { ZONES_PROPERTIES } from '@/utils/const'
import dataset from '@data/dataset.json'

import styles from '@/styles/region.module.sass'

const AllRegions = ({ content }: AppProps): JSX.Element => {

	const regions = Object.entries(content)


	return (
		<>
			<Head>
				<title>CheColore è l'Italia?</title>
			</Head>
			<motion.div>
				<div className={styles.header}>
					<div className={styles.label}>Regioni</div>
				</div>
				<div>
					{regions.map(([name, props]: any) => {
						const { data } = dataset[name]
						const actualCode = data[data.length - 1].code
						const { backgroundColor } = ZONES_PROPERTIES[actualCode].style

						return (
							<Link href={`/${props.url_name}`} key={name}>
								<div className={styles.entry} style={{ backgroundColor }}>
									<span>{props.name}</span>
								</div>
							</Link>
						)
					})}
				</div>

			</motion.div>
		</>
	)
}

export default AllRegions

// ————————————————————————————————————————————————————————————————————————————


import fs from 'fs'
import path from 'path'
import process from 'process'
import * as yaml from 'js-yaml'
import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async () => {

	const pathName = path.join(process.cwd(), 'data/content.yaml')

	const yml = yaml.load(fs.readFileSync(pathName, 'utf8')).it

	const content = yml.regions

	return {
		props: {
			content
		}
	}
}
