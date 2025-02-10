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
    const { isError } = await auth.login(loginData)
    return { isError }
  })
}

init()
