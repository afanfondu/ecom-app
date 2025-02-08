import api from '@lib/api'
import createStore from '@lib/create-store'
import { jwtDecode } from 'jwt-decode'

export const auth = createStore(
  set => ({
    _state: { token: null, user: null },

    async login(loginData) {
      const { isError, error, data } = await api.post('/auth/login', loginData)
      if (!isError) {
        const user = jwtDecode(data.token)
        set({ token: data.token, user })
      }

      return { error, isError }
    },

    logout() {
      set({ token: null, user: null })
    }
  }),
  'auth'
)
