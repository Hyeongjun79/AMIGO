import axios from 'axios'
import { API_SERVER_HOST } from './todoApi'

const client_id = process.env.REACT_APP_NAVER_CLIENT_ID
const redirect_uri = process.env.REACT_APP_NAVER_REDIRECT_URI
const client_secret_key = process.env.REACT_APP_NAVER_CLIENT_SECRET
const auth_code_path = `https://nid.naver.com/oauth2.0/authorize`

const access_token_url = `https://nid.naver.com/oauth2.0/token`
const state = Math.random().toString(36).substring(2)

export const getNaverLoginLink = () => {
  const naverURL = `${auth_code_path}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&state=${state}`

  return naverURL
}

export const getAccessToken = async (authCode) => {
  const header = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }
  const params = {
    grant_type: 'authorization_code',
    client_secret: client_secret_key,
    client_id: client_id,
    redirect_uri: redirect_uri,
    code: authCode,
  }
  const res = await axios.post(access_token_url, params, header)
  const accessToken = res.data.access_token

  return accessToken
}
export const getMemberWithAccessToken = async (accessToken) => {
  const res = await axios.get(
    `${API_SERVER_HOST}/api/member/naver?accessToken=${accessToken}`
  )
  return res.data
}
