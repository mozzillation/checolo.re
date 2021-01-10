import { Skeleton } from '../Skeleton'
import { CaretDown } from 'phosphor-react'

import styles from './Toolbar.module.sass'

export function Toolbar({ currentRegion }: { currentRegion: string | string[] }) {

  return <div className={styles.wrapper}>
    <div className={styles.selectorWrapper}>
      <div className={styles.currentRegion}>
        {currentRegion ? currentRegion : <Skeleton />}
        <div className={styles.dropdownIcon}>
          <CaretDown size={21} weight={'bold'} />
        </div>
      </div>
    </div>
    <div>info</div>
  </div>

}