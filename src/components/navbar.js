import View from './view'

class NavBar extends View {
  _container = document.querySelector('#header')

  _generateMarkup() {
    const user = this._data
    return `
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">E.</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/cart/">Cart</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled">Admin</a>
              </li>
            </ul>

            <div class="d-flex align-items-center">
              <span class="me-2">${user ? `${user.user}` : ''}</span>
              <a class="btn btn-outline-primary ${user ? 'd-none' : 'd-block'}" href="/login/">Login</a>
              <button id="logout-button" class="btn btn-outline-primary ${user ? 'd-block' : 'd-none'}">Logout</button>
            </div>
          </div>
        </div>
      </nav>
    `
  }

  logoutHandler(handler) {
    this._container
      .querySelector('#logout-button')
      .addEventListener('click', () => {
        handler()
        window.location.reload()
      })
  }
}

export default new NavBar()
