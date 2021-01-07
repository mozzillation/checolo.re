import { Feature, FeatureCollection } from 'geojson'

export interface GetCurrentRegionProps {
	point: number[]
	features: Feature[]
}


export interface IndexProps {
	regions: FeatureCollection
}
