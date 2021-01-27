import styles from './DatePicker.module.sass'
import { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import { motion } from 'framer-motion'
import { Power4, Back } from 'gsap'

dayjs.extend(customParseFormat)


const DatePicker = ({ days, current, properties }: { days?: any, current: Dayjs, properties: any }) => {

	const [currentDate, setCurrentDate] = useState(current)


	const handleDate = date => {
		setCurrentDate(date)
	}

	return (
		<div className={styles.DatePicker}>
			{days.map(day => {

				return (
					<Day date={day} color={1} properties={properties} current={currentDate} handleDate={handleDate} key={day} />
				)
			})}

		</div>
	)
}


const Day = ({ date, color, properties, current, handleDate }: { date: Dayjs, color: number, properties: any, current: Dayjs, handleDate: (props) => void }) => {


	const { style } = properties[color]
	const currentStyle = {
		backgroundColor: '#000',
		color: '#FFF'
	}

	const changeDate = () => {
		handleDate(date)
	}

	const isCurrent = () => {

		return (dayjs(date).format('DD/MM/YYYY') === dayjs(current).format('DD/MM/YYYY'))
	}

	const dateFormat = dayjs(date, 'DD/MM/YYYY').format('D')

	return (
		<motion.div className={styles.Day} onClick={changeDate} whileHover={{ scale: 1.1, transition: { ease: Back.easeOut } }} whileTap={{ scale: 0.9, transition: { ease: Power4.easeOut } }} transition={{ duration: 0.25 }}>
			<div className={styles.Digit} style={isCurrent() ? currentStyle : style}>
				{dateFormat}
			</div>
		</motion.div >
	)
}

export { DatePicker }
