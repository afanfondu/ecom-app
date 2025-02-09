export default class View {
  render(data = null, append = false) {
    this._data = data
    if (!append) this._clear()
    this._container.insertAdjacentHTML('beforeend', this._generateMarkup())
  }

  _clear() {
    this._container.innerHTML = ''
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="/icons.svg#icon-loader"></use>
        </svg>
      </div>
    `
    this._clear()
    this._container.insertAdjacentHTML('afterbegin', markup)
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="/icons.svg#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `
    this._clear()
    this._container.insertAdjacentHTML('afterbegin', markup)
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="/icons.svg#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `
    this._clear()
    this._container.insertAdjacentHTML('afterbegin', markup)
  }
}
