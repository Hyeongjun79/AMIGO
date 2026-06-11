import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginPostAsync, logout, openLoginModal } from '../slices/loginSlice'

const useCustomLogin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loginState = useSelector((state) => state.loginSlice)
  const isLogin = loginState.email ? true : false

  const doLogin = async (loginParam) => {
    const action = await dispatch(loginPostAsync(loginParam))
    return action.payload
  }
  const doLogout = () => {
    dispatch(logout())
  }
  const moveToPath = (path) => {
    navigate({ pathname: path }, { replace: true })
  }
  const moveToLogin = () => {
    dispatch(openLoginModal())
  }

  const exceptionHandle = (ex) => {
    console.log('Exception-------------------')
    console.log(ex)
    const errorMsg = ex.response.data.error

    if (errorMsg === 'REQUIRE_LOGIN') {
      alert('로그인 해야만 합니다.')
      moveToLogin()
      return
    }
    if (errorMsg === 'ERROR_ACCESSDENIED') {
      alert('권한이 없습니다.')
      moveToPath()
      return
    }
  }
  return {
    loginState,
    isLogin,
    doLogin,
    doLogout,
    moveToLogin,
    moveToPath,
    exceptionHandle,
  }
}
export default useCustomLogin
