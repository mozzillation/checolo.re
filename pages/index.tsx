import React, { useContext } from 'react'
import Router from 'next/router'
import { GetStaticProps } from 'next'
import { FeatureCollection } from 'geojson'

import { GlobalContext } from '@component/GlobalContext'
import { getCurrentRegion, getRegionsGeoJson } from '@api'

import { PrimaryBtn } from '@component/Button'

const Index = ({ regions }: { regions: FeatureCollection }) => {

	const [globalContext, dispatch] = useContext(GlobalContext)

	const onError = (error: { code: number, message: string }) => {
		dispatch(prev => ({
			...prev,
			appState: {
				...prev.appState,
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
						loading: false
					},
					detectedRegion
				}))

				Router.push(`/region/${detectedRegion.name.toLowerCase()}`)

			}, onError)
		} else {
			onError({ code: 0, message: 'not authorized' })
		}
	}

	if (globalContext.appState.error) return (<>errore</>)
	if (globalContext.appState.loading) return (<>loading...</>)

	return (
		<PrimaryBtn onClick={onGetLocation}>Vai alla mia regione</PrimaryBtn>
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
