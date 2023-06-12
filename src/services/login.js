/* eslint-disable no-undef */
import axios from 'axios'
let baseUrl = '/api/login-user'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }