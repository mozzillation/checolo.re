import * as d3 from 'd3-geo'
import { GetCurrentRegionProps } from '@utils/domain'

const getCurrentRegion = ({ point, features }: GetCurrentRegionProps) => {
	console.log(features)
	const currentRegion = new Array()
	features.map((region, index) => {
		if (d3.geoContains(region, point)) {
			currentRegion.push({
				'name': region.properties.reg_name,
				'code': region.properties.reg_istat_code_num
			})
		}
	})

	return currentRegion
}

export default getCurrentRegion
