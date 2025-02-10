import api from '@lib/api'
import createStore from '@lib/create-store'

export const adminProducts = createStore((set, get) => ({
  _state: {
    products: []
  },

  async fetchProducts() {
    const { isError, error, data: products } = await api.get('/products')
    if (isError) return { isError }

    set({ products })
    return { isError }
  },

  async addProduct(product) {
    const { isError, error, data } = await api.post('/products', product)
    if (isError) return { isError, error }

    set({ products: [...get().products, data] })
    return { isError, data }
  },

  async deleteProduct(productId) {
    const { isError, error } = await api.delete(`/products/${productId}`)
    if (isError) return { error }

    const products = get().products.filter(p => p.id !== productId)
    set({ products })
    return { isError }
  }
}))
