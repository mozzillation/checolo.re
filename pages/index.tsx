import { Component } from 'react'
import Head from 'next/head'

import { IndexProps } from '@utils/domain'
import getCurrentRegion from '@api/getCurrentRegion'
import getRegionsGeoJson from '@api/getRegionsGeoJson'

interface IndexState {
	latitude: number
	longitude: number
	isLoading: boolean
	isError: boolean
	region: any[]
}

export default class Index extends Component<IndexProps, IndexState> {

	constructor(props) {
		super(props)
		this.state = {
			latitude: null,
			longitude: null,
			isLoading: false,
			isError: false,
			region: null
		}

		this.onError = this.onError.bind(this)
	}

	onError(error) {
		this.setState({
			isLoading: false,
			isError: true
		})
	}


	componentDidMount() {
		if ('geolocation' in navigator) {
			this.setState({ isLoading: true })
			navigator.geolocation.getCurrentPosition(position => {
				const point = [position.coords.longitude, position.coords.latitude]
				const { features } = this.props.regions
				const region = getCurrentRegion({ point, features })

				this.setState({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					region,
					isLoading: false
				})
			}, error => this.onError(error))

		} else {
			this.onError({ code: 0 })
		}
	}

	render() {

		if (this.state.isLoading) return (<>loading..</>)
		if (this.state.isError) return (<>errore</>)
		return (
			<div>
				{this.state.region ?.map(region => <div key={region}>{region.name}</div>)}
			</div>
		)
	}
}


export async function getStaticProps() {
	const regions = await getRegionsGeoJson()
	return {
		props: {
			regions
		}
	}
}
