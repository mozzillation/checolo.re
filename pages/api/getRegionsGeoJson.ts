const getCurrentRegionGeoJson = async () => {
	const res = await fetch('https://raw.githubusercontent.com/mozzillation/zone-covid/main/data/regions.geojson')
	const regions = await res.json()

	return regions
}

export default getCurrentRegionGeoJson
