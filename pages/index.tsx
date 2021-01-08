import React, { Component, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'


import { getCurrentRegion, getRegionsGeoJson } from '@api'

import { Feature, FeatureCollection } from 'geojson'
import { GetStaticProps } from 'next'


import { PrimaryBtn } from '@component/Button'

interface IndexState {
	loading?: boolean
	error?: boolean
	region?: null | any[]
}

const Index = ({ regions }: { regions: FeatureCollection }) => {

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [region, setRegion] = useState(null)

	const router = useRouter()


	const onError = (err: { code: number, message: string }) => {
		setLoading(false)
		setLoading(true)
	}


	const onGetLocation = () => {
		if ('geolocation' in navigator) {

			setLoading(true)

			navigator.geolocation.getCurrentPosition(async position => {
				const point = [position.coords.longitude, position.coords.latitude]
				const { features } = regions
				const currentRegion = await getCurrentRegion({ point, features })

				setRegion(currentRegion)
				router.push(`/region/${currentRegion[0].name}`)

			}, err => onError(err))
		} else {
			onError({ code: 0, message: 'not authorized' })
		}
	}

	if (loading) return (<>loading...</>)
	if (error) return (<>errore</>)

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
