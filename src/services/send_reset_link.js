/* eslint-disable no-undef */
import axios from 'axios'


const sendResetLink = async emailObject => {
    

    let baseUrl = `${process.env.BACKEND_HOST}/api/update-password/forgot`

    console.log(baseUrl)

    const response = await axios.post(baseUrl, emailObject)
    return response.data
}

export default { sendResetLink }