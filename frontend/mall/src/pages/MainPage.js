import BasicLayout from '../layouts/BasicLayouts'
import { Link } from 'react-router-dom'

const MainPage = () => {
  return (
    <BasicLayout>
      <div className="pt-10">
        <p className="ibm-e-14 mb-4 tracking-widest uppercase">Welcome to アミゴ</p>
        <h1 className="max-w-3xl ibm-dxl-76 text-ibm-ink leading-tight">
          あなたの夢を<br />
          <span className="text-ibm-blue">アミアミ</span>~<br />
          作りましょう！
        </h1>
        <p className="max-w-xl mt-8 ibm-blg-18 text-ibm-ink-muted">
          編み物が好きな方ならどなたでも大歓迎です。<br />
          素敵な毛糸や道具をご用意しています 🧶
        </p>

        <div className="flex flex-wrap gap-4 mt-10">
          <Link to="/products/list?category=1" className="ibm-btn ibm-btn-primary">
            商品をみる
          </Link>
          <Link to="/about" className="ibm-btn ibm-btn-tertiary">
            サイトについて
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 mt-20 md:grid-cols-3">
          <div className="p-8 bg-white rounded-2xl shadow-sm border border-ibm-hairline hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">🧶</div>
            <div className="mb-2 ibm-e-14">コレクション</div>
            <h3 className="font-medium ibm-ct-24 text-ibm-ink mb-2">豊富な品揃え</h3>
            <p className="ibm-bsm-14 text-ibm-ink-muted">
              季節ごとの毛糸から珍しい輸入素材まで、幅広くご用意しています。
            </p>
          </div>
          <div className="p-8 bg-white rounded-2xl shadow-sm border border-ibm-hairline hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">✨</div>
            <div className="mb-2 ibm-e-14">こだわり品質</div>
            <h3 className="font-medium ibm-ct-24 text-ibm-ink mb-2">厳選素材</h3>
            <p className="ibm-bsm-14 text-ibm-ink-muted">
              手触りにこだわった高品質な素材を厳選してお届けします。
            </p>
          </div>
          <div className="p-8 bg-white rounded-2xl shadow-sm border border-ibm-hairline hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">🎀</div>
            <div className="mb-2 ibm-e-14">ギフト包装</div>
            <h3 className="font-medium ibm-ct-24 text-ibm-ink mb-2">プレゼントにも</h3>
            <p className="ibm-bsm-14 text-ibm-ink-muted">
              大切な方へのギフトにぴったりな包装サービスもご用意しています。
            </p>
          </div>
        </div>
      </div>
    </BasicLayout>
  )
}

export default MainPage
