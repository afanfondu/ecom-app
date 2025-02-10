import View from '@components/view'
import toast from '@components/toast'
import { Modal } from 'bootstrap'

class ProductsTable extends View {
  _container = document.querySelector('#container')
  _errorMessage = 'Failed to load products'

  _generateMarkup() {
    const products = this._data
    return `
      <div class="container-fluid mt-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2>Products</h2>
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#productModal">
            <i class="bi-plus-lg"></i> Add Product
          </button>
        </div>

        <div class="card">
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="table-body">
                  ${products.map(product => this._generateTableRow(product)).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        ${this._generateModal()}
      </div>
    `
  }

  _generateTableRow(product) {
    return `
      <tr>
        <td>${product.id}</td>
        <td>
          <img src="${product.image}" alt="${product.title}" style="width: 50px; height: 50px; object-fit: contain;">
        </td>
        <td>${product.title}</td>
        <td>${product.category}</td>
        <td>$${product.price}</td>
        <td>
          <button class="btn btn-sm btn-outline-danger delete-btn" data-product-id="${product.id}" role="status">
            🗑️
          </button>
        </td>
      </tr>
    `
  }

  _generateModal() {
    return `
      <div class="modal fade" id="productModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add/Edit Product</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <form id="productForm">
              <div class="modal-body">
                  <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input name="title" type="text" class="form-control" id="title" required>
                  </div>
                  <div class="mb-3">
                    <label for="price" class="form-label">Price</label>
                    <input name="price" type="number" class="form-control" id="price" step="0.01" required>
                  </div>
                  <div class="mb-3">
                    <label for="category" class="form-label">Category</label>
                    <select name="category" class="form-select" id="category" required>
                      <option value="">Select category</option>
                      <option value="electronics">Electronics</option>
                      <option value="jewelery">Jewelery</option>
                      <option value="men's clothing">Men's Clothing</option>
                      <option value="women's clothing">Women's Clothing</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea name="description" class="form-control" id="description" rows="3" required></textarea>
                  </div>
                  <div class="mb-3">
                    <label for="image" class="form-label">Image URL</label>
                    <input placeholder="https://picsum.photos/id/48/720/420" name="image" type="url" class="form-control" id="image" required>
                  </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" id="add-btn">Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `
  }

  loadingBtn({ text, btn, loading }) {
    if (loading) {
      btn.innerHTML = '<div class="spinner-border spinner-border-sm"></div>'
      btn.setAttribute('disabled', true)
    } else {
      btn.innerHTML = text
      btn.removeAttribute('disabled')
    }
  }

  deleteHandler(handler) {
    this._container.addEventListener('click', async e => {
      const deleteBtn = e.target.closest('.delete-btn')
      if (!deleteBtn) return

      const deleteConfirm = confirm(
        'Are you sure you want to delete this product?'
      )
      if (!deleteConfirm) return

      this.loadingBtn({ btn: deleteBtn, loading: true })

      const { isError } = await handler(deleteBtn.dataset.productId)

      this.loadingBtn({ text: '🗑️', btn: deleteBtn, loading: false })

      if (isError) return toast.error('Something went wrong! Try again later.')

      toast.success('Product deleted successfully!')
      deleteBtn.closest('tr').remove()
    })
  }

  addProductHandler(handler) {
    const form = document.querySelector('#productForm')
    form.addEventListener('submit', async e => {
      e.preventDefault()
      const form = document.querySelector('#productForm')
      const formData = Object.fromEntries(new FormData(form))
      const addBtn = form.querySelector('#add-btn')

      this.loadingBtn({ btn: addBtn, loading: true })

      const { isError, data } = await handler(formData)

      this.loadingBtn({ text: 'Add', btn: addBtn, loading: false })

      if (isError) return toast.error('Something went wrong! Try again later.')

      this._container
        .querySelector('#table-body')
        .insertAdjacentHTML('beforeend', this._generateTableRow(data))
      toast.success('Product added successfully!')

      Modal.getInstance(document.querySelector('#productModal')).hide()
      form.reset()
    })
  }
}

export default new ProductsTable()
