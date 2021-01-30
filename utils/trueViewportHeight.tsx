const trueViewportHeight = () => {
  document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`)
}

export default trueViewportHeight