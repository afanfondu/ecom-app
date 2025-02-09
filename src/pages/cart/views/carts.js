import View from '@components/view'
import toast from '@components/toast'

const MAX_QUANTITY = 10

class CartView extends View {
  _container = document.querySelector('#container')
  _errorMessage = 'Failed to load cart items. Please try again.'

  _generateMarkup() {
    const items = this._data

    return `
      <div class="container mt-5">
        <h2 class="mb-4">Shopping Cart</h2>
        ${
          items.length === 0
            ? this._generateEmptyCart()
            : `
                <div class="row">
                  <div class="col-lg-8">
                    ${items.map(item => this._generateCartItem(item)).join('')}
                  </div>
                  <div id="order-summary" class="col-lg-4">
                    ${this._generateOrderSummary(items)}
                  </div>
                </div>
              `
        }
      </div>
    `
  }

  _generateEmptyCart() {
    return `
      <div class="text-center py-5">
        <i class="bi bi-cart-x display-1 text-muted mb-4"></i>
        <h3 class="text-muted">Your cart is empty</h3>
        <a href="/" class="btn btn-primary mt-3">Continue Shopping</a>
      </div>
    `
  }

  _generateCartItem(item) {
    return `
      <div class="card mb-3 shadow-sm cart-item" data-product-id="${item.id}">
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col-md-2">
              <img src="${item.image}" class="img-fluid rounded" alt="${
                item.title
              }">
            </div>
            <div class="col-md-5">
              <h5 class="card-title mb-2">${item.title}</h5>
              <p class="card-text text-muted mb-0">$${item.price}</p>
            </div>
            <div class="col-md-3">
              <div class="input-group">
                <button class="btn btn-outline-secondary quantity-btn" type="button" data-action="decrease">-</button>
                <input type="number" class="form-control text-center quantity-input" value="${
                  item.quantity
                }" min="1" max="${MAX_QUANTITY}">
                <button class="btn btn-outline-secondary quantity-btn" type="button" data-action="increase">+</button>
              </div>
            </div>
            <div class="col-md-2 text-end ">
              <button class="btn btn-link text-danger remove-button" type="button">
                <i class="bi bi-trash remove-button"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `
  }

  _generateOrderSummary(items) {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    return `
      <div class="card shadow-sm">
        <div class="card-body">
          <h5 class="card-title mb-4">Order Summary</h5>
          <div class="d-flex justify-content-between mb-3">
            <span>Subtotal</span>
            <span>$${total.toFixed(2)}</span>
          </div>
          <div class="d-flex justify-content-between mb-3">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <hr>
          <div class="d-flex justify-content-between mb-4">
            <strong>Total</strong>
            <strong>$${total.toFixed(2)}</strong>
          </div>
          <button class="btn btn-primary w-100 place-order-button">Place Order</button>
        </div>
      </div>
    `
  }

  renderOrderSummary(items) {
    if (items.length === 0) return

    this._container.querySelector('#order-summary').innerHTML =
      this._generateOrderSummary(items)
  }

  quantityHandler(handler) {
    this._container.addEventListener('click', async e => {
      if (!e.target.classList.contains('quantity-btn')) return

      const productId = e.target.closest('.cart-item').dataset.productId
      const input = e.target.parentElement.querySelector('.quantity-input')
      let quantity = parseInt(input.value)

      if (e.target.dataset.action === 'increase') {
        if (quantity === MAX_QUANTITY)
          return toast.error('Maximum quantity reached!')
        quantity += 1
      } else {
        if (quantity === 1)
          return toast.error(
            'Click on delete icon, if you want to remove this item'
          )
        quantity -= 1
      }

      input.value = quantity
      handler(productId, quantity)
    })

    this._container.addEventListener('change', async e => {
      if (!e.target.classList.contains('quantity-input')) return

      const productId = e.target.closest('.cart-item').dataset.productId
      let quantity = Math.min(e.target.value, MAX_QUANTITY)
      quantity = Math.max(quantity, 1)
      e.target.value = quantity

      handler(productId, quantity)
    })
  }

  removeItemHandler(handler) {
    this._container.addEventListener('click', async e => {
      if (!e.target.classList.contains('remove-button')) return

      const item = e.target.closest('.cart-item')
      const productId = item.dataset.productId
      item.remove()
      handler(productId)
    })
  }

  placeOrderHandler(handler) {
    this._container.addEventListener('click', async e => {
      if (!e.target.classList.contains('place-order-button')) return

      handler()
    })
  }
}

export default new CartView()
