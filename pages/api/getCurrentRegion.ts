import { geoContains } from 'd3-geo'
import { Feature } from 'geojson'

export interface GetCurrentRegionProps {
	point: number[]
	features: Feature[]
}

/**
 * Returns current user region by point
 *
 * @param {array} point current coord of user
 * @param {array} features list of all Italian Regions
 * @return {array} region(s) as array of properties
 */

const getCurrentRegion = ({ point, features }: GetCurrentRegionProps) => {

	const currentRegion = new Array()

	features.map(region => {
		if (geoContains(region, point)) {
			currentRegion.push({
				'name': region.properties.reg_name.toLowerCase(),
				'code': region.properties.reg_istat_code_num
			})
		}
	})

	return currentRegion
}

export default getCurrentRegion
