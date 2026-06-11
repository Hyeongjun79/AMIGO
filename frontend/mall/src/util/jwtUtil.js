import axios from 'axios'
import { getCookie, setCookie } from './cookieUtil'
import { API_SERVER_HOST } from '../api/todoApi'

const jwtAxios = axios.create()

const refreshJWT = async (accessToken, refreshToken) => {
  const host = API_SERVER_HOST
  const header = { headers: { Authorization: `Bearer ${accessToken}` } }
  const res = await axios.get(
    `${host}/api/member/refresh?refreshToken=${refreshToken}`,
    header
  )
  console.log('-------------------')
  console.log(res.data)
  return res.data
}
const beforeReq = (config) => {
  const memberInfo = getCookie('member')

  if (!memberInfo) {
    console.log('Member NOT FOUND')
    return Promise.reject({ response: { data: { error: 'REQUIRE_LOGIN' } } })
  }
  const { accessToken } = memberInfo

  config.headers.Authorization = `Bearer ${accessToken}`

  return config
}
const beforeRes = async (res) => {
  return res
}

const requestFail = (err) => {
  console.log('request error............')
  return Promise.reject(err)
}

const responseFail = async (err) => {
  console.log('response error............')

  const status = err?.response?.status
  const errorMsg = err?.response?.data?.error

  if (status === 401 && errorMsg === 'ERROR_ACCESS_TOKEN') {
    const memberCookieValue = getCookie('member')
    const result = await refreshJWT(
      memberCookieValue.accessToken,
      memberCookieValue.refreshToken
    )
    console.log('refreshJWT RESULT', result)

    if (!result.accessToken) {
      return Promise.reject({ response: { data: { error: 'REQUIRE_LOGIN' } } })
    }

    memberCookieValue.accessToken = result.accessToken
    memberCookieValue.refreshToken = result.refreshToken
    setCookie('member', JSON.stringify(memberCookieValue), 1)

    const originalRequest = err.config
    return await axios({
      ...originalRequest,
      headers: {
        ...originalRequest.headers,
        Authorization: `Bearer ${result.accessToken}`,
      },
    })
  }

  return Promise.reject(err)
}

jwtAxios.interceptors.request.use(beforeReq, requestFail)
jwtAxios.interceptors.response.use(beforeRes, responseFail)

export default jwtAxios
