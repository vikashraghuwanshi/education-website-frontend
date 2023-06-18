/* eslint-disable no-undef */
import axios from 'axios'


const verify_reset_link = async params => {
  let baseUrl = `${process.env.BACKEND_HOST}/api/reset-link-verify/${params.id}/forgot/${params.token}`
  const response = await axios.get(baseUrl)
  return response
}

export default { verify_reset_link }