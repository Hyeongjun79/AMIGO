import { API_SERVER_HOST } from '../../api/todoApi'
import useCustomMove from '../../hooks/useCustomMove'
import FetchingModal from '../common/FetchingModal'
import { getOne } from '../../api/productsApi'
import useCustomCart from '../../hooks/useCustomCart'
import useCustomLogin from '../../hooks/useCustomLogin'
import { useQuery } from '@tanstack/react-query'

const initState = {
  pno: 0,
  pname: '',
  pdesc: '',
  price: 0,
  uploadFileNames: [],
}
const host = API_SERVER_HOST

const ReadComponent = ({ pno }) => {
  const { moveToList, moveToModify } = useCustomMove()
  const { changeCart, cartItems } = useCustomCart()
  const { loginState } = useCustomLogin()

  const { isFetching, data } = useQuery({
    queryKey: ['products', pno],
    queryFn: () => getOne(pno),
    staleTime: 1000 * 10,
    retry: 1,
  })

  const handleClickAddCart = () => {
    let qty = 1
    const addedItem = cartItems.filter((item) => item.pno === parseInt(pno))[0]
    if (addedItem) {
      if (window.confirm('すでにカートに入っています。追加しますか？') === false) {
        return
      }
      qty = addedItem.qty + 1
    }
    changeCart({ email: loginState.email, pno: pno, qty: qty })
  }

  const product = data || initState

  return (
    <div className="mt-6 bg-white rounded-2xl border border-ibm-hairline shadow-sm overflow-hidden">
      {isFetching ? <FetchingModal /> : <></>}

      <div className="flex flex-col items-center justify-center w-full bg-ibm-surface-4 p-6">
        {product.uploadFileNames.map((imgFile, i) => (
          <img
            alt="product"
            key={i}
            className="w-1/2 rounded-xl"
            src={`${host}/api/products/view/${imgFile}`}
          />
        ))}
      </div>

      {makeRow('商品名', product.pname)}
      {makeRow('価格', product.price ? `¥${product.price.toLocaleString()}` : '')}

      <div className="flex flex-wrap justify-end gap-3 p-6 bg-ibm-surface-4 border-t border-ibm-hairline">
        <button
          type="button"
          className="ibm-btn ibm-btn-primary min-w-[140px]"
          onClick={handleClickAddCart}
        >
          🛒 カートに追加
        </button>
        <button
          type="button"
          className="ibm-btn ibm-btn-secondary min-w-[120px]"
          onClick={() => moveToList()}
        >
          一覧へ
        </button>
        <button
          type="button"
          className="ibm-btn ibm-btn-tertiary min-w-[120px]"
          onClick={() => moveToModify(pno)}
        >
          編集
        </button>
      </div>
    </div>
  )
}

const makeRow = (title, value) => (
  <div className="flex border-b border-ibm-hairline">
    <div className="w-1/4 px-6 py-4 ibm-e-14 text-ibm-ink-muted bg-ibm-surface-4">
      {title}
    </div>
    <div className="w-3/4 px-6 py-4 ibm-b-16 text-ibm-ink">{value}</div>
  </div>
)

export default ReadComponent
