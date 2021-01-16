import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { CaretDoubleDown } from 'phosphor-react'

import { GlobalContext } from '@component/GlobalContext'
import { DatePicker } from '@component/DatePicker'
import { Toolbar } from '@component/Toolbar/Toolbar'
import { Footer } from '@component/Footer/Footer'

import styles from '@/styles/[id].module.sass'
import Loading from '@/components/Loading'

const HERO_VARIANTS = {
	initial: { opacity: 0 },
	animate: { opacity: 1, transition: { when: 'beforeChildren' } },
	exit: { opacity: 0 }
}

const MESSAGE_VARIANTS = {
	initial: { opacity: 0, y: 50, transition: { delay: 0.5 } },
	animate: { opacity: 1, y: 0, transition: { delay: 0.5 } },
	exit: { opacity: 0, y: -50 }
}

const SingleRegion: React.FC = () => {

	const [{ selectedRegion }, dispatch] = useContext(GlobalContext)

	return selectedRegion ? (
		<div className={styles.wrapper}>
			<motion.div className={styles.hero}
				initial='initial'
				animate='animate'
				exit='exit'
				variants={HERO_VARIANTS}
			>
				<Toolbar currentRegion={selectedRegion.name} />
				<DatePicker />
				<Message>
					<span>{selectedRegion.name}</span> è in zona gialla
				</Message>
				<FurtherContentIndicator>
					Cosa puoi fare?
				</FurtherContentIndicator>
			</motion.div>
			<div>
				Lista di cose
			</div>
			<Footer />
		</div>
	) : <Loading />
}

const Message = ({ children }) => {

	return <motion.div
		className={styles.messageWrapper}
		initial='initial'
		animate='animate'
		exit='exit'
		variants={MESSAGE_VARIANTS}
	>
		<h2>{children}</h2>
	</motion.div>
}

const FurtherContentIndicator = ({ children }) => {
	return <div className={styles.furtherIndicator}>
		<span className={styles.furtherMessage}>{children}</span>
		<CaretDoubleDown size={21} weight='bold' />
	</div>

}

export default SingleRegion
