/* eslint-disable no-undef */
import axios from 'axios'
let baseUrl = '/api/add-user'

const signup = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { signup }