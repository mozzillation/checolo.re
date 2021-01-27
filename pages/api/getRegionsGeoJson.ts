const getCurrentRegionGeoJson = async () => {
	let regions
	let address

	if (process.env.NODE_ENV === 'production') {
		address = 'https://github.com/mozzillation/zone-covid/raw/main/data/regions.geojson'
		regions = await fetch(address).then(res => res.json())
	} else {
		regions = await require('../../data/regions.json')
	}

	return regions
}

export default getCurrentRegionGeoJson
