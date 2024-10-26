import { useContext, useRef } from 'react';
import Modal from './common/Modal';
import Cart from './Cart';
import { priceFormatter } from '../utils/price-formatter';
import { CartContext } from '../store/shopping-cart-context';

function Header() {
  const modalRef = useRef();
  const { items, total, handleDeleteCart } = useContext(CartContext);

  function onCartClick() {
    modalRef.current.open();
  }

  function onClearCart(event) {
    event.preventDefault();
    handleDeleteCart();
  }

  const cartQuantity = items ? items.length : 0;

  const cartButtons =
    cartQuantity > 0 ? (
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
    );

  return (
    <>
      <Modal
        ref={modalRef}
        title="Cart"
        modalContent={<Cart />}
        modalButtons={cartButtons}
      />
      <header className="flex justify-between items-center px-[15%] py-10 bg-gradient-to-r from-[#31220b] to-[#382e1b]">
        <div className="flex gap-x-10 items-center">
          <div className="w-20 h-20">
            <img
              src={process.env.PUBLIC_URL + '/logo.png'}
              alt="elegant model"
              data-testid="store-logo"
            />
          </div>
          <p
            className="font-merriweather font-bold uppercase text-4xl text-amber-400"
            data-testid="store-title"
          >
            Elegant Context
          </p>
        </div>
        <button
          className="w-28 h-14 px-4 rounded-lg font-quicksand font-bold text-md bg-amber-400 truncate active:-translate-x-0.5 active:translate-y-0.5"
          onClick={onCartClick}
          data-testid="cart-btn"
        >
          Cart ({cartQuantity})
        </button>
      </header>
    </>
  );
}

export default Header;
