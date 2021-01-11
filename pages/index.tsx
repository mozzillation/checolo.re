import React, { useContext } from 'react'
import Router from 'next/router'
import { GetStaticProps } from 'next'
import { FeatureCollection } from 'geojson'

import { GlobalContext } from '@component/GlobalContext'
import { getCurrentRegion, getRegionsGeoJson } from '@api'

import Loading from '@component/Loading'
import Flex from '@component/Flex'
import { PrimaryBtn, SecondaryBtn } from '@component/Button'

const Index = ({ regions }: { regions: FeatureCollection }) => {

	const [globalContext, dispatch] = useContext(GlobalContext)

	const onError = (error: { code: number, message: string }) => {
		dispatch(prev => ({
			...prev,
			appState: {
				...prev.appState,
				false: false,
				error: true
			},
			error
		}))
	}

	const onGetLocation = () => {
		if ('geolocation' in navigator) {

			dispatch(prev => ({
				...prev,
				appState: {
					...prev.appState,
					loading: true
				}
			}))

			navigator.geolocation.getCurrentPosition(async ({ coords }) => {
				const point = [coords.longitude, coords.latitude]
				const { features } = regions
				const detectedRegionList = await getCurrentRegion({ point, features })

				const [detectedRegion] = detectedRegionList

				// Save detected region
				window.sessionStorage.setItem('detected_region', JSON.stringify(detectedRegion))

				dispatch(prev => ({
					...prev,
					appState: {
						...prev.appState,
						loading: true
					},
					detectedRegion
				}))

				Router.push(`/region/${detectedRegion.name.toLowerCase()}`)

			}, onError)
		} else {
			onError({ code: 0, message: 'not authorized' })
		}
	}

	return (

		<>
			<Flex backgroundColor='#000000'>
				{globalContext.appState.error ? <>errore</> : null}
				{globalContext.appState.loading ? <Loading /> : null}

				<div style={{ paddingBottom: 16 }}>
					<PrimaryBtn onClick={onGetLocation}>Vai alla mia regione</PrimaryBtn>
				</div>
				<div>
					<SecondaryBtn>Tutte le regioni</SecondaryBtn>
				</div>
			</Flex>
		</>
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
