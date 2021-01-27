const getCurrentRegionGeoJson = async () => {
	let address

	if (process.env.NODE_ENV === 'production') {
		address = 'https://github.com/mozzillation/checolo.re/raw/main/data/regions.geojson'
	} else {
		address = 'https://github.com/mozzillation/checolo.re/blob/main/data/regions.geojson?raw=true'
	}

	const res = await fetch(address)
	const regions = await res.json()

	return regions
}

export default getCurrentRegionGeoJson
