import config from './config'

const appName = config.appName.toLowerCase().replace(' ', '-')

/*
 * const count = createStore((set, get) => ({
 *  _state: { count: 0, products: [] },
 *  increment: () => set({ count: get().count + 1 })
 *  fetchProducts: async () => set({ products })
 * }))
 */
const createStore = (callback, persist) => {
  let store = { _state: null }

  const set = newState => {
    store._state = { ...store._state, ...newState }

    if (persist) {
      localStorage.setItem(
        `${appName}-${persist}`,
        JSON.stringify(store._state)
      )
    }
  }

  const get = () => {
    return store._state
  }

  const newStore = callback(set, get)
  store = {
    ...store,
    get,
    set,
    ...newStore
  }

  if (persist) {
    const value = localStorage.getItem(`${appName}-${persist}`)
    store._state = value ? JSON.parse(value) : newStore._state
  }

  return store
}

export default createStore
