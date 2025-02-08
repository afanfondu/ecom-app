import axios from 'axios'
import config from '@lib/config'

const api = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.response.use(
  data => ({ isError: false, data: data.data }),
  error => ({ isError: true, error })
)

export default api
