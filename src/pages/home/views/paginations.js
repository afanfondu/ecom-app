import View from '@components/view'

class Pagination extends View {
  _container = document.querySelector('#container')

  _generateMarkup() {
    const { totalPages, currentPage } = this._data
    return `
      <div class="d-flex justify-content-center">
        <ul class="pagination">
          <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage - 1}">Previous</a>
          </li>
          ${Array.from({ length: totalPages }, (_, i) => i + 1)
            .map(
              page => `
            <li class="page-item ${page === currentPage ? 'active' : ''}">
              <a class="page-link" href="#" data-page="${page}">${page}</a>
            </li>
          `
            )
            .join('')}
          <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage + 1}">Next</a>
          </li>
        </ul>
      </div>
    `
  }

  paginationHandler(handler) {
    this._container.addEventListener('click', async e => {
      e.preventDefault()

      const pageLink = e.target.closest('[data-page]')
      if (!pageLink) return

      const page = parseInt(pageLink.dataset.page)
      await handler(page)
    })
  }
}
export default new Pagination()
