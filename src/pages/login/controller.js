import '@styles/globals.scss'
import * as bootstrap from 'bootstrap'
import navbar from '@components/navbar'
import loginForm from './views/login-form'
import { auth } from './model'
import toast from '@components/toast'

const init = () => {
  const user = auth.get().user
  if (user) return (window.location.href = '/')

  navbar.render(user)

  loginForm.render()
  loginForm.loginHandler(async loginData => {
    const { isError } = await auth.login(loginData)

    if (isError) {
      toast.error('Something went wrong!')
      loginForm.formSubmitting(false)
      return
    }

    window.location.href = '/'
  })
}

init()
