async function sessionStorageProperty(prop: string) {
  const { sessionStorage } = window

  const region = sessionStorage.getItem(prop)

  if (region) {
    return JSON.parse(region)
  }
}

export default sessionStorageProperty