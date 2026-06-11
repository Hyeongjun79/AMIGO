import { Suspense, lazy } from 'react'

const memberRouter = () => {
  const Loading = <div>Loading...</div>
  const KakaoRedirect = lazy(() => import('../pages/member/KakaoRedirectPage'))
  const NaverRedirect = lazy(() => import('../pages/member/NaverRedirectPage'))
  const GoogleRedirect = lazy(
    () => import('../pages/member/GoogleRedirectPage')
  )
  const MemberModify = lazy(() => import('../pages/member/ModifyPage'))
  return [
    {
      path: 'kakao',
      element: (
        <Suspense fallback={Loading}>
          <KakaoRedirect />
        </Suspense>
      ),
    },
    {
      path: 'naver',
      element: (
        <Suspense fallback={Loading}>
          <NaverRedirect />
        </Suspense>
      ),
    },
    {
      path: 'google',
      element: (
        <Suspense fallback={Loading}>
          <GoogleRedirect />
        </Suspense>
      ),
    },
    {
      path: 'modify',
      element: (
        <Suspense fallback={Loading}>
          <MemberModify />
        </Suspense>
      ),
    },
  ]
}

export default memberRouter
