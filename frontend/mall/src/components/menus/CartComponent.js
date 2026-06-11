import { useSelector } from 'react-redux'
import useCustomLogin from '../../hooks/useCustomLogin'
import useCustomCart from '../../hooks/useCustomCart'
import { useEffect, useMemo } from 'react'
import CartItemComponent from '../cart/CartItemComponent'

const CartComponent = () => {
  const { isLogin, loginState } = useCustomLogin()
  const { refreshCart, cartItems, changeCart } = useCustomCart()
  const total = useMemo(() => {
    let total = 0
    for (const item of cartItems) {
      total += item.price * item.qty
    }
    return total
  }, [cartItems])

  useEffect(() => {
    if (isLogin) {
      refreshCart()
    }
  }, [isLogin])

  return (
    <div className="w-full">
      {isLogin ? (
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-medium text-ibm-ink">
              🛒 {loginState.nickname} さんのカート
            </span>
            <span className="w-5 h-5 flex items-center justify-center text-xs font-bold text-white bg-ibm-blue rounded-full">
              {cartItems.length}
            </span>
          </div>

          <ul className="space-y-1">
            {cartItems.map((item) => (
              <CartItemComponent
                {...item}
                key={item.cino}
                changeCart={changeCart}
                email={loginState.email}
              />
            ))}
          </ul>

          {cartItems.length > 0 && (
            <div className="mt-4 pt-4 border-t border-ibm-hairline">
              <div className="text-right ibm-be-14 text-ibm-ink">
                合計：<span className="text-ibm-blue ibm-sh-20">¥{total.toLocaleString()}</span>
              </div>
            </div>
          )}

          {cartItems.length === 0 && (
            <p className="ibm-c-12 text-ibm-ink-muted text-center py-6">
              カートは空です 🧶
            </p>
          )}
        </div>
      ) : (
        <p className="ibm-c-12 text-ibm-ink-muted text-center py-6">
          ログインするとカートが使えます
        </p>
      )}
    </div>
  )
}

export default CartComponent
