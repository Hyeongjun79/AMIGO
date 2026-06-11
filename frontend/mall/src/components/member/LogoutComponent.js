import { useDispatch } from 'react-redux'
import { logout, closeLogoutModal } from '../../slices/loginSlice'

const LogoutComponent = () => {
  const dispatch = useDispatch()

  const handleClickConfirm = () => {
    dispatch(logout())
  }

  const handleClickCancel = () => {
    dispatch(closeLogoutModal())
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-ibm-hairline w-[360px] overflow-hidden">
      <div className="px-8 py-6 text-center">
        <div className="text-3xl mb-3">🌙</div>
        <h2 className="ibm-sh-20 text-ibm-ink font-medium">ログアウト</h2>
        <p className="ibm-bsm-14 text-ibm-ink-muted mt-2">
          ログアウトしますか？
        </p>
      </div>
      <div className="flex border-t border-ibm-hairline">
        <button
          type="button"
          onClick={handleClickCancel}
          className="flex-1 h-12 ibm-bsm-14 text-ibm-ink-muted hover:bg-ibm-surface-4 transition-colors"
        >
          キャンセル
        </button>
        <button
          type="button"
          onClick={handleClickConfirm}
          className="flex-1 h-12 ibm-bsm-14 text-white bg-ibm-blue hover:bg-ibm-blue-hover transition-colors"
        >
          はい
        </button>
      </div>
    </div>
  )
}

export default LogoutComponent
