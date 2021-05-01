import isBrowser from "./isBrowser"

export const setLocalStorage = (storageKey, value) => {
  if (!isBrowser) {
    return null
  }

  const valueString = value && JSON.stringify(value)

  const storageItem = window.localStorage.setItem(storageKey, valueString)

  return storageItem
}

export default setLocalStorage
