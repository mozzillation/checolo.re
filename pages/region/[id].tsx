import React, { useContext } from 'react'
import { GlobalContext } from '@component/GlobalContext'
import Flex from '@component/Flex'
import { Footer } from '@/components/Footer/Footer'

import { DatePicker } from '@/components/DatePicker'
import { Toolbar } from '@/components/Toolbar/Toolbar'

import styles from '@/styles/[id].module.sass'
import { useRouter } from 'next/router'
import { CaretDoubleDown } from 'phosphor-react'

const SingleRegion: React.FC = () => {

	const { query } = useRouter()

	const regionName = query.id

	const [{ selectedRegion }, dispatch] = useContext(GlobalContext)

	return (<>
		<Flex>
			<div className={styles.hero} >
				<Toolbar currentRegion={regionName} />
				<DatePicker />
				<Message>
					<span>{regionName}</span> è in zona gialla
				</Message>
				<FurtherContentIndicator>
					Cosa puoi fare?
				</FurtherContentIndicator>
			</div>
			<div>
				Lista di cose
			</div>
			<Footer />
		</Flex>
	</>
	)
}

const Message = ({ children }) => {
	return <div className={styles.messageWrapper}>
		<h2>{children}</h2>
	</div>

}

const FurtherContentIndicator = ({ children }) => {
	return <div className={styles.furtherIndicator}>
		<span className={styles.furtherMessage}>{children}</span>
		<CaretDoubleDown size={21} weight='bold' />
	</div>

}

export default SingleRegion
