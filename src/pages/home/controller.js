import '@styles/globals.scss'
import * as bootstrap from 'bootstrap'
import navbar from '@components/navbar'
import { auth } from '@pages/login/model'

const init = async () => {
  const user = auth.get().user
  navbar.render(user)
  if (user) navbar.logoutHandler(auth.logout)
}

init()
