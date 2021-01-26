import { Power4 } from 'gsap'

export const GLOBAL_PAGE_VARIANT = {
	initial: {
		opacity: 0,
		y: 100,
		transformOrigin: 'center center',
		transition: {
			staggerChildren: 0.15,
			staggerDirection: -1,
			when: 'beforeChildren',
			duration: 0.5,
			ease: Power4.easeInOut
		}
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			staggerChildren: 0.15,
			duration: 1,
			ease: Power4.easeInOut
		}
	},
	exit: {
		opacity: 0,
		y: -100,
		transition: {
			staggerChildren: 0.15, staggerDirection: -1, when: 'afterChildren', duration: 0.5,
			ease: Power4.easeInOut
		}
	}
}
