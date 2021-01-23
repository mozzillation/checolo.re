import React, { useContext } from 'react'
import Router from 'next/router'
import { GetStaticProps } from 'next'
import { FeatureCollection } from 'geojson'
import { GlobalContext } from '@component/GlobalContext'
import { getCurrentRegion, getRegionsGeoJson } from '@api'

import Flex from '@component/Flex'
import { PrimaryBtn, SecondaryBtn } from '@component/Button'
import { motion } from 'framer-motion'

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
			error
		}))
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
			Router.push(`/region/${detectedRegion.name}`)

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
					Router.push(`/region/${detectedRegion.name}`)

				}, onError)
				// if device DOES NOT support geolocation...
			} else {
				// ...we should redirect to region selection!
				onError({ code: 0, message: 'not authorized' })
			}
		}

	}

	// temporary, just to have some funnn
	const v = {
		animate: { transition: { staggerChildren: 0.15 } },
		exit: { transition: { staggerChildren: 0.15, when: 'afterChildren' } }
	}

	const chv = {
		initial: { opacity: 0, scale: 0.8, y: 20 },
		animate: { opacity: 1, scale: 1, y: 0 },
		exit: { opacity: 0, scale: 0.8, y: -60 }
	}

	return (
		<Flex>
			<motion.div
				initial='initial'
				animate='animate'
				exit='exit'
				variants={v}
				style={{ textAlign: 'center' }}
			>
				<motion.div style={{ paddingBottom: 16 }} variants={chv} key={1}>
					<PrimaryBtn onClick={onGetLocation}>Vai alla mia regione</PrimaryBtn>
				</motion.div>
				<motion.div variants={chv} key={2}>
					<SecondaryBtn>Tutte le regioni</SecondaryBtn>
				</motion.div>
			</motion.div>
		</Flex>
	)



}

export default Index


// ————————————————————————————————————————————————————————————————————————————

export const getStaticProps: GetStaticProps = async () => {
	const regions = await getRegionsGeoJson()
	return {
		props: {
			regions
		}
	}
}
