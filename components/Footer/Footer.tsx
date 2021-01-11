import { ArrowCircleUp, ArrowLineUpRight, ChatDots, IconProps } from 'phosphor-react'
import styles from './Footer.module.sass'

export function Footer() {

  return <>
    <Disclaimer weight={"bold"} />
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.logo}>Zone···Covid</div>
        <div className={styles.links}>
          <div>Info</div>
          <div>Segnala un problema</div>
          <div>Privacy Policy</div>
          <div>Note Legali</div>
        </div>
        <div className={styles.backToTop}>
          <ArrowCircleUp size={36} weight={'regular'} />
        </div>
      </div>
    </footer>
  </>
}

const Disclaimer = ({ weight = 'regular' }: { weight?: IconProps["weight"] }) => {
  return <div className={styles.disclaimer}>
    <div className={styles.disclaimerIcon}>
      <ChatDots size={32} weight={weight} mirrored={true} />
    </div>
    <div className={styles.disclaimerText} >
      Per ulteriori ordinanze ad hoc, consulta il sito della tua regione</div>
    <div className={styles.disclaimerIcon}>
      <ArrowLineUpRight size={32} weight={weight} />
    </div>
  </div>

}