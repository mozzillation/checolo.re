import { Power4 } from 'gsap'

export const GLOBAL_PAGE_VARIANT = {
	initial: {
		opacity: 0,
		y: 50,
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: Power4.easeInOut,
			delay: 0.5,
			staggerChildren: 0.1,
			staggerDirection: 1,
			when: 'beforeChildren',
			delayChildren: 10,
		}
	},
	exit: {
		opacity: 0,
		y: -50,
		transition: {
			staggerChildren: 1,
			staggerDirection: -1,
			when: 'afterChildren',
			duration: 0.5,
			ease: Power4.easeInOut
		}
	}
}
