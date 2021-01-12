import { Component, createRef } from 'react'
import styles from './Loading.module.sass'
import { Circle } from 'phosphor-react'
import { Back, gsap } from 'gsap'
import { motion } from 'framer-motion'


class Loading extends Component {

	private Circle1 = createRef<SVGSVGElement>()
	private Circle2 = createRef<SVGSVGElement>()
	private Circle3 = createRef<SVGSVGElement>()

	constructor(props) {
		super(props)
	}

	componentDidMount() {
		gsap.timeline({
			repeat: -1
		})
			.set([this.Circle1.current, this.Circle2.current, this.Circle3.current], {
				transformOrigin: 'center center'
			})
			.to([this.Circle1.current, this.Circle2.current, this.Circle3.current],
				{ y: 0, duration: 0.5, delay: -0.45, stagger: 0.05, ease: Back.easeOut }
			)
			.to([this.Circle1.current, this.Circle2.current, this.Circle3.current],
				{ y: -15, scale: 0.5, duration: 0.5, delay: -0.45, stagger: 0.05, ease: Back.easeOut }
			)
			.to([this.Circle1.current, this.Circle2.current, this.Circle3.current],
				{ y: 30, duration: 0.5, delay: -0.45, stagger: 0.05, ease: Back.easeOut }
			)
			.to([this.Circle1.current, this.Circle2.current, this.Circle3.current],
				{ y: 0, duration: 0.5, scale: 1, delay: -0.45, stagger: 0.05, ease: Back.easeOut }
			)
	}

	render() {
		return (
			<motion.div className={styles.Loading} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
				<Circle size={16} weight='fill' ref={this.Circle1} color={'#ffd602'} />
				<Circle size={16} weight='fill' ref={this.Circle2} color={'#ff8200'} />
				<Circle size={16} weight='fill' ref={this.Circle3} color={'#f03f22'} />
			</motion.div>
		)
	}
}


export default Loading
