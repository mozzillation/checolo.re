const fetchGeoJSON = async () => {
	const address = 'https://raw.githubusercontent.com/mozzillation/checolo.re/main/data/regions.geojson'
	const res = await fetch(address)
	const regions = await res.json()

	return regions
}

const getCurrentRegionGeoJson = async () => {
	let lastSet = window.localStorage.getItem('geojson_lastSet')

	// if no last set value
	if (!lastSet) {
		// ugly af but effective
		lastSet = String(0)
	}

	// if localStorage is supported
	if ('localStorage' in window) {

		const localStorageCached = window.localStorage.getItem('geojson')
		// 4 days have passed since last fetch
		const cacheTooOld = daysPassed(lastSet) >= 4

		// if nothing in cache or cached value is too old
		if (!localStorageCached || cacheTooOld) {

			// we fetch the geojson
			const regions = await fetchGeoJSON()

			// and try store it in localStorage
			// try {
			// 	window.localStorage.setItem('geojson', JSON.stringify(regions))
			// 	window.localStorage.setItem('geojson_lastSet', Date.now().toString())
			// } catch (e) {
			// 	window.localStorage.removeItem('geojson')
			// 	window.localStorage.removeItem('geojson_lastSet')
			// }

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
		// if localStorage is NOT supported, we fetch!
		return await fetchGeoJSON()
	}
}

function daysPassed(dt: string) {
	const parsed: number = +dt

	const current: any = Date.now()
	const previous: any = new Date(parsed)

	return Math.ceil((current - previous + 1) / 86400000)
}

export default getCurrentRegionGeoJson
