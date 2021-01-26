import { Power4 } from 'gsap'

export const GLOBAL_PAGE_VARIANT = {
	initial: {
		opacity: 0,
		y: 50
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: Power4.easeInOut,
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
