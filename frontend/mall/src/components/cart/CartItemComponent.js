import { API_SERVER_HOST } from '../../api/todoApi'

const host = API_SERVER_HOST

const CartItemComponent = ({
  cino,
  pname,
  price,
  pno,
  qty,
  imageFile,
  changeCart,
  email,
}) => {
  const handleClickQty = (amount) => {
    changeCart({ email, cino, pno, qty: qty + amount })
  }

  return (
    <li key={cino} className="bg-white rounded-xl border border-ibm-hairline p-3 mb-2">
      <div className="flex gap-3">
        <img
          className="object-cover w-16 h-16 rounded-lg flex-shrink-0"
          src={`${host}/api/products/view/s_${imageFile}`}
          alt={pname}
        />
        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div className="text-sm font-medium text-ibm-ink truncate">{pname}</div>
          <div className="text-xs text-ibm-ink-muted">¥{price.toLocaleString()}</div>
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-1">
              <button
                className="text-xs bg-ibm-surface-1 hover:bg-ibm-surface-2 text-ibm-ink w-6 h-6 rounded-full transition-colors flex items-center justify-center"
                onClick={() => handleClickQty(-1)}
              >
                −
              </button>
              <span className="w-5 text-xs text-center font-medium">{qty}</span>
              <button
                className="text-xs bg-ibm-surface-1 hover:bg-ibm-surface-2 text-ibm-ink w-6 h-6 rounded-full transition-colors flex items-center justify-center"
                onClick={() => handleClickQty(1)}
              >
                ＋
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-ibm-ink">
                ¥{(qty * price).toLocaleString()}
              </span>
              <button
                className="text-xs text-white bg-ibm-error hover:bg-ibm-error-hover w-6 h-6 rounded-full transition-colors flex items-center justify-center"
                onClick={() => handleClickQty(-1 * qty)}
                title="削除"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default CartItemComponent
