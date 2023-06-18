

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const tokenService = { setToken }
export default tokenService
