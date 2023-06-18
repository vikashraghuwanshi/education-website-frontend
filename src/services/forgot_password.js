/* eslint-disable no-undef */
import axios from 'axios'


const forgotPassword = async passwordObject => {
    

    let baseUrl = `${process.env.BACKEND_HOST}/api/update-password/reset`

    console.log(baseUrl)

    const response = await axios.post(baseUrl, passwordObject)
    return response.data
}

export default { forgotPassword }