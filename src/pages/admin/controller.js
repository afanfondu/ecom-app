import '@styles/globals.scss'
import * as bootstrap from 'bootstrap'
import navbar from '@components/navbar'
import { auth } from '@pages/login/model'
import productsTable from './views/products-table'
import { adminProducts } from './model'

const init = async () => {
  const user = auth.get().user
  if (!user || user.user !== 'donero') return (window.location.href = '/')

  navbar.render(user)
  navbar.logoutHandler(auth.logout)

  productsTable.renderSpinner()
  const { isError } = await adminProducts.fetchProducts()
  if (isError) return productsTable.renderError()
  productsTable.render(adminProducts.get().products)

  productsTable.deleteHandler(async productId => {
    const { isError, error } = await adminProducts.deleteProduct(
      Number(productId)
    )
    return { isError }
  })

  productsTable.addProductHandler(async productData => {
    const { isError, data } = await adminProducts.addProduct(productData)
    return { isError, data }
  })
}

init()
