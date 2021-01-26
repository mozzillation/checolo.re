
const getCurrentRegionGeoJson = async () => {
	const res = await fetch('https://github.com/mozzillation/zone-covid/blob/main/data/dataset.json?raw=true')
	const regions = await res.json()

	return regions
}

export default getCurrentRegionGeoJson
