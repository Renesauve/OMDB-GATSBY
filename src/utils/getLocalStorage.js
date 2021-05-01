import isBrowser from './isBrowser'

export const getLocalStorage = (storageKey) => {
    if (!isBrowser) {
        return null
    }

    const storageItem = window.localStorage.getItem(storageKey)

    const storageItemJSON = storageItem && JSON.parse(storageItem)

    return storageItemJSON
}

export default getLocalStorage