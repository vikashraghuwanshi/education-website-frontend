import axios from 'axios'


let baseUrl = `${process.env.BACKEND_HOST}/api/update-password`


const changePassword = async (passwordObject, token) => {


    const config = {
        headers: { Authorization: 'Bearer ' + token },
    }
    
    const response = await axios.post(baseUrl, passwordObject, config)
    return response.data
}

const changePasswordService = { changePassword }
export default changePasswordService
