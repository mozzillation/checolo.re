import React from 'react'

const About: React.FC = () => {

	return (
		<div>
			<p>
				CheColore ti aiuta a conoscere e rispettare le misure adottate dal Governo 
				per fronteggiare l'emergenza epidemiologica da COVID-19.
			</p>
			<p>
				Ciascun colore prevede precise disposizioni, che potrebbero però cambiare 
				in base a ordinanze o decreti. Per infomazioni ufficiali, consulta sempre 
				le <a href="http://www.governo.it/it/articolo/domande-frequenti-sulle-misure-adottate-dal-governo/15638">FAQ del Governo.</a> 
			</p>
			<p className="authors">
				CheColore è un’idea di Edoardo Guido, Luca Milan, Giuliano Mozzillo e Jacopo Pompilii.
			</p>

		</div>
	)
}

export default About
