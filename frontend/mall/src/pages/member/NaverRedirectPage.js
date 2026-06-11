import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAccessToken, getMemberWithAccessToken } from '../../api/naverApi'
import { login } from '../../slices/loginSlice'
import BasicLayout from '../../layouts/BasicLayouts'

const NaverRedirectPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authCode = searchParams.get('code')

  const [status, setStatus] = useState('loading')
  const [memberInfo, setMemberInfo] = useState(null)

  useEffect(() => {
    getAccessToken(authCode)
      .then((accessToken) =>
        getMemberWithAccessToken(accessToken).then((memberInfo) => {
          setMemberInfo(memberInfo)
          dispatch(login(memberInfo))
          setStatus('success')
        })
      )
      .catch((err) => {
        console.error(err)
        setStatus('error')
      })
  }, [authCode])

  return (
    <BasicLayout>
      <div className="flex items-center justify-center pt-16">
        <div className="w-full max-w-md p-10 border bg-ibm-canvas border-ibm-hairline">
          {status === 'loading' && (
            <>
              <h1 className="ibm-ct-24 text-ibm-ink">로그인 처리 중...</h1>
              <p className="mt-4 ibm-bsm-14 text-ibm-ink-muted">
                잠시만 기다려 주세요.
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <span className="block mb-3 ibm-e-14"></span>
              <h1 className="ibm-dlg-60 text-ibm-ink">로그인 완료</h1>
              <p className="mt-6 ibm-blg-18 text-ibm-ink-muted">
                {memberInfo?.nickname || memberInfo?.email || '환영합니다'}
              </p>
              <button
                type="button"
                onClick={() => navigate('/', { replace: true })}
                className="h-12 px-6 mt-10 text-white bg-blue-600 ibm-bsm-14 hover:bg-blue-700"
              >
                홈으로 돌아가기
              </button>
            </>
          )}

          {status === 'error' && (
            <>
              <h1 className="ibm-ct-24 text-ibm-ink">로그인 실패</h1>
              <p className="mt-4 ibm-bsm-14 text-ibm-ink-muted">
                다시 시도해 주세요.
              </p>
              <button
                type="button"
                onClick={() => navigate('/', { replace: true })}
                className="h-12 px-6 mt-8 border ibm-bsm-14 text-ibm-ink border-ibm-hairline hover:bg-ibm-surface-1"
              >
                홈으로 돌아가기
              </button>
            </>
          )}
        </div>
      </div>
    </BasicLayout>
  )
}

export default NaverRedirectPage
