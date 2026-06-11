import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { closeLoginModal, loginPostAsync } from '../../slices/loginSlice'
import useCustomLogin from '../../hooks/useCustomLogin'
import KakaoLoginComponent from './KakaoLoginComponent'
import GoogleLoginComponent from './GoogleLoginComponent'
import NaverLoginComponent from './NaverLoginComponent.js'

const initState = {
  email: '',
  pw: '',
}

const LoginComponent = () => {
  const [loginParam, setLoginParam] = useState({ ...initState })
  const dispatch = useDispatch()
  const { moveToPath } = useCustomLogin()

  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value
    setLoginParam({ ...loginParam })
  }

  const handleClickLogin = () => {
    dispatch(loginPostAsync(loginParam))
      .unwrap()
      .then((data) => {
        if (data.error) {
          alert('メールアドレスまたはパスワードが正しくありません')
        } else {
          alert('ログインしました')
          moveToPath('/')
        }
      })
  }

  const handleClose = () => {
    dispatch(closeLoginModal())
  }

  return (
    <div className="relative p-8 m-2 bg-white rounded-3xl shadow-xl border border-ibm-hairline w-full max-w-sm">
      <button
        type="button"
        onClick={handleClose}
        className="absolute top-4 right-5 text-xl text-ibm-ink-subtle hover:text-ibm-ink transition-colors"
        aria-label="閉じる"
      >
        ×
      </button>

      <div className="text-center mb-8">
        <div className="text-4xl mb-2">𓍯</div>
        <h2 className="ibm-ct-24 text-ibm-ink font-medium">ログイン</h2>
        <p className="ibm-c-12 text-ibm-ink-muted mt-1">アミゴへようこそ</p>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block ibm-c-12 text-ibm-ink-muted mb-1 tracking-widest uppercase">
            メールアドレス
          </label>
          <input
            className="ibm-input"
            name="email"
            type="text"
            value={loginParam.email}
            onChange={handleChange}
            placeholder="example@email.com"
          />
        </div>
        <div>
          <label className="block ibm-c-12 text-ibm-ink-muted mb-1 tracking-widest uppercase">
            パスワード
          </label>
          <input
            className="ibm-input"
            name="pw"
            type="password"
            value={loginParam.pw}
            onChange={handleChange}
            placeholder="••••••••"
          />
        </div>
      </div>

      <button
        className="ibm-btn ibm-btn-primary w-full justify-center mb-6"
        onClick={handleClickLogin}
      >
        ログイン
      </button>

      <div className="flex flex-col gap-2">
        <KakaoLoginComponent />
        <GoogleLoginComponent />
        <NaverLoginComponent />
      </div>
    </div>
  )
}

export default LoginComponent
