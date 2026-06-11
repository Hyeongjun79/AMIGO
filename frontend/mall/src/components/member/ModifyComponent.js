import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { modifyMember } from '../../api/memberApi'
import useCustomLogin from '../../hooks/useCustomLogin'
import ResultModal from '../common/ResultModal'

const initState = {
  email: '',
  pw: '',
  nickname: '',
}

const ModifyComponent = () => {
  const [member, setMember] = useState(initState)
  const loginInfo = useSelector((state) => state.loginSlice)
  const { moveToLogin, doLogout } = useCustomLogin()
  const [result, setResult] = useState()

  useEffect(() => {
    setMember({ ...loginInfo, pw: 'ABCD' })
  }, [loginInfo])

  const handleChange = (e) => {
    member[e.target.name] = e.target.value
    setMember({ ...member })
  }

  const handleClickModify = () => {
    modifyMember(member).then(() => {
      setResult('変更完了')
    })
  }

  const closeModal = () => {
    setResult(null)
    doLogout()
    moveToLogin()
  }

  return (
    <div className="mt-6 bg-white rounded-2xl border border-ibm-hairline shadow-sm overflow-hidden">
      {result ? (
        <ResultModal
          title={'会員情報'}
          content={'情報の変更が完了しました'}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}
      <FormRow label="メール">
        <div className="ibm-b-16 text-ibm-ink-muted">{member.email}</div>
      </FormRow>
      <FormRow label="パスワード">
        <input
          className="ibm-input"
          name="pw"
          type="password"
          value={member.pw}
          onChange={handleChange}
        />
      </FormRow>
      <FormRow label="ニックネーム">
        <input
          className="ibm-input"
          name="nickname"
          type="text"
          value={member.nickname}
          onChange={handleChange}
        />
      </FormRow>

      <div className="flex justify-end gap-3 p-6 bg-ibm-surface-4 border-t border-ibm-hairline">
        <button
          type="button"
          className="ibm-btn ibm-btn-primary min-w-[140px]"
          onClick={handleClickModify}
        >
          変更する
        </button>
      </div>
    </div>
  )
}

const FormRow = ({ label, children }) => (
  <div className="flex border-b border-ibm-hairline">
    <div className="w-1/4 px-6 py-4 ibm-e-14 text-ibm-ink-muted bg-ibm-surface-4">
      {label}
    </div>
    <div className="w-3/4 px-6 py-4 ibm-b-16 text-ibm-ink">{children}</div>
  </div>
)

export default ModifyComponent
