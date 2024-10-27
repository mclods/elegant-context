import { useContext } from 'react';
import { CartContext } from '../store/shopping-cart-context';
import { priceFormatter } from '../utils/price-formatter';

function CartButtons() {
  const { items, total, handleDeleteCart } = useContext(CartContext);

  function onClearCart(event) {
    event.preventDefault();
    handleDeleteCart();
  }

  const cartQuantity = items ? items.length : 0;

  return (
    <>
      {cartQuantity > 0 ? (
        <div
          className="flex gap-x-2 items-center"
          data-testid="cart-buttons-container"
        >
          <p className="font-quicksand font-bold" data-testid="cart-total">
            Your Total:{' '}
            <span className="text-red-700">{priceFormatter.format(total)}</span>
          </p>
          <div className="flex gap-x-2">
            <button onClick={onClearCart} data-testid="clear-cart-btn">
              Clear Cart
            </button>
            <button data-testid="close-cart-btn">Close</button>
            <button onClick={() => {}} data-testid="checkout-btn">
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <button data-testid="close-cart-btn">Close</button>
      )}
    </>
  );
}

export default CartButtons;
