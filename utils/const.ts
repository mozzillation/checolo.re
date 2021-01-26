export const GLOBAL_PAGE_VARIANT = {
  initial: {
    opacity: 0, y: 100,
    transition: {
      staggerChildren: 0.15, staggerDirection: -1, when: 'beforeChildren'
    }
  },
  animate: {
    opacity: 1, y: 0,
    transition: {
      staggerChildren: 0.15
    }
  },
  exit: {
    opacity: 0, y: -100,
    transition: {
      staggerChildren: 0.15, staggerDirection: -1, when: 'afterChildren'
    }
  }
}

