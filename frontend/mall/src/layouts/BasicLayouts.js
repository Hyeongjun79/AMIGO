import BasicMenu from '../components/menus/BasicMenu'
import CartComponent from '../components/menus/CartComponent'

const BasicLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-ibm-canvas text-ibm-ink">
      <BasicMenu />

      <div className="max-w-[1440px] mx-auto flex flex-col w-full bg-ibm-canvas md:flex-row">
        <main className="px-10 py-14 md:w-3/4 md:border-r md:border-ibm-hairline">
          {children}
        </main>
        <aside className="px-8 py-14 md:w-1/4 bg-ibm-surface-1">
          <CartComponent />
        </aside>
      </div>

      <footer className="mt-20 bg-ibm-surface-1 border-t border-ibm-hairline">
        <div className="max-w-[1440px] mx-auto px-10 py-12">
          <div className="mb-2 ibm-be-14 text-ibm-ink">
            アミゴ — 編み物・手芸のオンラインショップ
          </div>
          <p className="ibm-c-12 text-ibm-ink-muted">
            © 2026 アミゴ. IBM Cloud Native Dev — AI Agent 4期生 KWON HYEONG JUN
          </p>
        </div>
      </footer>
    </div>
  )
}

export default BasicLayout
