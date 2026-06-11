import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginPost } from '../api/memberApi'
import { setCookie, getCookie, removeCookie } from '../util/cookieUtil'

const initState = {
  email: '',
  isModalOpen: false,
  isLogoutModalOpen: false,
}

const loadMemberCookie = () => {
  const memberInfo = getCookie('member')
  if (memberInfo && memberInfo.nickname) {
    memberInfo.nickname = decodeURIComponent(memberInfo.nickname)
  }
  return memberInfo
}

export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => {
  return loginPost(param)
})

const loginSlice = createSlice({
  name: 'LoginSlice',
  initialState: loadMemberCookie() || initState,
  reducers: {
    login: (state, action) => {
      console.log('로그인....')
      const payload = action.payload
      setCookie('member', JSON.stringify(payload), 1)
      return payload
    },
    logout: (state, action) => {
      console.log('로그아웃...')
      removeCookie('member')
      return { ...initState }
    },
    openLoginModal: (state) => {
      state.isModalOpen = true
    },
    closeLoginModal: (state) => {
      state.isModalOpen = false
    },
    openLogoutModal: (state) => {
      state.isLogoutModalOpen = true
    },
    closeLogoutModal: (state) => {
      state.isLogoutModalOpen = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        console.log('fulfilled')
        const payload = action.payload
        if (!payload.error) {
          setCookie('member', JSON.stringify(payload), 1)
        }
        return payload
      })
      .addCase(loginPostAsync.pending, (state, action) => {
        console.log('pending')
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log('rejected')
      })
  },
})
export const {
  login,
  logout,
  openLoginModal,
  closeLoginModal,
  openLogoutModal,
  closeLogoutModal,
} = loginSlice.actions
export default loginSlice.reducer
