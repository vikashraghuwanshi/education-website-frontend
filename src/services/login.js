/* eslint-disable no-undef */
import axios from 'axios'
let baseUrl = `${process.env.BACKEND_HOST}/api/login-user`

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }