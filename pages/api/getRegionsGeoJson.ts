const fetchGeoJSON = async () => {
	const address = 'https://raw.githubusercontent.com/mozzillation/checolo.re/main/data/regions.geojson'
	const res = await fetch(address)
	const regions = await res.json()

	return regions
}

const getCurrentRegionGeoJson = async () => {

	if ('localStorage' in window) {
		const localStorageCached = window.localStorage.getItem('geojson')

		if (!localStorageCached) {
			const regions = fetchGeoJSON()
			window.localStorage.setItem('geojson', JSON.stringify(regions))
			return regions
		} else {
			return JSON.parse(localStorageCached)
		}

	} else {
		return fetchGeoJSON()
	}

}

export default getCurrentRegionGeoJson
