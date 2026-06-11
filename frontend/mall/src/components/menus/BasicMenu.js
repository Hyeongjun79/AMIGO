import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { openLoginModal, openLogoutModal } from '../../slices/loginSlice'
import LoginComponent from '../member/LoginComponent'
import LogoutComponent from '../member/LogoutComponent'
import { useQuery } from '@tanstack/react-query'
import { getCategoryList } from '../../api/productsApi'

const BasicMenu = () => {
  const loginState = useSelector((state) => state.loginSlice)
  const dispatch = useDispatch()

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategoryList,
    staleTime: 1000 * 60 * 10,
    enabled: !!loginState.email,
    retry: false,
  })

  return (
    <>
      <header className="w-full">
        {/* Utility bar */}
        <div className="w-full border-b bg-ibm-surface-1 border-ibm-hairline">
          <div className="flex items-center justify-end max-w-[1440px] mx-auto h-8 px-4 ibm-c-12 text-ibm-ink-muted">
            <span className="px-3">韓国</span>
            <span className="px-3 border-l border-ibm-hairline">お問い合わせ</span>
            <span className="px-3 border-l border-ibm-hairline">サポート</span>
          </div>
        </div>

        {/* Top nav */}
        <nav
          id="navbar"
          className="w-full border-b bg-ibm-canvas border-ibm-hairline"
        >
          <div className="relative flex items-center justify-between max-w-[1440px] mx-auto h-14 px-4">
            <div className="flex items-center h-full">
              <Link
                to={'/'}
                className="ibm-be-14 text-ibm-blue pr-8 tracking-widest text-lg"
              >
                𓍯 アミゴ
              </Link>
            </div>
            <ul className="absolute flex items-center h-full -translate-x-1/2 left-1/2">
              <li className="h-full">
                <Link
                  to={'/about'}
                  className="flex items-center h-full px-5 ibm-bsm-14 text-ibm-ink-muted hover:text-ibm-blue transition-colors"
                >
                  サイトについて
                </Link>
              </li>
              {loginState.email ? (
                <>
                  <li className="h-full">
                    <Link
                      to={'/todo/'}
                      className="flex items-center h-full px-5 ibm-bsm-14 text-ibm-ink-muted hover:text-ibm-blue transition-colors"
                    >
                      メモ
                    </Link>
                  </li>
                  <li className="relative h-full group">
                    <Link
                      to={'/products/list?category=1'}
                      className="flex items-center h-full px-5 ibm-bsm-14 text-ibm-ink-muted hover:text-ibm-blue transition-colors"
                    >
                      商品一覧
                    </Link>
                    <div className="absolute left-0 z-50 invisible w-52 transition-all duration-200 opacity-0 top-full group-hover:visible group-hover:opacity-100 pt-1">
                      <div className="rounded-2xl shadow-lg bg-ibm-canvas border border-ibm-hairline overflow-hidden">
                        {categories?.map((cat) => (
                          <Link
                            key={cat.id}
                            to={`/products/list?category=${cat.id}`}
                            className="block px-5 py-3 ibm-bsm-14 text-ibm-ink hover:bg-ibm-surface-4 hover:text-ibm-blue transition-colors"
                          >
                            {cat.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </li>
                </>
              ) : (
                <></>
              )}
            </ul>

            <div className="flex items-center h-full gap-2">
              {!loginState.email ? (
                <button
                  type="button"
                  onClick={() => dispatch(openLoginModal())}
                  className="ibm-btn ibm-btn-primary text-sm px-5"
                >
                  ログイン
                </button>
              ) : (
                <></>
              )}
              {loginState.email ? (
                <>
                  <button
                    type="button"
                    onClick={() => dispatch(openLogoutModal())}
                    className="ibm-btn ibm-btn-tertiary text-sm px-5 border-ibm-error text-ibm-error hover:bg-ibm-error"
                  >
                    ログアウト
                  </button>
                  <Link
                    to="/member/modify"
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-ibm-surface-1 border border-ibm-hairline hover:bg-ibm-surface-2 transition-colors text-sm"
                    aria-label="プロフィール編集"
                    title="プロフィール編集"
                  >
                    👤
                  </Link>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </nav>
      </header>
      {loginState.isModalOpen && (
        <div className="fixed inset-0 z-[1055] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <LoginComponent />
        </div>
      )}
      {loginState.isLogoutModalOpen && (
        <div className="fixed inset-0 z-[1055] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <LogoutComponent />
        </div>
      )}
    </>
  )
}

export default BasicMenu
