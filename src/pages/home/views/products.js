import View from '@components/view'

class Products extends View {
  _container = document.querySelector('#container')
  _errorMessage = 'Something went wrong! Please try again later.'

  _generateMarkup() {
    const products = this._data
    const categories = [
      'electronics',
      'jewelery',
      "men's clothing",
      "women's clothing"
    ]

    return `
      <div class="container mt-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="mb-0">Products</h2>

          <div class="dropdown">
            <button class="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
              Categories
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#" data-category="">All Products</a></li>
              ${categories
                .map(
                  cat => `
                <li><a class="dropdown-item" href="#" data-category="${cat}">${cat}</a></li>
              `
                )
                .join('')}
            </ul>
          </div>
        </div>

        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4">
          ${products.map(product => this._generateProductCard(product)).join('')}
        </div>
      </div>
    `
  }

  _generateProductCard(product) {
    return `
     <div class="col">
        <div class="card h-100 shadow-sm">
          <div class="position-relative">
            <img src="${product.image}" class="card-img-top p-4" alt="${product.title}" style="height: 200px; object-fit: contain;">
            <div class="position-absolute top-0 end-0 p-2">
              <span class="badge bg-primary">
                ${product.rating.rate} ★ (${product.rating.count})
              </span>
            </div>
          </div>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title text-truncate">${product.title}</h5>
            <p class="card-text text-truncate">${product.description}</p>
            <div class="mt-auto">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <span class="h5 mb-0">$${product.price}</span>
                <span class="badge bg-secondary">${product.category}</span>
              </div>
              <button class="btn btn-outline-primary w-100 add-to-cart" data-product-id="${product.id}">
                <i class="bi bi-cart-plus"></i> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    `
  }

  categoryHandler(handler) {
    this._container.addEventListener('click', async e => {
      e.preventDefault()
      const categoryLink = e.target.closest('[data-category]')
      if (!categoryLink) return

      const category = categoryLink.dataset.category
      await handler(category)
    })
  }

  addToCartHandler(handler) {
    this._container.addEventListener('click', async e => {
      if (!e.target.classList.contains('add-to-cart')) return

      const productId = e.target.dataset.productId
      await handler(productId)
    })
  }
}

export default new Products()
