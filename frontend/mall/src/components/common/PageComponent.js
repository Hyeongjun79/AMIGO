const PageComponent = ({ serverData, movePage }) => {
  return (
    <div className="flex justify-center items-center gap-1 mt-10">
      {serverData.prev ? (
        <button
          type="button"
          className="px-4 h-9 ibm-bsm-14 text-ibm-blue hover:bg-ibm-surface-1 rounded-full transition-colors border border-ibm-hairline"
          onClick={() => movePage({ page: serverData.prevPage })}
        >
          ← 前へ
        </button>
      ) : null}

      {serverData.pageNumList.map((pageNum) => {
        const selected = serverData.current === pageNum
        return (
          <button
            key={pageNum}
            type="button"
            className={`w-9 h-9 ibm-bsm-14 rounded-full transition-colors ${
              selected
                ? 'bg-ibm-blue text-white font-semibold shadow-sm'
                : 'text-ibm-ink hover:bg-ibm-surface-1 border border-ibm-hairline'
            }`}
            onClick={() => movePage({ page: pageNum })}
          >
            {pageNum}
          </button>
        )
      })}

      {serverData.next ? (
        <button
          type="button"
          className="px-4 h-9 ibm-bsm-14 text-ibm-blue hover:bg-ibm-surface-1 rounded-full transition-colors border border-ibm-hairline"
          onClick={() => movePage({ page: serverData.nextPage })}
        >
          次へ →
        </button>
      ) : null}
    </div>
  )
}

export default PageComponent
