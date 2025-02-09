import createStore from '@lib/create-store'
import { auth } from '@pages/login/model'

export const cart = createStore(
  (set, get) => ({
    _state: {
      items: []
    },

    addItem(product, quantity = 1) {
      const { user } = auth.get()
      const productExists = get().items.find(item => item.id === product.id)

      if (productExists) return

      set({
        items: [...get().items, { ...product, quantity, userId: user.sub }]
      })
    },

    updateQuantity(productId, quantity) {
      const { items } = get()
      const updatedItems = items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
      set({ items: updatedItems })
    },

    removeItem(productId) {
      const { items } = get()
      const updatedItems = items.filter(item => item.id !== productId)
      set({ items: updatedItems })
    },

    clearCart() {
      set({ items: [] })
    }
  }),
  'cart'
)
