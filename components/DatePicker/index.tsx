import styles from './DatePicker.module.sass'
import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import { motion } from 'framer-motion'
import { Power4, Back } from 'gsap'
import { DATE_FORMAT } from '@/utils/const'

dayjs.extend(customParseFormat)

const DatePicker = ({ days, current, onSetDate }: { days?: any, current: Dayjs, onSetDate?: (date) => void }) => {

	const handleDate = date => {
		onSetDate(date)
	}

	return (
		<div className={styles.DatePicker}>
			{days.map(day => {

				return (
					<Day date={day} current={current} handleDate={handleDate} key={day} />
				)
			})}

		</div>
	)
}


const Day = ({ date, current, handleDate }: { date: Dayjs, current: Dayjs, handleDate: (props) => void }) => {

	const currentStyle = {
		backgroundColor: '#000',
		color: '#FFF'
	}

	const changeDate = () => {
		handleDate(date)
	}

	const isCurrent = () => {
		return (dayjs(date).format(DATE_FORMAT) === dayjs(current).format(DATE_FORMAT))
	}

	const formattedDay = dayjs(date, DATE_FORMAT).format('D')

	return (
		<motion.div className={styles.Day} onClick={changeDate} whileHover={{ scale: 1.1, transition: { ease: Back.easeOut } }} whileTap={{ scale: 0.9, transition: { ease: Power4.easeOut } }} transition={{ duration: 0.25 }}>
			<div className={styles.Digit} style={isCurrent() ? currentStyle : null}>
				{formattedDay}
			</div>
		</motion.div >
	)
}

export { DatePicker }
