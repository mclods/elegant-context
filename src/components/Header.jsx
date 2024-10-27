import { useContext, useRef } from 'react';
import Modal from './common/Modal';
import Cart from './Cart';
import { CartContext } from '../store/shopping-cart-context';
import CartButtons from './CartButtons';

function Header() {
  const modalRef = useRef();
  const { items } = useContext(CartContext);

  function onCartClick() {
    modalRef.current.open();
  }

  const cartQuantity = items ? items.length : 0;

  return (
    <>
      <Modal
        ref={modalRef}
        title="Cart"
        modalContent={<Cart />}
        modalButtons={<CartButtons />}
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
