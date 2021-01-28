import { SecondaryBtn } from '@/components/Button'
import Router from 'next/router'
import React from 'react'
import styles from './about.module.sass'

const About: React.FC = () => {

	function handleClose() {
		Router.back()
	}

	const externalLink = 'http://www.governo.it/it/articolo/domande-frequenti-sulle-misure-adottate-dal-governo/15638'

	return (
		<>
			<div className={styles.wrapper}>
				<div className={styles.logo}>
					<img src='/logo.svg' height='100%' />
				</div>
				<div className={styles.text}>
					<p>
						CheColore ti aiuta a conoscere e rispettare le misure adottate dal Governo per fronteggiare l'emergenza epidemiologica da COVID-19.
					</p>
					<p>
						Ciascun colore prevede precise disposizioni, che potrebbero però cambiare in base a ordinanze o decreti. Per infomazioni ufficiali, consulta sempre le{' '}
						<a href={externalLink} target='_blank' className={styles.externalLink}>FAQ del Governo.</a>
					</p>
					<p className={styles.authors}>
						CheColore è un’idea di Edoardo Guido, Luca Milan, Giuliano Mozzillo e Jacopo Pompilii.
					</p>
				</div>
				<SecondaryBtn onClick={handleClose}>Chiudi</SecondaryBtn>
			</div>
		</>
	)
}

export default About
