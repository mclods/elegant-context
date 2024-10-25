import { useRef } from 'react';
import CartModal from './CartModal';
import Cart from './Cart';
import { priceFormatter } from '../utils/price-formatter';

function Header({ cartItems, total, onAddItem, onDeleteItem, onDeleteCart }) {
  const modalRef = useRef();

  function onCartClick() {
    modalRef.current.open();
  }

  const isCartEmpty = cartItems ? cartItems.length === 0 : true;

  const cartButtons = !isCartEmpty ? (
    <div className="flex gap-x-2 items-center">
      <p className="font-quicksand font-bold">
        Your Total:{' '}
        <span className="text-red-700">{priceFormatter.format(total)}</span>
      </p>
      <div className="flex gap-x-2">
        <button onClick={onDeleteCart}>Clear Cart</button>
        <button>Close</button>
        <button onClick={() => {}}>Checkout</button>
      </div>
    </div>
  ) : (
    <button>Close</button>
  );

  return (
    <>
      <CartModal
        ref={modalRef}
        title="Cart"
        modalContent={
          <Cart
            cartItems={cartItems}
            onAddItem={onAddItem}
            onDeleteItem={onDeleteItem}
          />
        }
        modalButtons={cartButtons}
      />
      <header className="flex justify-between items-center px-[15%] py-10 bg-gradient-to-r from-[#31220b] to-[#382e1b]">
        <div className="flex gap-x-10 items-center">
          <div className="w-20 h-20">
            <img
              src={process.env.PUBLIC_URL + '/logo.png'}
              alt="elegant model"
            />
          </div>
          <p className="font-merriweather font-bold uppercase text-4xl text-amber-400">
            Elegant Context
          </p>
        </div>
        <button
          className="w-28 h-14 px-4 rounded-lg font-quicksand font-bold text-md bg-amber-400 truncate active:-translate-x-0.5 active:translate-y-0.5"
          onClick={onCartClick}
        >
          Cart ({isCartEmpty ? 0 : cartItems.length})
        </button>
      </header>
    </>
  );
}

export default Header;
