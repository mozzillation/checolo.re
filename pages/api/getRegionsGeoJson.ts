
const getCurrentRegionGeoJson = async () => {
	const res = await fetch('https://github.com/mozzillation/zone-covid/raw/main/data/regions.geojson')
	const regions = await res.json()

	return regions
}

export default getCurrentRegionGeoJson
