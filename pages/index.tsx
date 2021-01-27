import React, { useContext } from 'react'
import Router from 'next/router'
import { GetServerSideProps } from 'next'
import { FeatureCollection } from 'geojson'
import { GlobalContext } from '@component/GlobalContext'
import { getCurrentRegion, getRegionsGeoJson } from '@api'

import { PrimaryBtn, SecondaryBtn } from '@component/Button'
import { NavigationArrow } from 'phosphor-react'

import styles from '../styles/index.module.sass'
import { motion } from 'framer-motion'
import Link from 'next/link'

const Index = ({ regions }: { regions: FeatureCollection }) => {

	const [globalContext, dispatch] = useContext(GlobalContext)

	const onError = (error: { code: number, message: string }) => {
		dispatch(prev => ({
			...prev,
			appState: {
				...prev.appState,
				error: true,
				loading: false
			},
			error,
			detectedRegion,
			selectedRegion: detectedRegion
		}))

		const detectedRegion = { name: 'lombardia', code: 3 }

		Router.push('/region/[id].js', `/region/${detectedRegion.name}`, {
			shallow: true
		})

	}

	const onGetLocation = () => {

		let detectedRegion

		const locationFromSession = window.sessionStorage.getItem('detected_region')

		if (locationFromSession) {
			// If there's already location data in storage,
			// we use that data...
			detectedRegion = JSON.parse(locationFromSession)

			dispatch(prev => ({
				...prev,
				detectedRegion,
				selectedRegion: detectedRegion
			}))
			// if everything went well, we redirect user to proper region page
			Router.push('/region/[id].js', `/region/${detectedRegion.name}`, {
				shallow: true
			})

			// ...otherwise we query location data
		} else {
			// if device supports geolocation
			if ('geolocation' in navigator) {
				dispatch(prev => ({
					...prev,
					appState: {
						...prev.appState,
						loading: true
					}
				}))
				// get position
				navigator.geolocation.getCurrentPosition(async ({ coords }) => {
					const point = [coords.longitude, coords.latitude]
					const { features } = regions
					const detectedRegionList = await getCurrentRegion({ point, features })
					// get the first detected region
					detectedRegion = detectedRegionList[0]
					// save detected region in storage
					window.sessionStorage.setItem('detected_region', JSON.stringify(detectedRegion))

					dispatch(prev => ({
						...prev,
						detectedRegion,
						selectedRegion: detectedRegion
					}))
					// if everything went well, we redirect user to proper region page
					Router.push('/region/[id].js', `/region/${detectedRegion.name}`, {
						shallow: true
					})

				}, onError)
				// if device DOES NOT support geolocation...
			} else {
				// ...we should redirect to region selection!
				onError({ code: 0, message: 'not authorized' })
			}
		}

	}

	const chv = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 }
	}

	return (
		<motion.div className={styles.wrapper}>
			<motion.div className={styles.mainContent} >
				<img src='/logo.svg' />
				<span>Cosa puoi fare nella tua regione?</span>
			</motion.div>
			<motion.div
				className={styles.actionContainer}
				variants={chv}
				initial='initial'
				animate='animate'
				exit='exit'
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
				<Link href='/region' key={2}>
					<a>
						<SecondaryBtn>Tutte le regioni</SecondaryBtn>
					</a>
				</Link>
			</motion.div>
		</motion.div>
	)



}

export default Index

// ————————————————————————————————————————————————————————————————————————————

export const getServerSideProps: GetServerSideProps = async () => {
	const regions = await getRegionsGeoJson()
	return {
		props: {
			regions
		}
	}
}
