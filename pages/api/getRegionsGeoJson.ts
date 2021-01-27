const getCurrentRegionGeoJson = async () => {
	let address

	address = 'https://raw.githubusercontent.com/mozzillation/checolo.re/main/data/regions.geojson'
	const res = await fetch(address)
	const regions = await res.json()

	return regions
}

export default getCurrentRegionGeoJson
