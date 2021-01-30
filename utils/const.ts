import { Power4 } from 'gsap'

export const DATE_FORMAT = 'DD/MM/YYYY'
export const DATASET_ADDRESS = 'https://gist.githubusercontent.com/mozzillation/8b06345c17c0625adc2e758ff9f28a19/raw/1d5452d46de3463c03c4da554bebc0d2d29799b2/CheColo.re%2520Data'

export const GLOBAL_PAGE_VARIANT = {
	initial: {
		opacity: 0,
		y: 50
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			// delay: 0.5,
			duration: 0.5,
			ease: Power4.easeInOut
		}
	},
	exit: {
		opacity: 0,
		y: -50,
		transition: {
			duration: 0.5,
			ease: Power4.easeInOut
		}
	}
}

export const ZONES_PROPERTIES = {
	1: {
		style: {
			backgroundColor: '#ffd602',
			color: 'black'
		},
		zoneName: 'gialla'
	},
	2: {
		style: {
			backgroundColor: '#ff8200',
			color: 'black'
		},
		zoneName: 'arancione'
	},
	3: {
		style: {
			backgroundColor: '#f03f22',
			color: 'white'
		},
		zoneName: 'rossa'
	}
}

