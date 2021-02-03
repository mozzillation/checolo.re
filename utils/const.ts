import { Power4 } from 'gsap'

export const DATE_FORMAT = 'DD/MM/YYYY'
export const DATASET_ADDRESS = 'https://gist.githubusercontent.com/mozzillation/8b06345c17c0625adc2e758ff9f28a19/raw/CheColo.re%2520Data'

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

export const PWA_PROMPT_PROPS = {
	delay: 5000,
	copyTitle: 'Vuoi aggiungermi alla home?',
	copyBody: 'Questo sito può diventare una comoda app, così la puoi usare più facilmente. Non occupa tanto spazio e non ti darà fastidio, promesso!',
	copyShareButtonLabel: '1) Premi il pulsante \'Condividi\'',
	copyAddHomeButtonLabel: '2) Scegli \'Aggiungi alla schermata Home\'',
	copyClosePrompt: 'Chiudi',
	debug: process.env.NODE_ENV !== 'production',
	promptOnVisit: 2,
	timesToShow: 3,
	permanentlyHideOnDismiss: false
}
