import '@styles/globals.scss'
import * as bootstrap from 'bootstrap'
import navbar from '@components/navbar'
import loginForm from './views/login-form'
import { auth } from './model'

const init = () => {
  const user = auth.get().user
  if (user) return (window.location.href = '/')

  navbar.render(user)

  loginForm.render()
  loginForm.loginHandler(async loginData => {
    const { isError, error } = await auth.login(loginData)
    if (isError) return error

    window.location.href = '/'
  })
}

init()
