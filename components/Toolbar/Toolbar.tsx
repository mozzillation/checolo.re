import { CaretDown, Info } from 'phosphor-react'
import { motion } from 'framer-motion'

import styles from './Toolbar.module.sass'

const delay = 0.15
const duration = 0.5
const transition = { type: 'tween', ease: 'easeOut', delay, duration }

const V = {
  initial: { opacity: 0, y: -200, transition },
  animate: { opacity: 1, y: 0, transition },
  exit: { opacity: 0, y: -200, transition }
}

export function Toolbar({ currentRegion }: { currentRegion: string | string[] }) {

  return <motion.div className={styles.wrapper}
    initial='initial'
    animate='animate'
    exit='exit'
    variants={V}
  >
    <div className={styles.selectorWrapper}>
      <div className={styles.currentRegion}>
        {currentRegion}
        <div className={styles.dropdownIcon}>
          <CaretDown size={21} weight={'bold'} />
        </div>
      </div>
    </div>
    <div>
      <Info size={21} weight={'bold'} />
    </div>
  </motion.div>

}