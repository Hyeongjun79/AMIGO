import BasicLayout from '../layouts/BasicLayouts'

const AboutPage = () => {
  return (
    <BasicLayout>
      <div className="pt-10">
        <span className="block mb-4 ibm-e-14 tracking-widest uppercase">About</span>
        <h1 className="ibm-dlg-60 text-ibm-ink">このサイトについて</h1>
        <p className="max-w-2xl mt-6 ibm-blg-18 text-ibm-ink-muted">
          アミゴは、編み物・手芸好きのための小さなオンラインショップです。<br />
          素材選びから完成まで、あなたの創作をそっとサポートします。
        </p>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="p-8 bg-white rounded-2xl border border-ibm-hairline shadow-sm">
            <h3 className="ibm-sh-20 text-ibm-ink mb-3">🌸 ショップのコンセプト</h3>
            <p className="ibm-bsm-14 text-ibm-ink-muted leading-relaxed">
              「手作りの温かさ」をテーマに、こだわりの毛糸や編み物道具を厳選してお届けしています。
              初心者の方からベテランの方まで、どなたにも楽しんでいただけるよう努めています。
            </p>
          </div>
          <div className="p-8 bg-white rounded-2xl border border-ibm-hairline shadow-sm">
            <h3 className="ibm-sh-20 text-ibm-ink mb-3">💌 お問い合わせ</h3>
            <p className="ibm-bsm-14 text-ibm-ink-muted leading-relaxed">
              商品に関するご質問やご要望は、いつでもお気軽にご連絡ください。
              お客様の声を大切にし、より良いショップ作りに活かしてまいります。
            </p>
          </div>
        </div>
      </div>
    </BasicLayout>
  )
}

export default AboutPage
