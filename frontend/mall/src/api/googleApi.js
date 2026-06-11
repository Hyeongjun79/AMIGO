import axios from 'axios'
import { API_SERVER_HOST } from './todoApi'

const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID
const redirect_uri = process.env.REACT_APP_GOOGLE_REDIRECT_URI
const client_secret_key = process.env.REACT_APP_GOOGLE_CLIENT_SECRET
const auth_code_path = `https://accounts.google.com/o/oauth2/v2/auth`

const access_token_url = `https://oauth2.googleapis.com/token`

export const getGoogleLoginLink = () => {
  const googleURL = `${auth_code_path}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=email profile`

  return googleURL
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
    `${API_SERVER_HOST}/api/member/google?accessToken=${accessToken}`
  )
  return res.data
}
