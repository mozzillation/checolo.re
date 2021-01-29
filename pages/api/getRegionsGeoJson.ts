const fetchGeoJSON = async () => {
	const address = 'https://raw.githubusercontent.com/mozzillation/checolo.re/main/data/regions.geojson'
	const res = await fetch(address)
	const regions = await res.json()

	return regions
}

const getCurrentRegionGeoJson = async () => {

	// if localStorage is not supported
	if ('localStorage' in window) {
		const localStorageCached = window.localStorage.getItem('geojson')

		// if nothing in cache
		if (!localStorageCached) {

			// we fetch the geojson
			const regions = await fetchGeoJSON()

			// and store it in localStorage
			window.localStorage.setItem('geojson', JSON.stringify(regions))
			return regions
		} else {

			// otherwise we parse localStorage's value into an object
			let regions = JSON.parse(localStorageCached)

			// if cached value is object but it's empty for some reason
			if (!Object.keys(regions).length) {

				// we fetch it again
				regions = await fetchGeoJSON()
			}
			return regions
		}
	} else {

		// we fetch!
		return await fetchGeoJSON()
	}
}

export default getCurrentRegionGeoJson
