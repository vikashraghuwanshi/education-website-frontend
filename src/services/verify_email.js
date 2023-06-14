/* eslint-disable no-undef */
import axios from 'axios'


const verify_email = async params => {
  let baseUrl = `${process.env.BACKEND_HOST}/api/users/${params.id}/verify/${params.token}`
  const response = await axios.get(baseUrl)
  return response
}

export default { verify_email }