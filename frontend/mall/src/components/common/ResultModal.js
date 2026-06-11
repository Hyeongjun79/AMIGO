const ResultModal = ({ title, content, callbackFn }) => {
  return (
    <div
      className="fixed inset-0 z-[1055] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={() => {
        if (callbackFn) callbackFn()
      }}
    >
      <div
        className="relative bg-white rounded-3xl shadow-xl border border-ibm-hairline w-full max-w-[400px] mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-8 pt-8 pb-4 text-center">
          <div className="text-3xl mb-3">✨</div>
          <div className="mb-1 ibm-e-14">お知らせ</div>
          <h2 className="ibm-sh-20 text-ibm-ink font-medium">{title}</h2>
        </div>

        <div className="px-8 py-4 text-center ibm-bsm-14 text-ibm-ink-muted">{content}</div>

        <div className="px-8 pb-8 flex justify-center">
          <button
            className="ibm-btn ibm-btn-primary min-w-[160px]"
            onClick={() => {
              if (callbackFn) callbackFn()
            }}
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultModal
