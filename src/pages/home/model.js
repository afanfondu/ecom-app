import api from '@lib/api'
import createStore from '@lib/create-store'

export const products = createStore((set, get) => ({
  _state: {
    products: [],
    currentPage: 1,
    limit: 10,
    totalPages: 0,
    category: null
  },

  async fetchProducts() {
    const { currentPage, limit, category } = get()
    const endpoint = category ? `/products/category/${category}` : '/products'

    const { isError, error, data: products } = await api.get(endpoint)
    if (isError) return error

    const start = (currentPage - 1) * limit
    const end = start + limit
    const paginatedProducts = products.slice(start, end)
    const totalPages = Math.ceil(products.length / limit)

    set({ products: paginatedProducts, totalPages })
  },

  setPage(currentPage) {
    set({ currentPage })
  },

  setCategory(category) {
    set({ category })
  }
}))
