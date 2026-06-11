const FetchingModal = () => {
  return (
    <div className="fixed top-0 left-0 z-[1055] flex h-full w-full place-items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center gap-3 bg-white rounded-3xl shadow-xl px-12 py-8">
        <div className="text-3xl animate-bounce">🧶</div>
        <div className="ibm-bsm-14 text-ibm-ink-muted">読み込み中...</div>
      </div>
    </div>
  )
}

export default FetchingModal
